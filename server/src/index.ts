import express from 'express';
import patientsRouter from './patients/patients.routes';
import entriesRouter from './entries/entries.routes'
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dashboard route to see patients
app.use('/dashboard', patientsRouter);
app.use('/entries', entriesRouter)

app.use('/', (req, res) => {
  res.send('Welcome to the Health Dashboard API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
