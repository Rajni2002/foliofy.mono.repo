"use client"
//hooks
import { useState } from 'react';

// types
import { LinkPreviewProps } from '@/types/ui/link-preview';

// components
import { Card } from '@foliofy/ui/card';
import { H3, Muted, P } from '@foliofy/ui/typography';
import Image from 'next/image';
import Link from 'next/link';

// icons
import { Maximize2, Minimize2, MoveUpRight } from '@foliofy/ui/icons';

// utils
import { mergeCN, truncateUrl } from '@foliofy/utils';
import PlatformBasedSocialEmbed from './platform-based-social-embed';

const Preview = (props: LinkPreviewProps) => {
    const expands = typeof props.pinned !== "undefined" && typeof props.platform !== "undefined" ?
        <div className='grid sm:grid-cols-3 gap-8'>
            {props.pinned.map((url: string, index) => <div key={index} className='dark:brightness-90 mt-3'>
                <PlatformBasedSocialEmbed url={url}
                    platformName={props.platform ?? "github"} height={400} />
            </div>)}
        </div>
        : <P>{props.description}</P>

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(prev => !prev);

    return (
        <Card className={mergeCN('p-6 relative break-inside-avoid h-fit dark:border-gray-800 rounded-xl shadow-xl dark:shadow-gray-800', open ? "sm:col-span-2" : "")}>
            {/* <div className='p-1 absolute top-3 right-3 rounded-full bg-inherit/70 backdrop-blur-sm dark:border-gray-600 hover:-rotate-12 transition-all cursor-pointer text-gray-400'>
                <Link href={props.url} target='_blank'>
                    <MoveUpRight size={20} />
                </Link>
            </div> */}
            <div className={mergeCN('flex gap-3', true ? "flex-col-reverse" : "flex-row")}>
                <div className={mergeCN(true ? "w-full" : 'w-6/12')}>
                    <div className='flex justify-between items-center mb-4'>
                        {props.iconURL.length !== 0 && <Image unoptimized width={30} height={30} alt='favicons of urls' className='rounded-lg' src={props.iconURL} />}
                        <div className='flex gap-3 items-center'>
                            <div onClick={handleOpen} className='p-1 rounded-full bg-inherit hover:scale-110 transition-all cursor-pointer text-gray-400'>
                                {open ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                            </div>
                        </div>
                    </div>
                    <H3 className='dark:text-gray-200'>{props.title.length >= 60 ? (open ? props.title : `${props.title.slice(0, 60)}...`) : props.title}</H3>
                    <Muted className='underline mt-2'>
                        <Link href={props.url} target='_blank' className='hover:text-gray-300 break-words'>
                            {truncateUrl(props.url)}
                        </Link>
                    </Muted>
                </div>
                {props.coverURL && props.coverURL.length !== 0 && <div className={mergeCN('rounded-xl overflow-hidden', true ? "w-full" : "w-6/12")}>
                    <Image unoptimized width={100} height={50} className='h-full w-full object-cover' alt='Cover image of urls' src={props.coverURL} />
                </div>}
            </div>
            {open && expands}
        </Card>
    )
};

export default Preview;
