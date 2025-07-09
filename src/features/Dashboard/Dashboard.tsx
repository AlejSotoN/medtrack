import { API_URL } from '../../config/localhost_env'
import Patient from '../../services/patients'
import React, { useEffect } from 'react'
import axios from 'axios'
import styles from './Dashboard.module.css'
import Table from '../../components/ui/Table/Table'

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
    <section className={styles.section}> 
      <h1 className={styles.h1}>Patients Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table
      data={patients}
      onView={(patients)=> console.log(patients)}
      onEdit={(patients)=> console.log(patients)}
  />

    </section>
  )
}