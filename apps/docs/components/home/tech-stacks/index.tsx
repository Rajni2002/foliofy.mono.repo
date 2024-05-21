import SkewCard from "./skew-card";

const imagePaths: string[] = [
    "/img/nextjs.png",
    "/img/chatgpt.jpg",
    "/img/npm.png",
    "/img/shadcn.png",
    "/img/tailwind.webp",
    "/img/turborepo.png",
    "/img/typescript.png",
    "/img/yarn.png",
]
const TechStacks = () => (
    <div className="my-36">
        <h2 className="text-gray-600 font-semibold my-4 text-xl md:text-2xl text-center">Powered by</h2>
        <div className="flex justify-between mx-5 md:mx-32">
            {imagePaths.slice(0, 4).map(path => <SkewCard key={path} path={path} />)}
        </div>
        <div className="flex justify-between mx-5 md:mx-64 mt-10">
            {imagePaths.slice(4, 8).map(path => <SkewCard key={path} path={path} />)}
        </div>
    </div>
);

export default TechStacks;
