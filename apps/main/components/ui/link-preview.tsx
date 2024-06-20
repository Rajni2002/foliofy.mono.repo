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
import { ChevronsDownUp, ChevronsUpDown, MoveUpRight } from '@foliofy/ui/icons';

// utils
import { mergeCN, truncateUrl } from '@foliofy/utils';

const Preview = (props: LinkPreviewProps) => {
    const expands = props.pinned ? props.pinned : <P>{props.description}</P>
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(prev => !prev);
    return (
        <Card className='p-6 relative sm:w-6/12 dark:border-gray-800 rounded-xl shadow-xl dark:shadow-gray-800'>
            <div className='p-1 absolute top-3 right-3 rounded-full bg-inherit border dark:border-gray-600 hover:-rotate-12 transition-all cursor-pointer'>
                <Link href={props.url} target='_blank'>
                    <MoveUpRight size={20} />
                </Link>
            </div>
            <div className={mergeCN('flex gap-3', open ? "flex-col-reverse" : "flex-row")}>
                <div className={mergeCN(open ? "w-full" : 'w-6/12')}>
                    <div className='flex justify-between items-center mb-4'>
                        {props.iconURL.length !== 0 && <Image unoptimized width={30} height={30} alt='favicons of urls' className='rounded-lg' src={props.iconURL} />}
                        <div className='flex gap-3 items-center'>
                            <div onClick={handleOpen} className='p-1 rounded-full bg-inherit hover:scale-110 transition-all cursor-pointer'>
                                {open ? <ChevronsDownUp size={20} /> : <ChevronsUpDown size={20} />}
                            </div>
                        </div>
                    </div>
                    <H3 className='dark:text-gray-200'>{props.title.length >= 60 ? (open ? props.title : `${props.title.slice(0, 60)}...`) : props.title}</H3>
                    <Muted className='underline mt-2'>
                        <Link href={props.url} target='_blank' className='hover:text-gray-300'>
                            {truncateUrl(props.url)}
                        </Link>
                    </Muted>
                </div>
                {props.coverURL.length !== 0 && <div className={mergeCN('rounded-xl overflow-hidden', open ? "w-full" : "w-6/12")}>
                    <Image unoptimized width={100} height={50} className='h-full w-full object-cover' alt='Cover image of urls' src={props.coverURL} />
                </div>}
            </div>
            {open && expands}
        </Card>
    )
};

export default Preview;
