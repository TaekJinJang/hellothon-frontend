"use client";

import ErrorAlert from "@/utils/ErrorAlert";
import React from "react";
import useAuthStore from "@/store/authStore";

const ErrorAlertWrapper = () => {
  const error = useAuthStore((state) => state.error);
  const setError = useAuthStore((state) => state.setError);

  return <>{error && <ErrorAlert message={error} duration={5000} onClose={() => setError(null)} />}</>;
};

export default ErrorAlertWrapper;
