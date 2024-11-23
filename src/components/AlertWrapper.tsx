"use client";

import Alert from "@/utils/Alert";
import React from "react";
import useAlertStore from "@/store/alertStore";

export const showErrorAlert = (message = "에러가 발생했습니다. 다시 시도해주세요.") => {
  const setAlert = useAlertStore.getState().setAlert;
  setAlert(message, "error");
};

export const showSuccessAlert = (message = "성공적으로 처리되었습니다.") => {
  const setAlert = useAlertStore.getState().setAlert;
  setAlert(message, "success");
};

const AlertWrapper = () => {
  const message = useAlertStore((state) => state.message);
  const type = useAlertStore((state) => state.type);
  const setAlert = useAlertStore((state) => state.setAlert);

  const handleClose = () => {
    setAlert(null, null);
  };

  if (!message) return null;

  return <Alert message={message} type={type} duration={5000} onClose={handleClose} />;
};

export default AlertWrapper;
