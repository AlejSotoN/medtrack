import type { Request, Response } from 'express';
import { getEntries, postEntries } from './entries.service';

export async function getAllEntries(req: Request, res: Response) {
  try {
    const entries = await getEntries();
    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).send('Internal Server Error');
  }
}

export function createEntry(req: Request, res: Response) {
  const newEntry = req.body;
  const entry = postEntries(newEntry);
  res.status(201).json(entry);
}