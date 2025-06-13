import express from 'express';
import { getAllPatients, createPatient } from '../controllers/patients.controller';

const router = express.Router();

router.get('/', getAllPatients);
router.post('/', createPatient);

export default router;
