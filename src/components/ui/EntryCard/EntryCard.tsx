import React, { useState } from 'react'
import { Entry } from '../../../services/types'
import styles from './EntryCard.module.css'
import Button from '../Button/Button';

interface EntryCardProps {
  data: Entry[];
}

function formatDateTime(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function EntryCard({ data }: EntryCardProps) {
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  const toggleExpand = (index: string) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  console.log("esta es la data:", data.length)

  return (
    <div className={styles.entryCardContainer}>
      {data.length > 0 ? (
      data.map((entry) => (

      <div key={parseInt(entry.entry_id)}>
        <div
          className={styles.entryCard}
          onClick={() => toggleExpand(entry.entry_id)}
        >
          <span>{formatDateTime(entry.date_created)}</span>
          <span>{entry.main_symptoms}</span>
          <span className={styles.toggle}>{expandedIndex === entry.entry_id ? '▲' : '▼'}</span>
        </div>
        {expandedIndex === entry.entry_id && (
          <div className={styles.entryCardDetails}>

            {entry.condition_description && <p><strong>Description:</strong> {entry.condition_description}</p>}
            {entry.diagnosis && <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>}
            {entry.labs_asked && <p><strong>Labs asked:</strong> {entry.labs_asked}</p>}
            {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
            {entry.treatment && <p><strong>Treatment:</strong> {entry.treatment}</p>}
            <div className={styles.bottomDiv}>
              <Button className={styles.editEntryButton} onClick={() => onEdit()}>Edit Entry</Button>
              <Button className={styles.deleteEntryButton} onClick={() => onView()}>Delete Entry</Button>
            </div>


          </div>
        )}
      </div>
      ))
      ) : (
      <p>No entries found.</p>
      )}
    </div>
  );
};
