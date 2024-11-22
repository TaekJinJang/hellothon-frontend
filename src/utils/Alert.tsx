"use client";

import { CheckSquare, XSquare } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ErrorAlertProps {
  message: string;
  duration?: number; // 알림이 유지되는 시간 (기본값: 5000ms)
  type?: "error" | "success"; // 알림 타입: 기본값은 "error"
  onClose?: () => void; // 알림이 닫힐 때 실행할 콜백 함수
}

const Alert = ({ message, duration = 5000, type = "error", onClose }: ErrorAlertProps) => {
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

  const isError = type === "error";
  const alertStyles = isError
    ? "text-red-800 bg-red-50 border-red-300"
    : "text-emerald-800 bg-emerald-50 border-emerald-300";

  const icon = isError ? (
    <XSquare className="w-5 h-5 mr-3 text-red-600" />
  ) : (
    <CheckSquare className="w-5 h-5 mr-3 text-emerald-500" />
  );

  return (
    <div
      className={`fixed bottom-4 right-4 w-full max-w-sm flex items-center p-4 text-sm rounded-lg shadow-lg transition-opacity duration-500 ${alertStyles} ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      role="alert"
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
