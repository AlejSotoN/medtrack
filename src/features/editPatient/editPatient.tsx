import React from 'react'
import styles from './editPatient.module.css'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { PatientLoaderData } from '../../services/types'
import PatientForm from '../Dashboard/PatientForm'

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EditPatient() {
  const navigate = useNavigate();
  const { patient } = useLoaderData() as PatientLoaderData;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <BackIcon /> Back
        </button>
        <div>
          <h1 className={styles.title}>Edit Patient</h1>
          <p className={styles.subtitle}>
            {patient ? `${patient.first_name} ${patient.last_name}` : 'Update patient information'}
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <PatientForm
          mode="edit"
          patient={patient}
          onCancel={() => navigate(-1)}
          onSuccess={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
