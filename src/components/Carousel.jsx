import React, { useState, useEffect, useCallback, useRef } from 'react';
import CreatorCard from './CreatorCard';
import NavDots from './NavDots';
import FloatingParticles from './FloatingParticles';
import { creators } from '../data/creators';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(2); // start on Graphic Designer (center)
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const touchStartX = useRef(null);
  const autoPlayRef = useRef(null);

  const total = creators.length;

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(((index % total) + total) % total);
    setTimeout(() => setIsAnimating(false), 600);
  }, [activeIndex, isAnimating, total]);

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      next();
    }, 4500);
    return () => clearInterval(autoPlayRef.current);
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // Touch events
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    clearInterval(autoPlayRef.current);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Get position of card relative to active
  const getPosition = (index) => {
    let pos = index - activeIndex;
    // Wrap around for circular effect
    if (pos > total / 2) pos -= total;
    if (pos < -total / 2) pos += total;
    return pos;
  };

  const activeCreator = creators[activeIndex];

  return (
    <section className="relative min-h-screen bg-mesh grain-overlay flex flex-col items-center justify-center overflow-hidden py-16 px-4">
      <FloatingParticles />

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl transition-all duration-1000"
          style={{
            width: '400px',
            height: '400px',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: `radial-gradient(circle, ${activeCreator.glowColor}33, transparent 70%)`,
          }}
        />
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-900/15 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 max-w-2xl mx-auto">
        {/* Pill label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-purple-300 text-xs font-semibold font-display tracking-widest uppercase">
            Creative Network
          </span>
        </div>

        <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
          <span className="text-white">Explore</span>{' '}
          <span className="text-gradient">millions of creators</span>
        </h1>

        <p className="text-white/50 text-base md:text-lg font-body max-w-md mx-auto leading-relaxed">
          Whether you're looking for a best creator — here you can explore with the creator
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-6">
          {[
            { value: '2M+', label: 'Creators' },
            { value: '98%', label: 'Satisfaction' },
            { value: '50K+', label: 'Projects' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-xl text-white">{stat.value}</div>
              <div className="text-white/40 text-xs font-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full carousel-container"
        style={{ height: '460px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-perspective absolute inset-0">
          {creators.map((creator, index) => {
            const position = getPosition(index);
            return (
              <CreatorCard
                key={creator.id}
                creator={creator}
                position={position}
                isActive={position === 0}
                onClick={() => goTo(index)}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex flex-col items-center gap-5 mt-6">
        {/* Dots */}
        <NavDots
          total={total}
          active={activeIndex}
          onDotClick={goTo}
        />

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            disabled={isAnimating}
            aria-label="Previous creator"
            className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <svg className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 20px rgba(139,92,246,0.4), inset 0 0 0 1px rgba(139,92,246,0.3)' }}
            />
          </button>

          {/* Active creator name */}
          <div className="text-center min-w-[140px]">
            <div
              className="font-display font-bold text-white text-sm transition-all duration-500"
              key={activeIndex}
              style={{ animation: 'fadeUp 0.4s ease-out' }}
            >
              {activeCreator.name}
            </div>
            <div className="text-purple-400 text-xs font-body">{activeCreator.category}</div>
          </div>

          <button
            onClick={next}
            disabled={isAnimating}
            aria-label="Next creator"
            className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="text-white/20 text-xs font-body hidden md:block">
          Use ← → arrow keys to navigate
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Carousel;
