import express from 'express';
import patientsRouter from './patients/patients.routes';
import entriesRouter from './entries/entries.routes'
import cors from 'cors';
import authRoutes from "./auth/auth.routes";
import { requireRole } from './middleware/requireRole';
import { requireAuth } from './middleware/auth.middleware';


const app = express();
const port = 3000;

const allowedOrigins = [
  "http://localhost:5173",
  /^https:\/\/.*\.vercel\.app$/,
]

app.use(cors({
  origin: (origin, callback) => {
    // This allows server-to-server requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((o) =>
      typeof o === "string" ? o === origin : o.test(origin)
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());

// Login route
app.use("/auth", authRoutes);

// Dashboard route to see patients
app.use('/dashboard', requireAuth, requireRole(["admin"]), patientsRouter);
app.use('/entries', requireAuth, requireRole(["admin"]), entriesRouter)

app.use('/', (req, res) => {
  res.send('Welcome to the Health Dashboard API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
