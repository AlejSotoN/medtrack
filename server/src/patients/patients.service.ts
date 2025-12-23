import pool from '../db';

export default interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    address: string;
    dateOfBirth?: string;
    phoneNum?: string;
    primaryDoctor?: string;
    registerDate: string;
  }
  
  export interface NewPatient extends Omit<Patient, 'id'> {}
  
  export async function getPatients() {
    const result = await pool.query('SELECT * FROM patients ORDER BY patient_id DESC ');
    return result.rows as Patient[];
  }

  export async function getPatientById(id: string) {
    const values = [id]
    const result = await pool.query('SELECT * FROM patients WHERE patient_id = $1', values)
    return result.rows[0]
  }
  
  export async function postPatient(newPatient: Partial<NewPatient>): Promise<Patient> {
    const values = [
      newPatient.firstName,
      newPatient.lastName,
      newPatient.age,
      newPatient.gender,
      newPatient.dateOfBirth,
      newPatient.phoneNum,
      newPatient.address,
      newPatient.primaryDoctor,

    ];

    const result = await pool.query('INSERT INTO patients (first_name, last_name, age, gender, date_of_birth, phone_num, address, primary_doctor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', values)

    return result.rows[0] as Patient;

  }
  
  export async function deletePatient(id: string): Promise<void> {
    const values = [id]
    await pool.query('DELETE FROM patients WHERE patient_id = $1', values);
    await pool.query('DELETE FROM patient_entries WHERE patient_id = $1', values);
  }

  export async function updatePatient(id: string, updatedPatient: Partial<NewPatient>): Promise<Patient | null> {
    try {
      const values = [
        updatedPatient.dateOfBirth ?? null,
        updatedPatient.gender ?? null,
        updatedPatient.address ?? null,
        updatedPatient.phoneNum ?? null,
      ]
  
      const query =`
      UPDATE patients 
      SET  
        date_of_birth = $1, 
        gender = $2, 
        address = $3,
        phone_num = $4 
      WHERE patient_id = $5
      RETURNING *;
      `;
  
      const result = await pool.query(query, [...values, id]);
  
      return result.rows[0] || null;
      
    } catch (error) {
      console.error("Database error", error);
      throw error;
    }
  }