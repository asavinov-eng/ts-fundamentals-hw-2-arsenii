// src/types/pixabay.ts

export interface PixabayImage {
  id: number;
  pageURL: string;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  likes: number;
  views: number;
  comments: number;
  downloads: number;
}

export interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
