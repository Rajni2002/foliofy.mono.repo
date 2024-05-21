"use client"

import { useCallback, useEffect, useState } from "react";
import JoinSuperList from "./join-super-list";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { GradientText } from "@foliofy/ui/text";
import { SignatureButton } from "@foliofy/ui/button";

export function Header() {
    const [count, setCount] = useState<number | "Kidding 🤣">(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [joinListModal, setJoinListModal] = useState<boolean>(searchParams.get("join") === "superlist");
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        setJoinListModal(searchParams.get("join") === "superlist")
    }, [searchParams])

    // Countdown effect
    useEffect(() => {
        let start = 0;
        // first three numbers from props
        const end = 180
        // if zero, return
        if (start === end) return;

        // find duration per increment
        let totalMilSecDur = 6;
        let incrementTime = (totalMilSecDur / end) * 1000;

        // timer increments start counter 
        // then updates count
        // ends if start reaches end
        let timer = setInterval(() => {
            start += 1;
            setCount(start)
            if (start === end) {
                clearInterval(timer);
                setCount("Kidding 🤣")
                setInterval(() => setCount(1), 2000);
            }
        }, incrementTime);
    }, [])
    return (
        <header className='my-16 text-center'>
            <JoinSuperList isOpen={joinListModal} visiblityHandler={() =>
                router.push(pathname)
            } />
            <p className="font-semibold md:font-bold text-xl sm:text-4xl leading-6 text-gray-400 sm:!text-gray-200">Build & Deploy your</p>
            <GradientText className="font-black text-4xl sm:text-8xl">Super-portfolio.</GradientText>
            <p className="font-semibold md:font-bold text-xl sm:text-4xl md:mt-3 text-gray-400 sm:!text-gray-200">
                in just
                <span className='ml-2 underline'>
                    {typeof (count) === "number" ? `${count} min` : count}
                </span>
            </p>
            <SignatureButton className='mt-5' onClick={() =>
                router.push('?' + createQueryString('join', 'superlist'))
            } >Join the superlist</SignatureButton>
        </header>
    );
}