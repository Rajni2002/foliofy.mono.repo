//types
import { HeroImageType } from '@/types/home';
// images
import Image from 'next/image'
//components
import Content from './content';

const HeroSection = ({ image }: HeroImageType) => {
    return (
        <main className='flex flex-col sm:flex-row w-full justify-between items-center my-20 gap-10'>
            <Content />
            {image &&
                <Image
                    src={image}
                    alt="Hero image"
                    width={500}
                    height={500}
                    className='rounded-xl shadow-xl shadow-gray-800 overflow-hidden w-10/12 sm:w-10/12'
                />}
        </main>
    );
};

export default HeroSection;
