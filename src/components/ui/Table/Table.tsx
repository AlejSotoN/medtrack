import React from 'react';
import styles from './Table.module.css';
import Button from '../Button/Button';
import Patient from 'services/patients';

interface TableProps {
  data: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
}

export default function Table({ data, onView, onEdit }: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        {data.map((patient) => (
          <tr key={patient.first_name}>
            <td>{patient.first_name}</td>
            <td>{patient.age}</td>
            <td>{patient.condition}</td>
            <td>
              <Button className={styles.blueButton} onClick={() => onView(patient)}>View</Button>
              <Button className={styles.editPatientButton} onClick={() => onEdit(patient)}>Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
