export interface DownloadWavResponse {
  data: ArrayBuffer; // .wav 檔案的二進制資料
}

export interface GenerateMusicRequest {
  texts: string;
  duration: number;
};