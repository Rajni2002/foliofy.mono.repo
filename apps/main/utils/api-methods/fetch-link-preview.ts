import { LinkPreviewProps } from "@/types/ui/link-preview";
import { JSDOM } from "jsdom";

export default async function fetchLinkPreview(url: string): Promise<LinkPreviewProps> {
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