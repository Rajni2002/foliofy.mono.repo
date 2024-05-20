"use client"
import { mergeCN } from '@foliofy/utils';
import { useState, useEffect } from 'react';
type TypingAnimationProps = {
  text: string;
  speed?: number;
}

const TypingSpan = ({ text, speed = 100 }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, index, text, speed]);

  return (
    <>{displayedText}</>
  );
};

export default TypingSpan;
