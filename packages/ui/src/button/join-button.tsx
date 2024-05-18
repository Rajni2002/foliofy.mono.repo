import { mergeCN } from '@foliofy/utils';
import React from 'react';
import { ButtonProps } from './types';

interface JoinButtonProps
    extends ButtonProps {
    isSubmitted?: Boolean
    onClick?: () => void
}

const JoinButton = ({ loading, isSubmitted = false, disabled = false, onClick = () => { } }: JoinButtonProps) => {
    return (
        <button onClick={onClick} className={mergeCN('mx-auto h-fit w-fit font-semibold bg-black rounded-[5rem] text-gray-400', disabled && "shadow-[0px_0px_50px_10px_white] text-white", !loading && "px-4 py-3 border-[1px] border-gray-600")}>
            {loading ?
                <img className='mx-auto animate-pulse' src='/img/smile.svg' alt='Loading svg' /> :
                <span className="bg-gradient-to-l from-orange-400 from-[5%] to-[#7834FF] bg-clip-text text-transparent">
                    Join the Super List
                </span>
            }
        </button>
    );
};

export default JoinButton;
