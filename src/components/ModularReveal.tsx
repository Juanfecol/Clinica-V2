import React, { useEffect, useRef, useState } from 'react';

export interface ModularRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  enableMouseGlow?: boolean;
  threshold?: number;
}

export const ModularReveal: React.FC<ModularRevealProps> = ({
  children,
  delay = 0,
  className = '',
  enableMouseGlow = false,
  threshold = 0.1,
  ...props
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseGlow || !domRef.current) return;
    const rect = domRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    domRef.current.style.setProperty('--mouse-x', `${x}%`);
    domRef.current.style.setProperty('--mouse-y', `${y}%`);
    domRef.current.style.setProperty('--mouse-active', '1');
  };

  const handleMouseLeave = () => {
    if (!enableMouseGlow || !domRef.current) return;
    domRef.current.style.setProperty('--mouse-active', '0');
  };

  const delayClass =
    delay === 1
      ? 'delay-stagger-1'
      : delay === 2
      ? 'delay-stagger-2'
      : delay === 3
      ? 'delay-stagger-3'
      : delay === 4
      ? 'delay-stagger-4'
      : delay === 5
      ? 'delay-stagger-5'
      : '';

  const glowClass = enableMouseGlow ? 'mouse-ambient-glow' : '';

  return (
    <div
      ref={domRef}
      onMouseMove={enableMouseGlow ? handleMouseMove : undefined}
      onMouseLeave={enableMouseGlow ? handleMouseLeave : undefined}
      className={`modular-module ${delayClass} ${isRevealed ? 'is-revealed' : ''} ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ModularReveal;
