import { Entry, EntryUpdatePayload } from "./types";
import api from "./api";

export async function getEntries(): Promise<Entry[]> {
    const response = await api.get('/entries');
    return response.data as Entry[];
}

export async function getEntriesByPatientId(id: string): Promise<Entry[]> {
    const response = await api.get(`/entries/patientId/${id}`);
    return response.data as Entry[];
}

export async function postEntry(newEntry: Partial<Entry>): Promise<Entry> {
    const response = await api.post('/entries', newEntry);
    return response.data as Entry;
}

export async function deleteEntry(entryId: string): Promise<void> {
    await api.delete(`/entries/patientId/${entryId}`);
}

export async function updateEntry(updatedEntry: EntryUpdatePayload): Promise<Entry> {
    const response = await api.put(
        `/entries/patientId/${updatedEntry.patient_id}/entryId/${updatedEntry.entry_id}`,
        updatedEntry
    );
    return response.data as Entry;
}
