import React, { useEffect } from "react";

const Alert = ({ removeAlert, type, msg }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [removeAlert]);

  return (
    <React.Fragment>
      <p className={`alert alert-${type}`}>{msg}</p>
    </React.Fragment>
  );
};

export default Alert;
