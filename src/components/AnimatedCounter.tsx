import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  decimalSeparator?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  decimalSeparator = '.',
  duration = 1500,
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth Ease-In-Out Sine curve: smooth acceleration at start, gentle deceleration at end
      const easeInOutProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      const val = easeInOutProgress * target;

      setCurrentValue(val);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, target, duration]);

  const formattedValue = () => {
    let str = currentValue.toFixed(decimals);
    if (decimalSeparator !== '.') {
      str = str.replace('.', decimalSeparator);
    }
    return `${prefix}${str}${suffix}`;
  };

  return (
    <span ref={containerRef} className={`tabular-nums inline-block ${className}`}>
      {formattedValue()}
    </span>
  );
};
