import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { PatientProfileLoaderData } from '../../services/types'
import styles from './PatientProfile.module.css'
import PatientCard from '../../components/ui/PatientCard/PatientCard';
import EntryCard from '../../components/ui/EntryCard/EntryCard';
import Button from '../../components/ui/Button/Button';

export default function PatientProfile() {
  const { patient, entries } = useLoaderData() as PatientProfileLoaderData;
  console.log("Entries:", entries)
  return (
    <div>
      <PatientCard
        patient={patient}
      />

      <section className={styles.medicalEntries}>
        <h1 className={styles.title}>Medical Entries</h1>

        <Button
          onClick={() => console.log("clicked")}
        >
          Add Entry
        </Button>
      </section>
      <div>
          <EntryCard
            data={entries}
          />
        </div>
    </div>
  )
}

