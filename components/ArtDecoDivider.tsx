import React from 'react';

const ArtDecoDivider = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex items-center justify-center gap-4">
      <div className="h-[1px] flex-grow bg-accent/30" />
      <div className="rotate-45 w-2 h-2 border border-accent" />
      <div className="h-[1px] flex-grow bg-accent/30" />
    </div>
  );
};

export default ArtDecoDivider;
