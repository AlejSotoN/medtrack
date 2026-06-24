import type { Request, Response } from 'express';
import { deleteEntry, getEntries, getEntriesByPatientId, getEntryById, postEntries, updateEntryById } from './entries.service';

export async function getAllEntries(req: Request, res: Response) {
    try {
        const entries = await getEntries();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getPatientEntries(req: Request, res: Response): Promise<void> {
    const entryByPatientId = req.params.id;
    if (!entryByPatientId) {
        res.status(400).json({ message: 'Entry ID is required.' });
        return;
    }
    try {
        const entry = await getEntriesByPatientId(String(entryByPatientId));
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ message: 'Entries not found.' });
        }
    } catch (error) {
        console.error(`Error fetching entries from Patient ${entryByPatientId}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getEntryByEntryId(req: Request, res: Response) {
    const entryId = req.params.id;
    if (!entryId) {
        res.status(400).json({ message: 'Entry ID is required.' });
        return;
    }
    try {
        const entry = await getEntryById(String(entryId));
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ message: 'Entry not found.' });
        }
    } catch (error) {
        console.error(`Error fetching entry with ID ${entryId}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function createEntry(req: Request, res: Response) {
    const newEntry = req.body;
    const entry = postEntries(newEntry);
    res.status(201).json(entry);
}

export async function updateEntryController(req: Request, res: Response) {
    const { entryId } = req.params;
    const updatedEntry = req.body;
    if (!entryId) {
        res.status(400).json({ message: 'Entry ID is required.' });
        return;
    }
    try {
        const entry = await updateEntryById({ ...updatedEntry, entry_id: Number(entryId) });
        if (entry) {
            res.status(200).json(entry);
        } else {
            res.status(404).json({ message: 'Entry not found.' });
        }
    } catch (error) {
        console.error(`Error updating entry with ID ${entryId}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteEntryById(req: Request, res: Response) {
    const entryId = req.params.id;
    deleteEntry(String(entryId));
    res.status(200).json({ message: `Entry with ID ${entryId} deleted.` });
}
