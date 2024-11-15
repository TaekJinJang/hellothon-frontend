// src/components/CenteredContainer.tsx
"use client";

import React from "react";

interface CenteredContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function CenteredContainer({ children, className }: CenteredContainerProps) {
  return <div className={`flex items-center justify-center min-h-screen ${className}`}>{children}</div>;
}
