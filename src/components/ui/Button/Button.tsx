import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void;
  label: string;
  className: string;
}

export default function Button({ onClick, label, className}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      >
      {label}
    </button>
  );
};