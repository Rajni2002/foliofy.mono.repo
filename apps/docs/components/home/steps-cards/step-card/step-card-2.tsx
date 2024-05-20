import React from 'react';
import StepWrapper from './wrapper';

const rawObject = {
    name: "Rajnikant dash",
    theme: "blue",
};

const StepCard2 = () => (
    <StepWrapper>
        <div className='mt-3'>
            <i className='text-gray-700 text-xs md:text-sm'>
                # configure from CLI or foliofy.config.json
            </i>
            <pre className='text-gray-500 text-xs md:text-sm'>
                <code dangerouslySetInnerHTML={{ __html: JSON.stringify(rawObject, null, 2).replace(/</g, '&lt;').replace(/>/g, '&gt;') }} />
            </pre>
        </div>
    </StepWrapper>
);

export default StepCard2;
