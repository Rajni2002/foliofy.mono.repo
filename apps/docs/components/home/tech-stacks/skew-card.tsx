import Image from "next/image";

type SkewCardProp = {
    path: string;
}
const SkewCard = ({ path }: SkewCardProp) => (
    <div className="w-fit h-fit">
        <Image src={path} alt="skew-image" className=" -skew-x-[30deg] bg-white rotate-[10deg] shadow-2xl shadow-gray-400 object-cover h-12 w-12 md:!w-20 md:!h-20" width={96} height={96} />
    </div>
);

export default SkewCard;
