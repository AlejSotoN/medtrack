import express from 'express';
import patientsRouter from './patients/patients.routes';
import entriesRouter from './entries/entries.routes'
import cors from 'cors';
import authRoutes from "./auth/auth.routes";
const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());

// Login route
app.use("/auth", authRoutes);

// Dashboard route to see patients
app.use('/dashboard', patientsRouter);
app.use('/entries', entriesRouter)

app.use('/', (req, res) => {
  res.send('Welcome to the Health Dashboard API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
