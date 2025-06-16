'use client';

import { useState, useEffect, ReactNode } from 'react';

// This component will wrap our profile card
export default function AnimatedCard({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  // Use an effect to set isMounted to true after the component has been added to the DOM.
  // This ensures the animation plays on load.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={`
        transition-all duration-700 ease-out
        ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
    >
      {children}
    </div>
  );
}