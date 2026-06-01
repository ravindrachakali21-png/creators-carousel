import React from 'react';

const StarRating = ({ rating, size = 'sm' }) => {
  const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} star`}
          style={{ animationDelay: `${(star - 1) * 0.15}s` }}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={star <= Math.floor(rating) ? '#FBBF24' : star <= rating ? 'url(#halfGrad)' : 'rgba(251,191,36,0.2)'}
          />
          {star > Math.floor(rating) && star <= rating && (
            <defs>
              <linearGradient id="halfGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="rgba(251,191,36,0.2)" />
              </linearGradient>
            </defs>
          )}
        </svg>
      ))}
      <span className="text-yellow-400 text-xs font-semibold ml-1 font-display">{rating}</span>
    </div>
  );
};

export default StarRating;
