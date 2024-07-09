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
import { getTrack } from '@/utils/api-methods/spotify';
import { TopTrackType } from '@/types/ui/spotify-preview';
import { LinkPreviewProps } from '@/types/ui/link-preview';


async function getData() {
    let error = null;
    let previewData = null;
    let primary: LinkPreviewProps[] | null = null;
    let spotify: TopTrackType[] | null = null;
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
        if (process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET) {
            // get the Top tracks 
            spotify = await Promise.all(siteConfig.connect.spotify.topTracks.map(item => getTrack(item)));

        }
    } catch (err) {
        console.log(err)
        error = "Something went wrong";
    }
    return { data: previewData, error, primary, spotify };
}

const ConnectPage = async () => {
    const { data, error, primary, spotify } = await getData();

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
                {primary?.map((item, index) => <Preview key={index} {...item} />)}
                {spotify && <SpotifyPreview data={spotify} />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 border-t mt-6 pt-6 dark:border-gray-800">
                {data?.map((item, index) => <Preview key={index} {...item} />)}
            </div>
        </div>
    );
};

export default ConnectPage;
