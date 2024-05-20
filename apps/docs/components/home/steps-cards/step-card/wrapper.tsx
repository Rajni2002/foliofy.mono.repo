import { mergeCN } from '@foliofy/utils';
import React from 'react';

type StepWrapperProps = {
    children: React.ReactNode
}

type StepNumberVariants = "first" | "second" | "third"

type gradientMapType = Record<StepNumberVariants, string>;

interface StepProps {
    type: StepNumberVariants
}

interface StepNumberProps extends StepProps {
    val: number,
}

const StepWrapper = ({ children }: StepWrapperProps) => {
    return (
        <div className='bg-black w-fit h-fit border border-gray-800 px-3 py-2 text-white shadow-2xl rounded-lg shadow-gray-600'>
            <div className='flex gap-2 items-center justify-start'>
                <div className='w-2 h-2 rounded-full bg-red-400' />
                <div className='w-2 h-2 rounded-full bg-gray-600' />
                <div className='w-2 h-2 rounded-full bg-green-600' />
            </div>
            {children}
        </div>
    );
};

const gradientMap: gradientMapType = {
    "first": "from-violet-700 to-violet-300",
    "second": "from-violet-700 to-orange-600",
    "third": "from-orange-300 to-orange-600",
}

const lineGradientMap: gradientMapType = {
    "first": "to-violet-700",
    "second": "to-white",
    "third": "to-orange-600"
}
export const StepNumber = ({ val, type }: StepNumberProps) => <div className={mergeCN(
    'w-8 h-8 rounded-full bg-gradient-to-r text-white font-bold flex items-center justify-center',
    gradientMap[type]
)}>
    <span>
        {val}
    </span>
</div>

export const StepLine = ({ type }: StepProps) => <div className={mergeCN('w-[1px] h-14 bg-gradient-to-b from-black', lineGradientMap[type])} />


export default StepWrapper;
