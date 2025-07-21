import pool from '../db';

export default interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    address: string;
    dateOfBirth: Date;
    phoneNum?: string;
    primaryDoctor?: string;
    registerDate: Date;
  }
  
  export interface NewPatient extends Omit<Patient, 'id'> {}
  
  export async function getPatients() {
    const result = await pool.query('SELECT * FROM patients ORDER BY patient_id ASC');
    return result.rows as Patient[];
  }
  
  export async function postPatient(newPatient: NewPatient): Promise<Patient> {
    const values = [
      newPatient.firstName,
      newPatient.lastName,
      newPatient.age,
      newPatient.gender,
      newPatient.dateOfBirth,
      newPatient.phoneNum,
      newPatient.address,
      newPatient.primaryDoctor,
      newPatient.registerDate,

    ];

    const result = await pool.query('INSERT INTO patients (first_name, last_name, age, gender, date_of_birth, phone_num, address, primary_doctor, register_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING *', values)

    return result.rows[0] as Patient;

  }
  