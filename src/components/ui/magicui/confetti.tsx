"use client";

import React, { createContext, useContext } from "react";
import confetti from "canvas-confetti";
import type { Options as ConfettiOptions } from "canvas-confetti";

interface ConfettiContextType {
  fire: (options?: ConfettiOptions) => void;
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined
);

export const Confetti = ({ children }: { children: React.ReactNode }) => {
  const fire = (options: ConfettiOptions = {}) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      ...options,
    });
  };

  return (
    <ConfettiContext.Provider value={{ fire }}>
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => {
  const context = useContext(ConfettiContext);
  if (!context) {
    return {
      fire: (options?: ConfettiOptions) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          ...options,
        });
      },
    };
  }
  return context;
};
