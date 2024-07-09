import { TopArtistType } from '@/types/ui/spotify-preview';
import { Card } from '@foliofy/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@foliofy/ui/carousel';
import { H3, Small } from '@foliofy/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TopArtists = ({ data }: { data: TopArtistType[] }) => {
    return (
        <Carousel
            opts={{
                align: "end"
            }}
            className="w-11/12 my-4 max-w-xs md:max-w-screen-xl mx-auto"

        >
            <H3 className='mb-2'>Top Artists</H3>
            <CarouselContent className='items-center'>
                {data.map((item) =>
                    <CarouselItem key={item.id} className="md:!basis-1/2 lg:!basis-1/3">
                        <Link target='__blank' href={item.url}>
                            <Card className='border-none rounded-xl overflow-hidden cursor-pointer relative group'>
                                <Image unoptimized src={item.images[1].url}
                                    alt={item.name}
                                    className='object-cover brightness-75' width={item.images[1].width}
                                    height={item.images[1].height} />
                                <div className='absolute z-10 bottom-2 left-2 text-white'>
                                    <H3 className='font-bold'>{item.name}</H3>
                                    <div className='hidden group-hover:block'>
                                        <Small>{item.followers.toLocaleString()} Followers</Small>
                                        <br />
                                        <Small className='capitalize mx-1'>
                                            {item.genres.reduce((prev, curr, index) => prev + (index === 0 ? "" : ",") + ` ${curr}`, "")}
                                        </Small>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </CarouselItem>)}
            </CarouselContent>
            <div className="hidden sm:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel >
    );
};

export default TopArtists;
