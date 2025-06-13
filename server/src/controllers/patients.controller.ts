import type { Request, Response } from 'express';
import { getPatients, postPatient } from '../services/patients.service';

export function getAllPatients(req: Request, res: Response) {
  const patients = getPatients();
  res.json(patients);
}

export function createPatient(req: Request, res: Response) {
  const newPatient = req.body;
  const patient = postPatient(newPatient);
  res.status(201).json(patient);
}
