import React from "react";

export const Input = ({ label, type = "text", error, ...props }) => (
  <div>
    {label && <label className="input-label">{label}</label>}
    <input
      type={type}
      className="input-field"
      {...props}
    />
    {error && <p className="input-error">{error}</p>}
  </div>
);

export const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    lime: "btn-lime",
  };
  return (
    <button className={`${variantClasses[variant] || "btn-primary"} ${className}`} {...props}>
      {children}
    </button>
  );
};
