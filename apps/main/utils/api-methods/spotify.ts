import apiConfig from "@/config/api-config";
import { FetchOptions, TopTrackType } from "@/types/ui/spotify-preview";

// Function to fetch the access token
async function fetchAccessToken(): Promise<string> {
  try {
    const response = await fetch(apiConfig.endpoints.spotify.access_token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? "",
        grant_type: "client_credentials",
      }).toString(),
      next: { revalidate: 3600 },
      //   cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch access token");
  }
}

// Middleware function to add access token to headers
export async function fetchWithAuth(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const token = await fetchAccessToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const enhancedOptions = {
    ...options,
    headers,
  };

  return fetch(url, enhancedOptions);
}

export const getTrack = async (id: string): Promise<TopTrackType> => {
  try {
    const res = await fetchWithAuth(apiConfig.endpoints.spotify.get_track(id));
    const data = await res.json();
    const track: TopTrackType = {
      name: data.name,
      preview_url: data.preview_url,
      id: data.id,
      url: data.external_urls.spotify,
      images: data.album.images,
      artists: data.artists.map((item: any) => ({
        ...item,
        url: item.external_urls.spotify,
      })),
    };
    return track;
  } catch (error) {
    throw error;
  }
};

type AccessTokenResponse = {
  accessToken: string;
  accessTokenExpirationTimestampMs: number;
};

const ACCESS_TOKEN_KEY = "spotifyAccessToken";
const ACCESS_TOKEN_EXPIRATION_KEY = "spotifyAccessTokenExpiration";

const getAccessTokenLyrics = async (): Promise<string> => {
  const cachedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expirationTime = localStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY);

  if (
    cachedAccessToken &&
    expirationTime &&
    Date.now() < parseInt(expirationTime)
  ) {
    return cachedAccessToken;
  }

  const tokenRes = await fetch(apiConfig.endpoints.spotify.self_lyrics_access_token);
  const { accessToken, accessTokenExpirationTimestampMs }: AccessTokenResponse =
    await tokenRes.json();

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(
    ACCESS_TOKEN_EXPIRATION_KEY,
    accessTokenExpirationTimestampMs.toString()
  );

  return accessToken;
};

export const getLyricsClientSide = async (trackId: string): Promise<any> => {
  try {
    const token = await getAccessTokenLyrics();

    const lyricsRes = await fetch(
      apiConfig.endpoints.spotify.get_lyric(trackId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "App-platform": "WebPlayer",
        },
      }
    );

    if (!lyricsRes.ok) {
      throw new Error(`HTTP error! status: ${lyricsRes.status}`);
    }

    return await lyricsRes.json();
  } catch (error) {
    throw error;
  }
};

// // Example usage
// (async () => {
//   try {
//     const trackId = "2PIvq1pGrUjY007X5y1UpM"; // Example track ID
//     const lyrics = await getLyrics(trackId);
//   } catch (error) {
//     console.error('Error fetching lyrics:', error);
//   }
// })();
