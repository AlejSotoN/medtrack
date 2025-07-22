import React from 'react';
import styles from './Table.module.css';
import Button from '../Button/Button';
import Patient from 'services/patients';

interface TableProps {
  data: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
}

export default function 
Table({ data, onView, onEdit }: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {data.map((patient) => (
          <tr key={patient.patient_id}>
            <td>{`${patient.first_name} ${patient.last_name}`}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td  className={styles.td}>
              <Button className={styles.blueButton} onClick={() => onView(patient)}>View Entries</Button>
              <Button className={styles.editPatientButton} onClick={() => onEdit(patient)}>Edit Patient</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
