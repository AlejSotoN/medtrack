import db from '../db';

export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    chiefComplaint: string;
    condition: string;
  }
  
  export interface NewPatient extends Omit<Patient, 'id'> {}
  
  export async function getPatients() {
    const result = await db.query('SELECT * FROM patients ORDER BY id ASC');
    return result.rows as Patient[];
  }
  
  export async function postPatient(newPatient: NewPatient): Promise<Patient> {
    const values = [
      newPatient.firstName,
      newPatient.lastName,
      newPatient.age,
      newPatient.chiefComplaint,
      newPatient.condition
    ];

    const result = await db.query('INSERT INTO patients (first_name, last_name, age, chief_complaint, condition) VALUES ($1, $2, $3, $4, $5) RETURNING *', values)

    return result.rows[0] as Patient;

  }
  