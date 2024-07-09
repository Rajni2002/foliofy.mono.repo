const SPOTIFY_ROOT = "https://api.spotify.com/v1";
const LYRIC_ENDPOINT = "https://spclient.wg.spotify.com/color-lyrics/v2";

const GITHUB_ROOT = "https://api.github.com";

const apiConfig = {
  endpoints: {
    spotify: {
      access_token: "https://accounts.spotify.com/api/token",
      lyrics_access_token: "https://open.spotify.com/get_access_token",
      root: SPOTIFY_ROOT,
      get_lyric: (trackId: string) =>
        `${LYRIC_ENDPOINT}/track/${trackId}?format=json&vocalRemoval=true`,
      get_track: (id: string) => `${SPOTIFY_ROOT}/tracks/${id}`,
      get_artist: (id: string) => `${SPOTIFY_ROOT}/artists/${id}`,
      self_lyrics_access_token: "/api/get-lyrics-token",
    },
    github: {
      get_user_info: (id: string) => `${GITHUB_ROOT}/users/${id}`,
      get_user_events: (id: string) =>
        `${apiConfig.endpoints.github.get_user_info(id)}/events?per_page=100`,
    },
  },
};

export type ApiConfig = typeof apiConfig;
export default apiConfig;
