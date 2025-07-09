import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className || styles.button}
      >
      {children}
    </button>
  );
};