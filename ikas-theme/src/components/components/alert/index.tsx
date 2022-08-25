import React from "react";

export type FormAlertType = {
  title?: string;
  text: string;
  status: "error" | "success" | "info";
};

type AlertComponentProps = FormAlertType & {
  closable?: boolean;
  onClose?: () => void;
};

export default function AlertComponent(props: AlertComponentProps) {
  const [isVisible, setVisibility] = React.useState(true);
  const onClose = () => {
    setVisibility(false);
    props.onClose && props.onClose();
  };

  if (!isVisible) return null;
  return (
    <div
      className={[
        "relative w-full p-4 pr-5 mb-6",
        "border rounded",
        props.status === "error"
          ? "bg-red bg-opacity-10 border-red text-red"
          : "",
        props.status === "success"
          ? "bg-green bg-opacity-10 border-green text-green"
          : "",
        props.status === "info"
          ? "bg-primary-button-text border-primary-button-bg text-primary-button-bg"
          : "",
      ].join(" ")}
    >
      {props.title && (
        <div className="mb-2 text-base font-medium">{props.title}</div>
      )}
      <div className="font-normal">{props.text}</div>
      {props.closable && (
        <span
          className="absolute top-0 right-0 px-2 py-1 cursor-pointer leading-none"
          tabIndex={0}
          onClick={onClose}
          onKeyPress={onClose}
        >
          x
        </span>
      )}
    </div>
  );
}
