import { API_URL } from '../../config/localhost_env'
import Patient from '../../services/patients'
import React, { useEffect } from 'react'
import axios from 'axios'

interface Props {}

export default function Dashboard(props: Props) {
  const [patients, setPatients] = React.useState<Patient[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  useEffect(()=> {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<Patient[]>(`${API_URL}/dashboard`)
        setPatients(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch patients')
        setLoading(false)
      }
    }
    fetchPatients()
  })

  return (
    <section> 
      <h1>Patient Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {patients.map((patient) => (
            <div key={patient.id}>
              <h2>{patient.first_name}</h2>
              <p>Age: {patient.age}</p>
              <p>Condition: {patient.condition}</p>
            </div>
          ))}
        </ul>

    </section>
  )
}