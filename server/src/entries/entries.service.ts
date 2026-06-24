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

export interface NewEntry extends Omit<Entry, 'entry_id'> {}

export async function getEntries() {
    const result = await pool.query('SELECT * FROM patient_entries ORDER BY entry_id DESC');
    return result.rows as Entry[];
}

export async function getEntriesByPatientId(id: string) {
    const values = [id];
    const result = await pool.query('SELECT * FROM patient_entries WHERE patient_id = $1 ORDER BY entry_id DESC', values);
    return result.rows as Entry[];
}

export async function getEntryById(entryId: string): Promise<Entry | null> {
    const values = [entryId];
    const result = await pool.query('SELECT * FROM patient_entries WHERE entry_id = $1', values);
    return result.rows[0] as Entry;
}

export async function updateEntryById(updatedEntry: Entry): Promise<Entry> {
    updatedEntry.last_modified = new Date().toISOString();

    const values = [
        updatedEntry.main_symptoms,
        updatedEntry.condition_description,
        updatedEntry.labs_asked,
        updatedEntry.diagnosis,
        updatedEntry.treatment,
        updatedEntry.notes,
        updatedEntry.last_modified,
        updatedEntry.entry_id,
    ];

    const result = await pool.query(
        `UPDATE patient_entries
         SET main_symptoms = $1,
             condition_description = $2,
             labs_asked = $3,
             diagnosis = $4,
             treatment = $5,
             notes = $6,
             last_modified = $7
         WHERE entry_id = $8
         RETURNING *`,
        values
    );

    return result.rows[0] as Entry;
}

export async function postEntries(newEntry: NewEntry): Promise<Entry> {
    newEntry.date_created = new Date().toISOString();
    newEntry.last_modified = new Date().toISOString();

    const values = [
        newEntry.patient_id,
        newEntry.main_symptoms,
        newEntry.condition_description,
        newEntry.labs_asked,
        newEntry.diagnosis,
        newEntry.treatment,
        newEntry.notes,
        newEntry.date_created,
        newEntry.last_modified,
    ];

    const result = await pool.query(
        'INSERT INTO patient_entries (patient_id, main_symptoms, condition_description, labs_asked, diagnosis, treatment, notes, date_created, last_modified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values
    );

    return result.rows[0] as Entry;
}

export async function deleteEntry(entryId: string): Promise<void> {
    const values = [entryId];
    await pool.query('DELETE FROM patient_entries WHERE entry_id = $1', values);
}
