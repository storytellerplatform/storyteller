import axios from 'axios';

export const modelRequest = axios.create({
  baseURL: process.env.REACT_APP_MODEL_ENDPOINT,
  timeout: 5000,
});

export const serverRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  timeout: 5000,
});

export const createMusic = async (data: any) => modelRequest.post<Blob>(
  '/music_create', {
    data: JSON.stringify(data)
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