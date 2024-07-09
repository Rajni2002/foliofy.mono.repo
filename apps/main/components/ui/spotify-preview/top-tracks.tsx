import { TopTrackType } from '@/types/ui/spotify-preview';
import { H3, Large, Muted } from '@foliofy/ui/typography';
import Image from 'next/image';
import React from 'react';

const TrackCard = ({ data, selectTrack }: { data: TopTrackType, selectTrack: (id: string) => void }) =>
    <div onClick={() => {
        selectTrack(data.id)
    }} className='flex items-center gap-3 my-1 transition-colors hover:bg-[#9cffc2] p-2 hover:dark:bg-green-300/10 rounded-xl cursor-pointer'>
        <Image width={data.images[2].width} height={data.images[2].height} src={data.images[2].url} alt='track cover'
            className='rounded-xl aspect-square' unoptimized />
        <div>
            <Large>{data.name}</Large>
            <Muted>
                {data.artists.reduce((prev, curr, index) => prev + (index === 0 ? "" : ",") + ` ${curr.name}`, "")}
            </Muted>
        </div>
    </div>

const TopTracks = ({ data, active, selectTrack }: { data: TopTrackType[], active: number, selectTrack: (id: string) => void }) => (
    <div className='md:w-6/12'>
        <H3>Top Tracks</H3>
        {data.filter((_, index) => active !== index).map(item => <TrackCard selectTrack={selectTrack} key={item.id} data={item} />)}
    </div>
);

export default TopTracks;
