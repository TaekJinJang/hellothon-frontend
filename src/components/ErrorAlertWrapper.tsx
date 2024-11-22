"use client";

import Alert from "@/utils/Alert";
import React from "react";
import useAlertStore from "@/store/alertStore";

const ErrorAlertWrapper = () => {
  const error = useAlertStore((state) => state.error);
  const setError = useAlertStore((state) => state.setError);

  const handleClose = () => {
    setError(null);
  };

  if (!error) return null;

  return <Alert message={error} type="error" duration={5000} onClose={handleClose} />;
};

export default ErrorAlertWrapper;
