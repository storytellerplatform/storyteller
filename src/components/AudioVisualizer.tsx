import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';

interface AudioVisualizerProps {
  audioUrl: string;  // 音檔的URL
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState(0);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const canvasWidth = 1200;

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(data => audioContextRef.current?.decodeAudioData(data))
      .then(decodedBuffer => {
        if (decodedBuffer) {
          setAudioBuffer(decodedBuffer);
          draw(decodedBuffer, 0);
        }
      });
  }, [audioUrl]);

  const togglePlayback = () => {
    if (isPlaying) {
      sourceRef.current?.stop();
      setIsPlaying(false);
    } else {
      const source = audioContextRef.current!.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current!.destination);
      source.start(0, currentPlaybackPosition * audioBuffer!.duration);
      sourceRef.current = source;
      setIsPlaying(true);

      source.onended = () => setIsPlaying(false); // 播放結束時更新播放狀態
    }
  };

  const updatePlaybackPosition = useCallback(() => {
    const playbackPosition = audioContextRef.current?.currentTime || 0;
    setCurrentPlaybackPosition(playbackPosition / audioBuffer?.duration! || 0);
    draw(audioBuffer!, currentPlaybackPosition);
    requestAnimationFrame(updatePlaybackPosition);
  }, [audioBuffer, currentPlaybackPosition]);

  useEffect(() => {
    if (isPlaying) {
      updatePlaybackPosition();
    }
  }, [audioBuffer, isPlaying, updatePlaybackPosition]);

  const draw = (audioBuffer: AudioBuffer, progress: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context || !audioBuffer) return;

    canvas.width = canvasWidth;

    const data = audioBuffer.getChannelData(0); // 從左聲道取數據
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;

    context.fillStyle = '#7f7e74';
    const gap = 2; // 2像素的間隙
    const barWidth = 4; // 矩形的寬度

    for (let i = 0; i < canvas.width; i += (barWidth + gap)) {
      if (i / canvas.width < progress) {
        context.fillStyle = 'blue'; // 已播放的顏色
      } else {
        context.fillStyle = '#7f7e74'; // 未播放的顏色
      }

      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];
        if (datum > max) max = datum;
        if (datum < min) min = datum;
      }
      context.fillRect(i, (1 + min) * amp, barWidth, Math.max(1, (max - min) * amp));
    }
  };

  return (
    <div className='flex flex-row items-center gap-2 w-full'>
      <span>
        {isPlaying ?
          <BiPauseCircle onClick={togglePlayback} size={36} className='text-orange-300 cursor-pointer' />
          :
          <BiPlayCircle onClick={togglePlayback} size={36} className='text-orange-300 cursor-pointer' />
        }
      </span>

      <canvas className='w-full overflow-hidden' ref={canvasRef}></canvas>
    </div>
  );
};

export default AudioVisualizer;
