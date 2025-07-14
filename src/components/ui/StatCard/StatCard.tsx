import React from 'react'
import styles from './StatCard.module.css'
interface StatCardProps {
    label: string;
    value: number;
}

export default function StatCard({label, value}: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  )
}

