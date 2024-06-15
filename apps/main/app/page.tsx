//server-side
import fs from 'fs';
import path from "path";

//components
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/navbar";
import HeroPhotos from '@/components/home/hero-photos';

// context & configs
import { HeroPhotosType } from '@/types/home';

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
