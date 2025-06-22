"use client";

import { useState, useEffect } from "react";
import LoadingAnimation from "./loading-animation";

export default function AppContainer({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
