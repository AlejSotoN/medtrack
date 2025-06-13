import express from 'express';
import patientsRouter from './routes/patients.routes';

const app = express();
const port = 3000;

// Esto permite leer JSON desde el body
app.use(express.json());

app.use('/dashboard', patientsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
