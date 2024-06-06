//server-side
import fs from 'fs';
import path from "path";

//components
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/navbar";

// context & configs
import { ThemeTypeProvider } from "@foliofy/ui/theme-provider";

async function getData() {
    const imagePath = path.join(process.cwd(), 'public', 'home', 'hero.png');
    let image = null;

    try {
        await fs.promises.access(imagePath, fs.constants.F_OK);
        image = "/home/hero.png";
    } catch (err) {
        image = null;
    }

    return {
        image
    };
}

export default async function Home() {
    const { image } = await getData()
    return (
        <ThemeTypeProvider theme="yellow">
            <Navbar currPath="/" />
            <HeroSection image={image} />
        </ThemeTypeProvider>

    );
}
