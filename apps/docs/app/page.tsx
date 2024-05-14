import { Header } from "@/components/home/header";
import Navbar from "@/components/navbar";

export default function Home() {
    return (
        <>
            <div className="px-5 md:px-10 py-6">
                <div className="star-field" >
                    <div className="layer" />
                    <div className="layer" />
                    <div className="layer" />
                </div>
                <Navbar />
                <Header />
            </div>
        </>
    );
}
