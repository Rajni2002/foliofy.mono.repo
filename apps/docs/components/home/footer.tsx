import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google"
import { mergeCN as cn } from "@foliofy/utils";
const inter = Inter({ subsets: ['latin'] })

const Footer = () => (
    <footer className={cn(inter.className, "flex flex-col gap-4 md:!flex-row justify-between items-center mt-20")}>
        <div className="flex gap-2 items-center">
            <Image className="" width={50} height={50} src="/img/smile.svg" alt="foliofy-logo" />
            <p className="text-gray-500 tracking-wide text-sm">
                <span className="mr-1">
                    Built by
                </span>
                <Link target="__blank" className="underline hover:text-white" href="https://www.linkedin.com/in/rajnikant-dash-2k2/">Rajnikant dash</Link>.
            </p>
        </div>
        <div className="text-gray-500 tracking-wide text-sm">
            <Link target="__blank" className="underline hover:text-white" href="https://www.linkedin.com/in/rajnikant-dash-2k2/">Github</Link>
            <span> • </span>
            <Link target="__blank" className="underline hover:text-white" href="https://twitter.com/rajni2k2/">Twitter</Link>
            <span> • </span>
            <Link target="__blank" className="underline hover:text-white" href="https://www.linkedin.com/in/rajnikant-dash-2k2/">Instagram</Link>
            <span> • </span>
            <Link target="__blank" className="underline hover:text-white" href="mailto:rajnikantdash12@gmail.com">Email</Link>
        </div>
        <div>
            <span className="text-gray-500 text-sm">
                © 2024 • All rights reserved
            </span>
        </div>
    </footer>
);

export default Footer;
