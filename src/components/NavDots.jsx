import React from 'react';

const NavDots = ({ total, active, onDotClick }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`
            h-2 rounded-full transition-all duration-500 ease-out
            ${i === active
              ? 'dot-active bg-purple-500 shadow-lg shadow-purple-500/50'
              : 'w-2 bg-white/20 hover:bg-white/40'
            }
          `}
          aria-label={`Go to creator ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default NavDots;
