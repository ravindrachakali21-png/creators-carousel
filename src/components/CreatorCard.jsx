import React, { useState } from 'react';
import StarRating from './StarRating';

const CreatorCard = ({ creator, position, isActive, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Position-based styles
  const getCardStyles = () => {
    const base = {
      transformOrigin: 'center center',
      transform: 'translateY(-50%)',
    };

    switch (position) {
      case 0: // active center
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%) scale(1)',
          zIndex: 10,
          opacity: 1,
          filter: 'brightness(1)',
        };
      case 1: // right 1
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(28%) scale(0.82) rotateY(-8deg)',
          zIndex: 7,
          opacity: 0.9,
          filter: 'brightness(0.75)',
        };
      case -1: // left 1
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(-128%) scale(0.82) rotateY(8deg)',
          zIndex: 7,
          opacity: 0.9,
          filter: 'brightness(0.75)',
        };
      case 2: // right 2
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(75%) scale(0.68) rotateY(-12deg)',
          zIndex: 5,
          opacity: 0.65,
          filter: 'brightness(0.55)',
        };
      case -2: // left 2
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(-175%) scale(0.68) rotateY(12deg)',
          zIndex: 5,
          opacity: 0.65,
          filter: 'brightness(0.55)',
        };
      case 3: // right 3 (barely visible)
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(110%) scale(0.55) rotateY(-18deg)',
          zIndex: 3,
          opacity: 0.35,
          filter: 'brightness(0.4)',
        };
      case -3: // left 3
        return {
          ...base,
          left: '50%',
          transform: 'translateY(-50%) translateX(-210%) scale(0.55) rotateY(18deg)',
          zIndex: 3,
          opacity: 0.35,
          filter: 'brightness(0.4)',
        };
      default:
        return {
          ...base,
          left: '50%',
          opacity: 0,
          zIndex: 0,
          pointerEvents: 'none',
        };
    }
  };

  const cardStyles = getCardStyles();
  const isVisible = Math.abs(position) <= 3;

  if (!isVisible) return null;

  // Fallback gradient background if image fails
  const fallbackGradients = [
    'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
    'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    'linear-gradient(135deg, #240b36, #c31432)',
    'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)',
    'linear-gradient(135deg, #141e30, #243b55)',
    'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  ];

  return (
    <div
      className="creator-card"
      style={cardStyles}
      onClick={() => onClick && onClick()}
    >
      <div
        className={`
          relative overflow-hidden rounded-3xl
          ${isActive ? 'active-card-glow' : ''}
          group
        `}
        style={{
          width: isActive ? '280px' : '240px',
          height: isActive ? '400px' : '340px',
          transition: 'width 0.6s ease, height 0.6s ease',
        }}
      >
        {/* Card background / image */}
        <div className="absolute inset-0">
          {!imgError ? (
            <img
              src={creator.image}
              alt={creator.name}
              className="w-full h-full object-cover object-center"
              style={{ transition: 'transform 0.6s ease' }}
              onError={() => setImgError(true)}
              onMouseEnter={e => { if (isActive) e.target.style.transform = 'scale(1.08)'; }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: fallbackGradients[creator.id % fallbackGradients.length] }}
            >
              <span className={`text-6xl font-display font-bold text-white/20 select-none`}>
                {creator.tag}
              </span>
            </div>
          )}
        </div>

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${creator.overlay} opacity-90`} />

        {/* Dark bottom overlay for text */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Shimmer effect */}
        {isActive && (
          <div className="absolute inset-0 card-shimmer opacity-60 pointer-events-none" />
        )}

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white
            bg-gradient-to-r ${creator.badgeColor}
            ${isActive ? 'badge-pulse' : ''}
            shadow-lg
          `}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
            {creator.badge}
          </span>
        </div>

        {/* Category tag */}
        <div className="absolute top-4 right-4">
          <span className={`
            ${creator.tagBg} text-white text-xs font-bold font-display
            px-2.5 py-1 rounded-lg shadow-lg
          `}>
            {creator.tag}
          </span>
        </div>

        {/* Stars (active only) */}
        {isActive && (
          <div className="absolute top-16 left-4 right-4">
            <StarRating rating={creator.rating} />
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Projects count (active only) */}
          {isActive && (
            <div className="flex items-center gap-1 mb-2">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-purple-300 text-xs font-medium">{creator.projects} projects completed</span>
            </div>
          )}

          <h3 className={`font-display font-bold text-white leading-tight mb-1 ${isActive ? 'text-lg' : 'text-sm'}`}>
            {creator.category}
          </h3>

          {isActive && (
            <p className="text-white/70 text-xs leading-relaxed font-body line-clamp-2">
              {creator.description}
            </p>
          )}

          {/* CTA button (active only) */}
          {isActive && (
            <button className={`
              mt-3 w-full py-2 px-4 rounded-xl text-xs font-semibold font-display
              bg-gradient-to-r ${creator.accentColor}
              text-white shadow-lg
              transform transition-all duration-200
              hover:scale-105 hover:shadow-xl
              active:scale-95
            `}>
              View Profile →
            </button>
          )}
        </div>

        {/* Hover ring */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 2px ${creator.glowColor}`,
          }}
        />
      </div>
    </div>
  );
};

export default CreatorCard;
