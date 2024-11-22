"use client";

import Alert from "@/utils/Alert";
import React from "react";
import useAlertStore from "@/store/alertStore";

const ErrorAlertWrapper = () => {
  const error = useAlertStore((state) => state.error);
  const setError = useAlertStore((state) => state.setError);

  return <>{error && <Alert message={error} type="error" duration={5000} onClose={() => setError(null)} />}</>;
};

export default ErrorAlertWrapper;
