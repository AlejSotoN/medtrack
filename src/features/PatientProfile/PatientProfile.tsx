import React from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { PatientProfileLoaderData } from '../../services/types'
import styles from './PatientProfile.module.css'
import PatientCard from '../../components/ui/PatientCard/PatientCard';
import EntryCard from '../../components/ui/EntryCard/EntryCard';
import EntryForm from '../Entries/EntryForm';

export default function PatientProfile() {
  const [showAddEntry, setShowAddEntry] = React.useState(false);
  const { patient, entries } = useLoaderData() as PatientProfileLoaderData;
  const revalidator = useRevalidator();

  return (
    <div className={styles.page}>
      <PatientCard patient={patient} />

      <section className={styles.entriesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <h2 className={styles.title}>Medical Entries</h2>
            {entries.length > 0 && (
              <span className={styles.badge}>{entries.length}</span>
            )}
          </div>
          <button
            className={styles.addBtn}
            onClick={() => setShowAddEntry((v) => !v)}
          >
            {showAddEntry ? 'Cancel' : '+ Add Entry'}
          </button>
        </div>

        {showAddEntry && (
          <div className={styles.inlineForm}>
            <EntryForm
              patient={patient}
              onCancel={() => setShowAddEntry(false)}
              onSuccess={() => { revalidator.revalidate(); setShowAddEntry(false); }}
            />
          </div>
        )}

        <EntryCard data={entries} />
      </section>
    </div>
  );
}
