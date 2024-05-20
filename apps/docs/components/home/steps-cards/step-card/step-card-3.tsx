import React from 'react';
import StepWrapper from './wrapper';
import TypingSpan from '../typing-span';

const rawObject = {
    name: "Rajnikant dash",
    theme: "blue",
    github: "https://github.com/Rajni2002",
};

const StepCard3 = () => (
    <StepWrapper>
        <div className='mt-3'>
            <i className='text-gray-700 text-xs md:text-sm'>
                # one command to deploy on vercel
            </i>
            <p className='text-gray-400 text-xs md:text-sm'>
                    $ &nbsp;
                    <span className='font-mono text-gray-500' >
                        <TypingSpan text='foliofy-deploy' />
                    </span>
                </p>
        </div>
    </StepWrapper>
);

export default StepCard3;
