import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GlassIconProps {
  icon: LucideIcon;
  variant?: 'lime' | 'navy' | 'lavender' | 'glass' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

export default function GlassIcon({
  icon: Icon,
  variant = 'lime',
  size = 'md',
  className = '',
  glow = true,
}: GlassIconProps) {
  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-14 h-14 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  };

  // Color variants incorporating brand colors (#2d3277 Navy, #d4e157 Lime, #9c8cc4 Lavender, #ffffff White, #000000 Black)
  const variantClasses = {
    lime: 'bg-gradient-to-br from-[#d4e157]/35 via-[#d4e157]/20 to-white/30 text-[#2d3277] border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(212,225,87,0.3)]',
    navy: 'bg-gradient-to-br from-[#2d3277] via-[#232760] to-[#1e2254] text-[#d4e157] border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_16px_rgba(45,50,119,0.4)]',
    lavender: 'bg-gradient-to-br from-[#9c8cc4]/40 via-[#9c8cc4]/20 to-white/30 text-[#2d3277] border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_12px_rgba(156,140,196,0.3)]',
    glass: 'bg-white/50 backdrop-blur-md text-[#2d3277] border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.05)]',
    white: 'bg-white/95 backdrop-blur-md text-[#2d3277] border-white shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.95),0_6px_18px_rgba(0,0,0,0.08)]',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 group-hover:scale-105 shrink-0 ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.lime} ${className}`}
    >
      {/* Specular glass reflection bar */}
      <div className="absolute inset-x-1.5 top-0.5 h-[35%] rounded-t-xl bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

      {/* Subtle ambient glow behind icon */}
      {glow && (
        <div
          className={`absolute inset-0 rounded-2xl filter blur-md opacity-40 pointer-events-none transition-opacity group-hover:opacity-75 ${
            variant === 'navy' ? 'bg-[#d4e157]' : 'bg-[#2d3277]'
          }`}
        />
      )}

      {/* Icon */}
      <Icon size={iconSizes[size]} strokeWidth={1.8} className="relative z-10 transition-transform duration-300 group-hover:rotate-3" />
    </div>
  );
}
