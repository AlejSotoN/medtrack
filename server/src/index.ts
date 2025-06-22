import express from 'express';
import patientsRouter from './patients/patients.routes';

const app = express();
const port = 3000;

// Esto permite leer JSON desde el body
app.use(express.json());

// Dashboard route to see patients
app.use('/dashboard', patientsRouter);

app.use('/', (req, res) => {
  res.send('Welcome to the Health Dashboard API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
