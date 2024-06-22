import Preview from '@/components/ui/link-preview';
import siteConfig from '@/config/site-config';
import { LinkPreviewProps, URLstringType } from '@/types/ui/link-preview';
import { readSavedData, saveData } from '@/utils/crud-local/connect';
import createShortHash from '@/utils/url-to-hash';
import { H1, H2 } from '@foliofy/ui/typography';
import { JSDOM } from "jsdom";


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

async function getData(){
    let error = null;
    let previewData = null;
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
        previewData = [...previewData, ...catched]
    } catch (err) {
        console.log(err)
        error = "Something went wrong";
    }
    return { data: previewData, error };
}

const ConnectPage = async () => {
    const { data, error } = await getData();

    if (error) return <H1>{error}</H1>

    return (
        <div className='sm:w-9/12 mx-auto h-fit'>
            <H2 className='border-none mb-4'>Connect with &nbsp;
                <i className=" underline">
                    rajni
                </i>,
                👋
            </H2>
            <div className="sm:columns-2 gap-10">
                {data?.map((item, index) => <Preview key={index} {...item} />)}
            </div>
        </div>
    );
};

export default ConnectPage;
