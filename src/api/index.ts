import axios, { AxiosRequestConfig } from 'axios';
import { GenerateMusicRequest } from '../types/api/musicGen';
import { MoodAnaApiReq } from '../types/api/moodAna';

export const modelRequest = axios.create({
  baseURL: process.env.REACT_APP_MODEL_ENDPOINT,
});

export const moodAnaRequest = axios.create({
  baseURL: process.env.REACT_APP_MOODANA_MODEL_ENDPOINT
});

export const serverRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  timeout: 5000,
});

export const createEmotion = async (request: MoodAnaApiReq, config?: AxiosRequestConfig) => moodAnaRequest.post<number[]>(
  '/mood_analyze', request, {
    ...config
  }
);

export const createMusic = async (request: GenerateMusicRequest, config?: AxiosRequestConfig ) => modelRequest.post<Blob>(
  '/music_generate', request, {
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
    ...config
  }
);

export const getMusic = async (audioId: number, token: string) => serverRequest.get<Blob>(
  `/audio/${audioId}`, {
    responseType: 'blob',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
);

export const deleteMusic = async (audioId: number, token: string) => serverRequest.delete<void>(
  `/audio/${audioId}`,{
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
)