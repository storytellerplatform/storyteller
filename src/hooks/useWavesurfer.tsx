// Import React hooks
import react, { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import { MutableRefObject } from 'react';

type UseWavesurferProps = Omit<WaveSurferOptions, 'container'>;

// WaveSurfer hook
const useWavesurfer = (
  containerRef: MutableRefObject<HTMLElement | null>,
  options: UseWavesurferProps,
  data: Blob
) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    })

    ws.loadBlob(data);

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [options, containerRef])

  return wavesurfer
}

export default useWavesurfer;