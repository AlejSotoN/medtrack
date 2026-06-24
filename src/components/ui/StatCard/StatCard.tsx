import React from 'react'
import styles from './StatCard.module.css'

interface StatCardProps {
    label: string;
    value: number;
    icon?: React.ReactNode;
    trend?: string;
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      {trend && <div className={styles.trend}>{trend}</div>}
    </div>
  )
}
