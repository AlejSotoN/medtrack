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
    lastVisit?: string;
    nextFollowup?: string;
    profilePicture?: string;
}

export interface NewPatient extends Omit<Patient, 'id'> {}

export async function getPatients() {
    const result = await pool.query('SELECT * FROM patients ORDER BY patient_id DESC');
    return result.rows as Patient[];
}

export async function getPatientById(id: string) {
    const values = [id];
    const result = await pool.query('SELECT * FROM patients WHERE patient_id = $1', values);
    return result.rows[0];
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
    const result = await pool.query(
        'INSERT INTO patients (first_name, last_name, age, gender, date_of_birth, phone_num, address, primary_doctor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values
    );
    return result.rows[0] as Patient;
}

export async function deletePatient(id: string): Promise<void> {
    const values = [id];
    await pool.query('DELETE FROM patients WHERE patient_id = $1', values);
    await pool.query('DELETE FROM patient_entries WHERE patient_id = $1', values);
}

// COALESCE keeps existing value when the incoming field is null/undefined.
export async function updatePatient(id: string, updatedPatient: Partial<NewPatient>): Promise<Patient | null> {
    try {
        const values = [
            updatedPatient.dateOfBirth   ?? null,
            updatedPatient.gender        ?? null,
            updatedPatient.address       ?? null,
            updatedPatient.phoneNum      ?? null,
            (updatedPatient as any).lastVisit    ?? null,
            (updatedPatient as any).nextFollowup ?? null,
        ];

        const query = `
            UPDATE patients
            SET
                date_of_birth = COALESCE($1, date_of_birth),
                gender        = COALESCE($2, gender),
                address       = COALESCE($3, address),
                phone_num     = COALESCE($4, phone_num),
                last_visit    = COALESCE($5, last_visit),
                next_followup = COALESCE($6, next_followup)
            WHERE patient_id = $7
            RETURNING *;
        `;

        const result = await pool.query(query, [...values, id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Database error', error);
        throw error;
    }
}

export async function updatePatientAvatar(id: string, profilePicture: string): Promise<Patient | null> {
    try {
        const result = await pool.query(
            'UPDATE patients SET profile_picture = $1 WHERE patient_id = $2 RETURNING *',
            [profilePicture, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Database error', error);
        throw error;
    }
}
