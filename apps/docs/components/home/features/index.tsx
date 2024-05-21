"use client"
import React from 'react';
import { Inter } from "next/font/google";
import { mergeCN } from '@foliofy/utils';
import Image from 'next/image';
import { GradientText } from '@foliofy/ui/text';

const inter = Inter({ subsets: ['latin'] });

type FeatureProps = {
    topTitle: string;
    bottomTitle: string;
    content: string;
    path: string;
    to: "right" | "left";
}

const Feature = ({ topTitle, bottomTitle, path, to, content }: FeatureProps) => (
    <div className={mergeCN(inter.className, "w-full my-14 md:!my-10 flex justify-evenly items-center gap-0 md:!gap-5 flex-col-reverse", to === "left" ? "md:!flex-row-reverse" : "md:!flex-row")}>
        <div className='w-full md:!w-6/12'>
            <h2 className='text-white text-2xl md:!text-5xl font-bold md:!text-left text-center'>
                <GradientText>
                    {topTitle}
                </GradientText>
            </h2>
            <h2 className='text-gray-400 text-2xl md:!text-5xl font-bold md:!text-left text-center'>
                {bottomTitle}
            </h2>
            <p className='text-gray-400 text-sm md:!text-lg mt-3 md:mt-5 md:!text-left text-center'>{content}</p>
        </div>
        <Image
            loading='lazy' src={`/img/illustrations/${path}`}
            quality={100} alt='typing'
            width={200} height={200}
            className='w-full md:!w-4/12 rounded-lg object-cover' />
    </div>
)

const feature_data: FeatureProps[] = [
    {
        topTitle: "Write blogs",
        bottomTitle: "Without database",
        content: "Store your blog content in a local JSON file instead of using a traditional database, saving and retrieving blog posts from a JSON file located on your server, making it easier to manage without needing a database setup",
        to: "right",
        path: "blogs.png"
    },
    {
        topTitle: "Customize",
        bottomTitle: "your folio theme",
        content: "Select from a variety of pre-designed themes or customize your own to make your portfolio uniquely yours.",
        to: "left",
        path: "themes.png"
    },
    {
        topTitle: "Deploy with",
        bottomTitle: "a single command",
        content: "Deploy your portfolio effortlessly with a single command, simplifying the process of getting your site live.",
        to: "right",
        path: "deploy.png"
    },
    {
        topTitle: "Integrate all your",
        bottomTitle: "Socials in one place",
        content: "Easily link all your social media profiles in one place, making it simple for visitors to find and connect with you across platforms.",
        to: "left",
        path: "socials.png"
    },
    {
        topTitle: "Add magic with AI",
        bottomTitle: "while writing",
        content: "Enhance your content creation process with AI assistance, providing suggestions and improvements while you write on your local CMS.",
        to: "right",
        path: "magic.png"
    },
    {
        topTitle: "Enjoy the freedom",
        bottomTitle: "of an open-source package",
        content: "Benefit from using a free and open-source JavaScript package, giving you the flexibility to modify and extend the functionality as needed.",
        to: "left",
        path: "open-source.png"
    },
    {
        topTitle: "Manage content",
        bottomTitle: "with local CMS",
        content: "Manage your content efficiently with a local CMS, providing a simple and intuitive interface for content updates and organization.",
        to: "right",
        path: "cms.png"
    },
    {
        topTitle: "Enjoy SEO-ranked pages",
        bottomTitle: "with quality web-vitals",
        content: "Ensure your portfolio is optimized for search engines with high-quality web-vitals, improving visibility and performance.",
        to: "left",
        path: "seo.png"
    }
];


const Features = () => (
    <div>
        {feature_data.map(item => <Feature key={item.path} {...item} />)}
    </div>
);

export default Features;
