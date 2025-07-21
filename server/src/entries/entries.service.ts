import pool from "../db";

export default interface Entry {
    entry_id: number;
    patient_id: number;
    entry_date: string;
    main_symptoms: string;
    condition_description: string;
    labs_asked?: string;
    diagnosis: string;
    treatment: string;
    notes?: string;
    date_created?: string;
    last_modified?: string;
}

export interface NewEntry extends Omit<Entry, 'id'> { }

export async function getEntries() {
    const result = await pool.query('SELECT * FROM patient_entries ORDER BY entry_id ASC');
    return result.rows as Entry[];
}

export async function postEntries(newEntry: NewEntry): Promise<Entry> {
    const values = [
        newEntry.patient_id,
        newEntry.entry_date,
        newEntry.main_symptoms,
        newEntry.condition_description,
        newEntry.labs_asked,
        newEntry.diagnosis,
        newEntry.treatment,
        newEntry.notes,
        newEntry.date_created,
        newEntry.last_modified

    ];

    const result = await pool.query('INSERT INTO patient_entries ( patient_id, entry_date, main_symptoms,condition_description, labs_asked, diagnosis, treatment, notes, date_created, last_modified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *', values)

    return result.rows[0] as Entry;

}