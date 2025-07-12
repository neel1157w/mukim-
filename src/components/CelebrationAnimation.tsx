"use client";

import { useState, useEffect } from 'react';

export default function CelebrationAnimation({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-out" style={{animationDuration: '2s'}}>
      <div className="text-6xl md:text-8xl animate-bounce">
        🥳🎉
      </div>
    </div>
  );
}
