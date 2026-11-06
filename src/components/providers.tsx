'use client';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'motion/react';
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="rr-theme"><MotionConfig reducedMotion="user">{children}</MotionConfig></ThemeProvider>;
}
