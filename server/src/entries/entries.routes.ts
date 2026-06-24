import express from 'express';
import { createEntry, deleteEntryById, getAllEntries, getEntryByEntryId, getPatientEntries, updateEntryController } from './entries.controller';

const router = express.Router();

router.get('/', getAllEntries);
router.get('/patientId/:id', getPatientEntries);
router.get('/patientId/:id/entryId/:id', getEntryByEntryId);
router.post('/', createEntry);
router.delete('/patientId/:id', deleteEntryById);
router.put('/patientId/:patientId/entryId/:entryId', updateEntryController);

export default router;
