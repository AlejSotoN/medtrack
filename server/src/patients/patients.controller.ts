import type { Request, Response } from 'express';
import { updatePatient, deletePatient, getPatientById, getPatients, postPatient } from './patients.service';

export async function getAllPatients(req: Request, res: Response) {
  try {
    const patients = await getPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).send('Internal Server Error');
  }
}

export async function getPatient(req: Request, res: Response): Promise<void> {
  const patientId = req. params.id;

  if(!patientId) {
    res.status(400).json({ message: "Patient ID is required."});
    return;
  }
  try {
    const patient = await getPatientById(patientId);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({message: "Patient not found."});
    }
  } catch (error) {
    console.error(`Error fetching patient with ID ${patientId}:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function createPatient(req: Request, res: Response) {
  const newPatient = req.body;
  const patient = postPatient(newPatient);
  res.status(201).json(patient);
}

export function deletePatientById(req: Request, res: Response) {
  const patientId = req.params.id;
  deletePatient(patientId);
  // const patient = updatePatient(patientId, updatedPatient);
  res.status(200).json({ message: `Patient with ID ${patientId} deleted.` });
}


export async function patchPatient(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      res.status(400).json({ error: "No fields provided to update." });
      return;
    }

    const updatedPatient = await updatePatient(id, updatedFields);

    if (!updatedPatient) {
      res.status(404).json({ error: `Patient with ID ${id} not found.` });
      return;
    }

    res.status(200).json(updatedPatient);
  } catch (error: any) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
