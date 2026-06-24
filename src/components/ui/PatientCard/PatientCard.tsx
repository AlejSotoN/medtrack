import React from 'react'
import styles from "./PatientCard.module.css"
import { Patient } from '../../../services/types'
import BaseModal from '../BaseModal/BaseModal'
import { deletePatient, uploadPatientAvatar } from '../../../services/patient.client'
import { useNavigate, useRevalidator } from 'react-router-dom'

function formatDate(dateString?: string) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB");
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M8 6V4H16V6M19 6L18.1 20H5.9L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function PatientCard({ patient }: { patient: Patient | undefined }) {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [avatarUploading, setAvatarUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleDelete = async () => {
    try {
      await deletePatient(String(patient?.patient_id));
      revalidator.revalidate();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
    setConfirmDelete(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !patient) return;

    setAvatarUploading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      try {
        await uploadPatientAvatar(String(patient.patient_id), dataUrl);
        revalidator.revalidate();
      } catch (err) {
        console.error('Error uploading avatar:', err);
      } finally {
        setAvatarUploading(false);
      }
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const initials = [patient?.first_name?.[0], patient?.last_name?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase() || '?';

  return (
    <>
      <div className={styles.card}>
        {/* Avatar with upload overlay */}
        <div className={styles.avatarWrap}>
          {patient?.profile_picture ? (
            <img src={patient.profile_picture} alt="Patient" className={styles.avatarImg} />
          ) : (
            <div className={styles.avatar}>{initials}</div>
          )}
          <button
            className={styles.avatarOverlay}
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarUploading}
            title="Change photo"
          >
            {avatarUploading ? '…' : <CameraIcon />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleAvatarChange}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{patient?.first_name} {patient?.last_name}</h1>

          <div className={styles.metaRow}>
            <span>DOB: {formatDate(patient?.date_of_birth)}</span>
            <span className={styles.dot}>·</span>
            <span>Age: {patient?.age ?? '—'}</span>
            <span className={styles.dot}>·</span>
            <span>{patient?.gender || '—'}</span>
          </div>

          <div className={styles.metaRow}>
            <span>Address: {patient?.address || 'Not provided'}</span>
            {patient?.phone_num && (
              <>
                <span className={styles.dot}>·</span>
                <span>Phone: {patient.phone_num}</span>
              </>
            )}
          </div>

          {(patient?.last_visit || patient?.next_followup) && (
            <div className={styles.metaRow}>
              {patient.last_visit && (
                <span className={styles.muted}>Last visit: {formatDate(patient.last_visit)}</span>
              )}
              {patient.last_visit && patient.next_followup && (
                <span className={styles.dot}>·</span>
              )}
              {patient.next_followup && (
                <span className={styles.followup}>Next follow-up: {formatDate(patient.next_followup)}</span>
              )}
            </div>
          )}

          {patient?.register_date && (
            <div className={styles.metaRow}>
              <span className={styles.muted}>Registered: {formatDate(patient.register_date)}</span>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => navigate(`/dashboard/patient/edit/${patient?.patient_id}`)}
          >
            <EditIcon /> Edit
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => setConfirmDelete(true)}
          >
            <TrashIcon /> Delete
          </button>
        </div>
      </div>

      <BaseModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete Patient?"
      >
        <p className={styles.confirmText}>
          This will permanently remove {patient?.first_name} {patient?.last_name} and all their entries. This action cannot be undone.
        </p>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={() => setConfirmDelete(false)}>Cancel</button>
          <button className={styles.confirmDeleteBtn} onClick={handleDelete}>Delete</button>
        </div>
      </BaseModal>
    </>
  );
}
