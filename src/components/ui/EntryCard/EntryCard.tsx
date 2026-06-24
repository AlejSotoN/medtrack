import React from 'react'
import { Entry } from '../../../services/types'
import styles from './EntryCard.module.css'
import BaseModal from '../BaseModal/BaseModal';
import { useNavigate } from 'react-router-dom';
import { deleteEntry } from '../../../services/entries.client';

interface EntryCardProps {
  data: Entry[];
}

function formatDateTime(isoDate: string) {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EntryCard({ data }: EntryCardProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [entryToDelete, setEntryToDelete] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className={styles.list}>
      {data.length === 0 ? (
        <p className={styles.empty}>No entries yet.</p>
      ) : (
        data.map((entry) => {
          const isOpen = expandedId === String(entry.entry_id);
          return (
            <div key={entry.entry_id} className={styles.card}>
              <button
                className={styles.header}
                onClick={() => toggle(String(entry.entry_id))}
              >
                <div className={styles.headerLeft}>
                  <span className={styles.date}>{formatDateTime(String(entry.date_created ?? entry.entry_date))}</span>
                  <span className={styles.symptoms}>{entry.main_symptoms}</span>
                </div>
                <ChevronIcon open={isOpen} />
              </button>

              {isOpen && (
                <div className={styles.details}>
                  <div className={styles.detailsGrid}>
                    {entry.condition_description && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Description</span>
                        <span className={styles.detailValue}>{entry.condition_description}</span>
                      </div>
                    )}
                    {entry.diagnosis && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Diagnosis</span>
                        <span className={styles.detailValue}>{entry.diagnosis}</span>
                      </div>
                    )}
                    {entry.labs_asked && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Labs Requested</span>
                        <span className={styles.detailValue}>{entry.labs_asked}</span>
                      </div>
                    )}
                    {entry.treatment && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Treatment</span>
                        <span className={styles.detailValue}>{entry.treatment}</span>
                      </div>
                    )}
                    {entry.notes && (
                      <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                        <span className={styles.detailLabel}>Notes</span>
                        <span className={styles.detailValue}>{entry.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.entryActions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => navigate(`/dashboard/patient/${entry.patient_id}/edit-entry/${entry.entry_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => setEntryToDelete(String(entry.entry_id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <BaseModal
        isOpen={entryToDelete !== null}
        onClose={() => setEntryToDelete(null)}
        title="Delete Entry?"
      >
        <p className={styles.confirmText}>This entry will be permanently removed.</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelModalBtn} onClick={() => setEntryToDelete(null)}>Cancel</button>
          <button
            className={styles.confirmDeleteBtn}
            onClick={async () => {
              if (entryToDelete) {
                await deleteEntry(entryToDelete);
                setEntryToDelete(null);
                navigate(0);
              }
            }}
          >
            Delete
          </button>
        </div>
      </BaseModal>
    </div>
  );
}
