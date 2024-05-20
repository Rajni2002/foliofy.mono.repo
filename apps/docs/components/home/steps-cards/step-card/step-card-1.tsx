import React from 'react';
import TypingSpan from '../typing-span';
import StepWrapper from './wrapper';

const StepCard1 = () => {
    return (
        <StepWrapper>
            <div className='mt-3'>
                <i className='text-gray-700 text-xs md:text-sm'>
                    # command to bootstrap the portfolio
                </i>
                <p className='text-gray-400 text-xs md:text-sm'>
                    $ &nbsp;
                    <span className='font-mono text-gray-500' >
                        <TypingSpan text='npx create-?????@latest' />
                    </span>
                </p>
            </div>
        </StepWrapper >
    );
};

export default StepCard1;
