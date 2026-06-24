import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Button({ onClick, children, className, type = "button", disabled, style }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className || styles.button}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};
