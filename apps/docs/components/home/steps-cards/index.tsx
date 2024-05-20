"use client"
import React from 'react';
import StepCard1 from './step-card/step-card-1';
import StepCard2 from './step-card/step-card-2';
import StepCard3 from './step-card/step-card-3';
import { StepLine, StepNumber } from './step-card/wrapper';
import { GradientText } from '@foliofy/ui';

const StepCards = () => (
    <div className='w-full h-fit flex flex-col sm:flex-row justify-between gap-12 sm:gap-5 items-center'>
        <div className='flex flex-col items-center'>
            <div>
                <StepNumber val={1} type="first" />
            </div>
            <GradientText
                className='to-violet-600 from-violet-300 font-bold text-lg brightness-75'>Setup with npx</GradientText>
            <StepLine type='first' />
            <StepCard1 />
        </div>
        <div className='flex flex-col items-center'>
            <div>
                <StepNumber val={2} type="second" />
            </div>
            <GradientText
                className='to-violet-600 from-orange-600 font-bold text-lg brightness-75'>Configure and customise</GradientText>
            <StepLine type="second" />
            <StepCard2 />
        </div>
        <div className='flex flex-col items-center'>
            <div>
                <StepNumber val={3} type="third" />
            </div>
            <GradientText
                className='to-orange-500 from-orange-300 font-bold text-lg brightness-75'>Deploy with one command</GradientText>
            <StepLine type="third" />
            <StepCard3 />
        </div>
    </div >
);

export default StepCards;
