import React from 'react'
import styles from './BaseModal.module.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function BaseModal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              {title && <h2>{title}</h2>}
              <button onClick={onClose} className={styles.closeBtn}>×</button>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
    )
}