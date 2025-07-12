"use client";

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function DeclineAnimation({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1500); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-decline-fade">
      <div className="animate-decline-shake">
        <Trash2 className="h-20 w-20 text-destructive" />
      </div>
    </div>
  );
}
