"use client"
import { Card } from '@foliofy/ui/card';
import Image from 'next/image';

// Optionally import the CSS
import 'react-calendar-heatmap/dist/styles.css';
import React, { useState } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import { addDays } from 'date-fns';
import { GitHubtype, GithubInfo } from '@/types/ui/github';
import { mergeCN } from '@foliofy/utils';
import { Building2, Maximize2, Minimize2 } from '@foliofy/ui/icons';
import Link from 'next/link';
import siteConfig from '@/config/site-config';
import { H3, Large, Muted, P, Small } from '@foliofy/ui/typography';

const SideBio = ({ data }: { data: GithubInfo | null }) => (
    <div>
        <Large className='mb-3'>{data?.name}</Large>
        <Muted>
            {data?.bio}
        </Muted>
        <Small>
            <Building2 size={20} className='text-gray-400 inline mr-2' />
            <span>{data?.company}</span>
        </Small>
    </div>
)

const GithubPreview = ({ data }: { data: GitHubtype }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(prev => !prev);
    return (
        <Card id='github-preview' className={mergeCN('p-6 relative break-inside-avoid dark:border-gray-800 rounded-xl shadow-xl dark:shadow-gray-800')}>

            <div className={mergeCN('flex gap-3 flex-row')}>
                <div className={open ? "w-full" : "w-6/12"}>
                    <div className='flex justify-between items-center mb-4'>
                        <Image width={30} height={30} alt='favicons of urls' className='rounded-lg' src="/icons/socials/github.svg" />
                        <div className='flex gap-3 items-center'>
                            <div onClick={handleOpen} className='p-1 rounded-full bg-inherit hover:scale-110 transition-all cursor-pointer dark:text-gray-200 text-black'>
                                {open ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                            </div>
                        </div>
                    </div>
                    <Link href={siteConfig.connect.github} target='_blank' className='hover:underline'>
                        <H3 className='dark:text-gray-200 break-words text-lg sm:!text-2xl'>{siteConfig.connect.github}</H3>
                    </Link>
                    {!open && <SideBio data={data.info} />}
                </div>
                {!open && <Image unoptimized width={200} height={200} className='rounded-xl aspect-square object-cover w-6/12' alt='Cover image of urls'
                    src={data.info?.avatar_url ?? ""} />}
            </div>
            {open &&
                <div className='mt-3'>
                    <div className='flex gap-3 justify-between mb-4'>
                        <Image unoptimized width={200} height={200} className='rounded-xl aspect-square object-cover' alt='Cover image of urls'
                            src={data.info?.avatar_url ?? ""} />
                        <SideBio data={data.info} />
                    </div>
                    <ReactCalendarHeatmap
                        startDate={addDays(new Date(), -90)}
                        endDate={new Date()}
                        values={data.heatData ?? []}
                        classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-scale-${Math.min(value.count, 4)}`;
                        }}
                        titleForValue={(value) => value?.date ? `${value.date}: ${value.count} contributions` : 'No contributions'}
                        showMonthLabels
                        showWeekdayLabels
                        gutterSize={5}
                    />
                </div>
            }
        </Card>
    );
};

export default GithubPreview;
