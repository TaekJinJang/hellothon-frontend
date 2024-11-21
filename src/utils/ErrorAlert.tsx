"use client";

import React, { useEffect, useState } from "react";

import { XSquare } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  duration?: number; // 알림이 유지되는 시간 (기본값: 5000ms)
  onClose?: () => void; // 알림이 닫힐 때 실행할 콜백 함수
}

const ErrorAlert = ({ message, duration = 5000, onClose }: ErrorAlertProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // duration 후 페이드 아웃 시작
    const timer = setTimeout(() => {
      setIsFadingOut(true); // 페이드 아웃 애니메이션 시작
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (isFadingOut) {
      // 페이드 아웃 애니메이션 후 컴포넌트 제거
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, 500);

      return () => clearTimeout(removeTimer);
    }
  }, [isFadingOut, onClose]);

  // 페이드 아웃 후 컴포넌트를 완전히 제거
  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 w-full max-w-sm flex items-center p-4 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg shadow-lg transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      role="alert"
    >
      <XSquare className="w-5 h-5 mr-3 text-red-600" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorAlert;
