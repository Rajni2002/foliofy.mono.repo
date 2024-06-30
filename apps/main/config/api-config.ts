const SPOTIFY_ROOT = "https://api.spotify.com/v1";
const LYRIC_ENDPOINT = "https://spclient.wg.spotify.com/color-lyrics/v2";

const apiConfig = {
  endpoints: {
    spotify: {
      access_token: "https://accounts.spotify.com/api/token",
      lyrics_access_token:
        "https://open.spotify.com/get_access_token",
      root: SPOTIFY_ROOT,
      get_lyric: (trackId: string) => `${LYRIC_ENDPOINT}/track/${trackId}?format=json&vocalRemoval=true`,
      get_track: (id: string) => `${SPOTIFY_ROOT}/tracks/${id}?market=ES`,
      self_lyrics_access_token: "/api/get-lyrics-token"
    },
  },
};

export type ApiConfig = typeof apiConfig;
export default apiConfig;
