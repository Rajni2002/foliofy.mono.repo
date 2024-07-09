// components
import Preview from '@/components/ui/link-preview';
import { H1, H2 } from '@foliofy/ui/typography';

// utils
import createShortHash from '@/utils/url-to-hash';
import { readSavedData, saveData } from '@/utils/crud-local/connect';

// config
import siteConfig from '@/config/site-config';

// types
import getPlatformName from '@/utils/get-social-name';
import SpotifyPreview from '@/components/ui/spotify-preview';
import fetchLinkPreview from '@/utils/api-methods/fetch-link-preview';
import { getArtist, getTrack } from '@/utils/api-methods/spotify';
import { CombinedSpotifyData } from '@/types/ui/spotify-preview';
import { LinkPreviewProps } from '@/types/ui/link-preview';
import { getGithubDataHeatmap, getUserInfo } from '@/utils/api-methods/github';
import GithubPreview from '@/components/ui/github-preview';
import { GitHubtype } from '@/types/ui/github';


async function getData() {
    let error = null;
    let previewData = null;
    let primary: LinkPreviewProps[] | null = null;
    let spotify: CombinedSpotifyData = { tracks: null, artists: null };
    let github: GitHubtype = {
        heatData: null,
        info: null
    }
    try {
        const localLinkCache = await readSavedData();
        const catched = siteConfig.connect.secondary.filter(url => createShortHash(url) in localLinkCache)
            .map(url => localLinkCache[createShortHash(url)]);
        const notCatched = siteConfig.connect.secondary.filter(url => !(createShortHash(url) in localLinkCache));
        previewData = await Promise.all(notCatched.map(async url => {
            try {
                const res = await fetchLinkPreview(url);
                localLinkCache[createShortHash(url)] = res;
                return res;
            } catch (error) {
                throw error
            }
        }));
        if (notCatched.length)
            await saveData(localLinkCache)
        // for primary links
        primary = siteConfig.connect.primary.map(item => {
            const result = getPlatformName(item.url);
            return {
                ...(result === "invalid URL" ? {} : result),
                pinned: item.pinned
            }
        });
        previewData = [...previewData, ...catched,]

        // if spotify key exist
        if (process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET) {
            // get the Top tracks if exists
            if (siteConfig.connect.spotify.topTracks)
                spotify.tracks = await Promise.all(siteConfig.connect.spotify.topTracks.map(item => getTrack(item)));

            // get the top Artists if exists
            if (siteConfig.connect.spotify.topArtists)
                spotify.artists = await Promise.all(siteConfig.connect.spotify.topArtists.map(item => getArtist(item)))
        }

        // if github key exist
        if (process.env.GIT_KEY) {
            github.heatData = await getGithubDataHeatmap(siteConfig.connect.github);
            github.info = await getUserInfo(siteConfig.connect.github);
        }
    } catch (err) {
        console.log(err)
        error = "Something went wrong";
    }
    return { data: previewData, error, primary, spotify, github };
}

const ConnectPage = async () => {
    const { data, error, primary, spotify, github } = await getData();

    if (error) return <H1>{error}</H1>

    return (
        <div className='sm:w-10/12 mx-auto h-fit'>
            <H2 className='border-none mb-4'>Connect with &nbsp;
                <i className=" underline">
                    rajni
                </i>,
                👋
            </H2>
            <div className="grid sm:grid-cols-2 gap-10">
                {github && <GithubPreview data={github} />}
                {primary?.map((item, index) => <Preview key={index} {...item} />)}
                {spotify && <SpotifyPreview tracks={spotify.tracks} artists={spotify.artists} />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 border-t mt-6 pt-6 dark:border-gray-800">
                {data?.map((item, index) => <Preview key={index} {...item} />)}
            </div>
        </div>
    );
};

export default ConnectPage;
