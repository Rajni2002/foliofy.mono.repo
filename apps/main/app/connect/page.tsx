import Preview from '@/components/ui/link-preview';
import { LinkPreviewProps } from '@/types/ui/link-preview';
import { H2 } from '@foliofy/ui/typography';
import { JSDOM } from "jsdom"

async function getData() {
    const url = "https://www.zenskar.com/blog/automatic-billing-system";
    let previewData: LinkPreviewProps = {
        iconURL: "",
        title: "",
        description: "",
        coverURL: "",
        url: "",
    };
    let error = null;
    try {
        const data = await fetch(url);
        const res = await data.text();
        const parser = new JSDOM(res);
        previewData.title = parser.window.document.querySelector("title")?.textContent || "";
        previewData.description =
            parser.window.document.querySelector('meta[name="description"]')?.getAttribute("content") ||
            "";
        previewData.coverURL =
            parser.window.document.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
            "";
        previewData.url = url;
        previewData.iconURL =
            parser.window.document.querySelector('link[rel="shortcut icon"]')?.getAttribute("href") ||
            parser.window.document.querySelector('link[rel="alternate icon"]')?.getAttribute("href") || (
                parser.window.document.querySelector('link[rel="icon"]')?.getAttribute("href") ? `${url}/favicon.ico` : ""
            )
    } catch (err) {
        console.log(err)
        error = "Something went wrong";
    }
    return previewData;
}

const ConnectPage = async () => {
    const data = await getData();
    console.log(data)
    return (
        <div>
            <H2 className='border-none mb-4'>Connect with &nbsp;
                <i className=" underline">
                    rajni
                </i>,
                👋
            </H2>
            <Preview {...data} />
        </div>
    );
};

export default ConnectPage;
