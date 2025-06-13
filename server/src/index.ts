import type { Request, Response } from 'express';

const express = require('express')
const patientsRouter = require('./routes/patients.routes')

const app = express();
const port = 3000


app.get('/', (req: Request, res: Response) => {
    res.send('Hello world from express')
})


app.use('/patients', patientsRouter)


app.listen (port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
