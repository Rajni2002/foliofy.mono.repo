// components
import Preview from '@/components/ui/link-preview';
import { H1, H2 } from '@foliofy/ui/typography';

// utils
import createShortHash from '@/utils/url-to-hash';
import { readSavedData, saveData } from '@/utils/crud-local/connect';
import { JSDOM } from "jsdom";

// config
import siteConfig from '@/config/site-config';

// types
import { LinkPreviewProps } from '@/types/ui/link-preview';
import getPlatformName from '@/utils/get-social-name';


async function fetchLinkPreview(url: string): Promise<LinkPreviewProps> {
    let previewData: LinkPreviewProps = {
        iconURL: "",
        title: "",
        description: "",
        coverURL: "",
        url: "",
    };
    try {
        const response = await fetch(url);
        const res = await response.text();
        const parser = new JSDOM(res);
        const document = parser.window.document;

        previewData.title = document.querySelector("title")?.textContent || "";
        previewData.description = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
        previewData.coverURL = document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
        previewData.url = url;

        const iconLink = document.querySelector('link[rel="shortcut icon"]')?.getAttribute("href") ||
            document.querySelector('link[rel="alternate icon"]')?.getAttribute("href") ||
            document.querySelector('link[rel="icon"]')?.getAttribute("href");

        previewData.iconURL = iconLink ? new URL(iconLink, url).href : `${url}/favicon.ico`;


    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while fetching link preview");
    }

    return previewData;
}

async function getData() {
    let error = null;
    let previewData = null;
    let primary = null;
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
    } catch (err) {
        console.log(err)
        error = "Something went wrong";
    }
    return { data: previewData, error, primary };
}

const ConnectPage = async () => {
    const { data, error, primary } = await getData();

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
            </div>
            <div className="grid sm:grid-cols-3 gap-10 border-t mt-6 pt-6 dark:border-gray-800">
                {data?.map((item, index) => <Preview key={index} {...item} />)}
            </div>
        </div>
    );
};

export default ConnectPage;
