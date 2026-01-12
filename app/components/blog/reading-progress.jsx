'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progressValue = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(progressValue, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: 'transparent' }}>
      <div
        className="h-full bg-gradient-to-r from-[#16f2b3] to-violet-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

