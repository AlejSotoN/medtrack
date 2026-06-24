import express from 'express';
import { getAllPatients, createPatient, getPatient, deletePatientById, patchPatient, patchPatientAvatar } from './patients.controller';

const router = express.Router();

router.get('/', getAllPatients);
router.get('/patient/:id', getPatient);
router.post('/', createPatient);
router.delete('/:id', deletePatientById);
router.patch('/:id', patchPatient);
router.patch('/:id/avatar', patchPatientAvatar);

export default router;
