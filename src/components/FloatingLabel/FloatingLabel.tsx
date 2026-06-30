import React, { useEffect, useRef, useState } from 'react';
import './FloatingLabel.css';

export interface FloatingLabelProps {
  /** The final readable text */
  text: string;
  /** Additional CSS classes */
  className?: string;
  /** Delay before animation starts (in milliseconds) */
  delay?: number;
  /** The speed of decoding (lower is faster interval) */
  speed?: number;
}

const chars = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ';

export const FloatingLabel: React.FC<FloatingLabelProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  speed = 30
}) => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let timeoutId: number;

    const startAnimation = () => {
      let iteration = 0;
      
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      
      intervalRef.current = window.setInterval(() => {
        setDisplayText(() => {
          return text.split('').map((letter, index) => {
            // Keep spaces as spaces
            if (letter === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
        });
        
        if (iteration >= text.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
          }
          setDisplayText(text); // Ensure final state
        }
        
        iteration += 1 / 3; // Decoding speed
      }, speed);
    };

    if (delay > 0) {
      // Set initial scramble state immediately if there's a delay
      setDisplayText(
        text.split('').map(l => (l === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])).join('')
      );
      timeoutId = window.setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [text, delay, speed]);

  return (
    <div className={`floating-label-container ${className}`}>
      <span className="floating-label-text">{displayText}</span>
    </div>
  );
};

