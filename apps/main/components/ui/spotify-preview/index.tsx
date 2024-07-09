"use client"
import { useState } from 'react';

// types
import { TopTrackType } from '@/types/ui/spotify-preview';
import { Card } from '@foliofy/ui/card';
import Image from 'next/image';

//utils
import { mergeCN, truncateUrl } from '@foliofy/utils';
import { Maximize2, Minimize2 } from '@foliofy/ui/icons';

// config
import siteConfig from '@/config/site-config';
import { H3, Muted } from '@foliofy/ui/typography';
import Link from 'next/link';
import Player from './player';
import TopTracks from './top-tracks';


const getUserId = (url: string) => {
    const parsedURL = new URL(url.replace(/\/+$/, ""));

    let userID: string | null = null;
    const pathSegments = parsedURL.pathname
        .split("/")
        .filter((segment) => segment);

    if (pathSegments.length > 0) {
        userID = pathSegments[pathSegments.length - 1];
    }

    return userID
}

const SpotifyPreview = ({ data }: { data: TopTrackType[] }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(prev => !prev);
    const [active, setActive] = useState<number>(Math.floor(Math.random() * (data.length + 1)));

    const selectTrack = (id: string)=>{
        const idx = data.findIndex(item => item.id === id);
        setActive(idx ?? 0);
    }

    return (
        <Card className={mergeCN('p-6 relative break-inside-avoid dark:border-gray-800 rounded-xl shadow-xl dark:shadow-gray-800 bg-[#d3fce3] dark:bg-green-300/10', open ? "sm:col-span-2" : "")}>
            <div className={mergeCN('flex gap-3 flex-row')}>
                <div className={open ? "w-full" : "w-6/12"}>
                    <div className='flex justify-between items-center mb-4'>
                        <Image unoptimized width={30} height={30} alt='favicons of urls' className='rounded-lg' src="/icons/socials/spotify.svg" />
                        <div className='flex gap-3 items-center'>
                            <div onClick={handleOpen} className='p-1 rounded-full bg-inherit hover:scale-110 transition-all cursor-pointer dark:text-gray-200 text-black'>
                                {open ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                            </div>
                        </div>
                    </div>
                    <Link href={siteConfig.connect.spotify.profileURL} target='_blank' className='hover:underline'>
                        <H3 className='dark:text-gray-200 break-words text-lg sm:!text-2xl'>{getUserId(siteConfig.connect.spotify.profileURL)}</H3>
                    </Link>
                </div>
                {!open && <Image unoptimized width={data[active].images[1].width} height={data[active].images[1].height} className='rounded-xl aspect-square object-cover w-6/12' alt='Cover image of urls'
                    src={data[active].images[1].url} />}
            </div>
            {open &&
                <div className='border-t mt-4 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-3'>
                    <Player data={data[active]} />
                    <TopTracks data={data} active={active} selectTrack={selectTrack}/>
                </div>
            }
        </Card>
    );
};

export default SpotifyPreview;
