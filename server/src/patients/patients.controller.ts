import type { Request, Response } from 'express';
import { getPatients, postPatient } from './patients.service';

export async function getAllPatients(req: Request, res: Response) {
  try {
    const patients = await getPatients();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).send('Internal Server Error');
  }
}

export function createPatient(req: Request, res: Response) {
  const newPatient = req.body;
  const patient = postPatient(newPatient);
  res.status(201).json(patient);
}
