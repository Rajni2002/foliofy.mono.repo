import { HeroPhotosType } from "@/types/home";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@foliofy/ui/carousel";
import Image from "next/image";
import SwipeAnimation from "./SwipeAnimation";


const HeroPhotos = ({ images = [] }: { images?: HeroPhotosType }) => (
    images.length !== 0 && <Carousel
        opts={{
            align: "start",
        }}
        className="w-full max-w-xs md:max-w-screen-xl mx-auto"
    >
        <CarouselContent>
            {images.map((image, index) =>
                <CarouselItem key={index} className="md:!basis-1/2 lg:!basis-1/4">
                    <Image
                        src={`/home/hero-photos/${image}`}
                        alt={`${image} hero photos`}
                        width={500}
                        height={500}
                        className='rounded-xl border border-gray-700 object-cover overflow-hidden h-80 max-h-80'
                    />
                </CarouselItem>)}
        </CarouselContent>
        <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
        </div>
    </Carousel >
);

export default HeroPhotos;
