/// <reference types="react-scripts" />
declare module '*.mp3';



// audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
interface Window {
  webkitAudioContext: typeof AudioContext;
}