import React from 'react';
import styles from './Table.module.css';
import { Patient } from "../../../services/types";

interface TableProps {
  data: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
}

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Table({ data, onView, onEdit }: TableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th className={styles.colSm}>Age</th>
            <th className={styles.colSm}>Gender</th>
            <th className={styles.colMd}>Last Visit</th>
            <th className={styles.colLg}>Next Follow-up</th>
            <th className={styles.colLg}>Phone</th>
            <th className={styles.actionsCol} />
          </tr>
        </thead>
        <tbody>
          {data.map((patient) => (
            <tr key={patient.patient_id}>
              <td className={styles.nameCell}>
                <span className={styles.fullName}>
                  {patient.first_name} {patient.last_name}
                </span>
                <span className={styles.ageMobile}>{patient.age ?? '—'} yrs</span>
              </td>
              <td className={styles.colSm}>{patient.age ?? '—'}</td>
              <td className={styles.colSm}>
                <span className={`${styles.genderBadge} ${styles[`gender${patient.gender}`]}`}>
                  {patient.gender || '—'}
                </span>
              </td>
              <td className={styles.colMd}>{formatDate(patient.last_visit)}</td>
              <td className={`${styles.colLg} ${patient.next_followup ? styles.followupActive : ''}`}>
                {formatDate(patient.next_followup)}
              </td>
              <td className={styles.colLg}>{patient.phone_num || '—'}</td>
              <td className={styles.actionsCol}>
                <div className={styles.actions}>
                  <button className={styles.viewBtn} onClick={() => onView(patient)}>View</button>
                  <button className={styles.editBtn} onClick={() => onEdit(patient)}>Edit</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
