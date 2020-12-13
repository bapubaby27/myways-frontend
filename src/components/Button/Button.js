import React from "react";
import "./Button.scss";

const Button = ({ versions, children, onClick }) => {
  let classNames = ["button"];
  versions?.forEach((version) => classNames.push(`button--${version}`));
  return (
    <button onClick={onClick} className={classNames.join(" ")}>
      {children}
    </button>
  );
};

export default Button;
