import { TopTrackType } from '@/types/ui/spotify-preview';
import Image from 'next/image';
import React from 'react';

const PreviewGrid = ({ data }: { data: TopTrackType[] }) => (
    <div className='grid grid-cols-2 gap-3'>
        {data.slice(0, 4).map(item => <Image unoptimized
            width={item.images[1].width}
            height={item.images[1].height}
            className='rounded-xl aspect-square object-cover w-full' alt='Cover image of urls'
            src={item.images[1].url} />)}
    </div>
);

export default PreviewGrid;
