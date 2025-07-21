import express from 'express';
import { createEntry, getAllEntries } from './entries.controller';

const router = express.Router();

router.get('/', getAllEntries);
router.post('/', createEntry);

export default router;
