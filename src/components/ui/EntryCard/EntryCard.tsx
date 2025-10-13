import React, { useState } from 'react'
import { Entry } from '../../../services/types'
import styles from './EntryCard.module.css'
import Button from '../Button/Button';
import BaseModal from '../BaseModal/BaseModal';
import EntryForm from '../../../features/Entries/EntryForm';
import { useNavigate } from 'react-router-dom';
import { deleteEntry } from '../../../services/entries.server';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = (index: string) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={styles.entryCardContainer}>
      {data.length > 0 ? (
      data.map((entry) => (

      <div key={parseInt(entry.entry_id)}>
        <div
          className={styles.entryCard}
          onClick={() => toggleExpand(entry.entry_id)}
        >
          <span>{formatDateTime(String(entry.date_created))}</span>
          <span>{entry.main_symptoms}</span>
          <span className={styles.toggle}>{expandedIndex === entry.entry_id ? '▲' : '▼'}</span>
        </div>
        {expandedIndex === entry.entry_id && (
          <div className={styles.entryCardDetails}>

            {entry.condition_description && <p className={styles.p}><strong>Description:</strong> {entry.condition_description}</p>}
            {entry.diagnosis && <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>}
            {entry.labs_asked && <p><strong>Labs asked:</strong> {entry.labs_asked}</p>}
            {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
            {entry.treatment && <p><strong>Treatment:</strong> {entry.treatment}</p>}
            <div className={styles.bottomDiv}>
              <Button className={styles.editEntryButton} onClick={()=> navigate(`/dashboard/patient/${entry.patient_id}/edit-entry/${entry.entry_id}`)}>Edit</Button>
              <Button className={styles.deleteEntryButton} onClick={()=>setIsModalOpen(true)}>Delete</Button>
            </div>
          </div>
        )}
       <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Delete Entry?'
        >
          <div className={styles.modalButtons}>
            <Button
              onClick={async () => {
                await deleteEntry(String(entry.entry_id));
                setIsModalOpen(false);
                navigate(0);
              }
              }
              className={styles.deleteEntryButton}
            >
              Confirm
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
          </div>
        </BaseModal>
      </div>
      ))
      ) : (
      <p>No entries found.</p>
      )}
    </div>
  );
};
