export type SpotifyPreviewType = {};

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export type TopTrackType = {
  id: string;
  url: string;
  name: string;
  artists: {
    name: string;
    url: string;
    id: string;
  }[];
  preview_url: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
};

export type LyricsType = {
  startTimeMs: string;
  words: string;
  syllables: [];
  endTimeMs: string;
};
