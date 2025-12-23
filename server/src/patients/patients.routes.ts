import express from 'express';
import { getAllPatients, createPatient, getPatient, deletePatientById, patchPatient } from './patients.controller';

const router = express.Router();

router.get('/', getAllPatients);
router.get('/:id', getPatient)
router.post('/', createPatient);
router.delete('/:id', deletePatientById);
router.patch("/:id", patchPatient);

export default router;
