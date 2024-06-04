import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import { Header } from "@/components/home/header";
import StepCards from "@/components/home/steps-cards";
import TechStacks from "@/components/home/tech-stacks";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="px-5 md:px-10 py-6">
            <div className="star-field" >
                <div className="layer" />
                <div className="layer" />
                <div className="layer" />
            </div>
            <Navbar />
            <Suspense>
                <Header />
            </Suspense>
            <StepCards />
            <Features />
            <TechStacks />
            <Footer />
        </div>
    );
}
