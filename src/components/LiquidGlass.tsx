import React, { useRef, useState } from 'react';

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lime';
  href?: string;
  target?: string;
  rel?: string;
}

export const LiquidButton = ({
  children,
  variant = 'secondary',
  className = '',
  onClick,
  href,
  target,
  rel,
  ...props
}: LiquidButtonProps) => {
  const [glare, setGlare] = useState({ x: 50, y: 0, opacity: 0 });
  const elRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const baseClass =
    variant === 'lime'
      ? 'liquid-btn-lime'
      : variant === 'primary'
      ? 'liquid-btn-primary'
      : 'liquid-btn';

  const glareElement = (
    <span
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `radial-gradient(circle 80px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.48), transparent 100%)`,
        opacity: glare.opacity,
        transition: 'opacity 0.25s ease',
        zIndex: 1,
      }}
    />
  );

  const innerContent = (
    <>
      {glareElement}
      <span style={{ position: 'relative', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseClass} ${className}`}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClass} ${className}`}
      {...props}
    >
      {innerContent}
    </button>
  );
};

export const LiquidCard = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`liquid-card ${className}`} {...props}>
      <div style={{ position: 'relative', zIndex: 3 }} className="h-full">
        {children}
      </div>
    </div>
  );
};

export const LiquidPill = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={`liquid-pill ${className}`} {...props}>
      <span style={{ position: 'relative', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
        {children}
      </span>
    </span>
  );
};
