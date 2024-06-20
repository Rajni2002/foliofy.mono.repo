//server-side
import fs from 'fs';
import path from "path";
// import preview from "link-preview-generator";
import { JSDOM } from "jsdom"
//components
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/navbar";
import HeroPhotos from '@/components/home/hero-photos';

// context & configs
import { HeroPhotosType } from '@/types/home';
import link_preview_generator from 'link-preview-generator';

// Function to check if a file is an image
function isImage(file: string): boolean {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'].includes(ext);
}

// read all the images in the directory path
function readImages(directoryPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject(err);
            }

            const imageFiles = files.filter(file => isImage(file));
            resolve(imageFiles);
        });
    });
}

async function getData() {
    const imagePath = path.join(process.cwd(), 'public', 'home', 'hero.jpeg');
    let heroImages: HeroPhotosType = [];
    let image = null;
    try {
        await fs.promises.access(imagePath, fs.constants.F_OK);
        image = "/home/hero.jpeg";
        heroImages = await readImages(path.join(process.cwd(), 'public', 'home', 'hero-photos'));
        const data = await fetch("https://www.instagram.com/iamsrk/p/C7jPYA6ofJ_/");
        const res = await data.text();
        const parser = new JSDOM(res);
        const title = parser.window.document.querySelector("title")?.textContent || "";
        const description =
            parser.window.document.querySelector('meta[name="description"]')?.getAttribute("content") ||
            "";
        const image1 =
            parser.window.document.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
            "";
        console.log({ title, description, image1 });
        console.log(parser.window.document.querySelector("head")?.textContent)
    } catch (err) {
        console.log(err)
        image = null;
    }
    return {
        image,
        heroImages
    };
}

export default async function Home() {
    const { image, heroImages } = await getData();
    return (
        <>
            <HeroSection image={image} />
            <HeroPhotos images={heroImages} />
        </>
    );
}
