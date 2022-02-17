import React, { useState } from "react";

export default function Alert(props: any) {
  const [alertState, setAlertState] = useState(true);

  const changeAlertStatus = () => {
    setAlertState(false);
  };

  return alertState && props.alert ? (
    <div className="alert">
      {props.alert}{" "}
      <div className="close-alert">
        <i
          className="bi bi-x"
          onClick={() => {
            changeAlertStatus();
          }}
        ></i>
      </div>
    </div>
  ) : (
    <> </>
  );
}
