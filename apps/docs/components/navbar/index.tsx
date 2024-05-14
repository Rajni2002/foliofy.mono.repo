import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className='flex justify-between'>
            <Image className="h-6 w-[7rem] md:h-8 md:w-40 cursor-pointer" width={160} height={24} src="/img/logo-foliofy.svg" alt="foliofy-logo" />
            <Link href='https://github.com/Rajni2002/foliofy' className="cursor-pointer">
                <img src="/img/social/github-hero.svg" alt='github-icon' className='h-6' />
            </Link>
        </div>
    );
}
