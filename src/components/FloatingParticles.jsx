import React, { useMemo } from 'react';

const FloatingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 12,
      color: ['#7c3aed', '#a855f7', '#c084fc', '#e879f9', '#60a5fa', '#34d399'][
        Math.floor(Math.random() * 6)
      ],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
