
import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, subtitle }) => {
  return (
    <div className="mb-12 md:mb-20">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-4 uppercase">
        {children}
      </h2>
      <div className="h-px w-12 bg-[#c5a07e]"></div>
      {subtitle && <p className="mt-6 text-gray-400 max-w-2xl">{subtitle}</p>}
    </div>
  );
};
