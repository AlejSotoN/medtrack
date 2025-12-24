import express from 'express';
import { getAllPatients, createPatient, getPatient, deletePatientById, patchPatient } from './patients.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllPatients);
router.get('/patient/:id', getPatient)
router.post('/', createPatient);
router.delete('/:id', deletePatientById);
router.patch("/:id", patchPatient);

export default router;
