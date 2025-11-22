import React, { use } from 'react'
import styles from "./PatientCard.module.css"
import { Patient } from 'services/types'
import Button from '../Button/Button'
import BaseModal from '../BaseModal/BaseModal'
import { deletePatient } from '../../../services/patient.server'
import { useNavigate, useRevalidator } from 'react-router-dom'

function formatDateTime(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDate(dateString?: string) {
  if (!dateString) return "—"; // gracefully handle null/undefined
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.warn("Invalid date received:", dateString);
    return "Invalid date";
  }
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
}



export default function PatientCard({ patient }: { patient: Patient | undefined }) {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleSubmit = async () => {
    try {
      await deletePatient(String(patient?.patient_id!));
      revalidator.revalidate();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
    setIsModalOpen(false);
  };
  return (
    <section className={styles.patientCard}>
      <div className={styles.leftSide}>
        <img className={styles.profilePicture} alt='Profile Picture'></img>
      </div>
      <div className={styles.rightSide}>
        <h1>{`${patient?.first_name} ${patient?.last_name}`}</h1>
        <p>{`Date of Birth: ${formatDate(patient?.date_of_birth) ? "Pending" : undefined} (Age: ${patient?.age})`}</p>
        <p>{`Gender: ${patient?.gender}`}</p>
        <p>{`Address: ${patient?.address ? null : "Pending"}`}</p>
        <p>{`Phone: ${patient?.phone_num ? null : "Pending"}`}</p>
        <p>{`Registered: ${formatDateTime(patient?.register_date ?? "")}`}</p>
        <Button
          onClick={() => { setIsModalOpen(true) }}
          className={styles.deleteButton}
        >
          Delete Patient
        </Button>
      </div>
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div>Are you sure you want to delete this patient?</div>
        <div className={styles.modalButtons}>
          <Button
            onClick={handleSubmit}
            className={styles.confirmButton}
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
    </section>
  )
}