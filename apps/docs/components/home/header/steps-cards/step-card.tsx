import React from 'react';
import TypingSpan from './typing-span';

const StepCard = () => {
    return (
        <div className='bg-black w-full h-full border border-gray-800 px-3 py-2 text-white shadow-2xl rounded-lg shadow-gray-600'>
            <div className='flex gap-2 items-center justify-start'>
                <div className='w-2 h-2 rounded-full bg-red-400' />
                <div className='w-2 h-2 rounded-full bg-gray-600' />
                <div className='w-2 h-2 rounded-full bg-green-600' />
            </div>
            <div className='mt-3'>
                <i className='text-gray-700 text-sm'>
                    # run the command to bootstrap the portfolio
                </i>
                <p className='text-gray-400 text-sm'>
                    $ &nbsp;
                    <TypingSpan
                        text='npx create-foliofy@latest'
                        className='font-mono' />
                </p>
            </div>
        </div>
    );
};

export default StepCard;
