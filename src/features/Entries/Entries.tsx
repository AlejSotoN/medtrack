import React, { useEffect, useMemo } from 'react'
import Entry from '../../services/entries'
import { API_URL } from '../../config/localhost_env'
import axios from 'axios'
import styles from './Entries.module.css'

export default function Entries() {
  const [entries, setEntries] = React.useState<Entry[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get<Entry>(`${API_URL}/entries`)
        
        setEntries(response.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch entries')
        setLoading(false)
      }
    }
    fetchEntries()
  }, [])

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Patient Entries</h1>
      <div className="entries-grid"> {/* Optional: for grid layout */}
        {entries.map((entry) => (
          <div key={entry.entry_id} className="entry-card">
            <h3>Entry ID: {entry.entry_id}</h3>
            <p><strong>Patient ID:</strong> {entry.patient_id}</p>
            <p><strong>Date:</strong> {new Date(entry.entry_date).toLocaleDateString()}</p>
            <p><strong>Main Symptoms:</strong> {entry.main_symptoms}</p>
            <p><strong>Condition:</strong> {entry.condition_description}</p>
            {entry.labs_asked && <p><strong>Labs Asked:</strong> {entry.labs_asked}</p>}
            <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
            <p><strong>Treatment:</strong> {entry.treatment}</p>
            {entry.notes && <p><strong>Notes:</strong> {entry.notes}</p>}
            {entry.date_created && <p className="meta-data">Created: {new Date(entry.date_created).toLocaleString()}</p>}
            {entry.last_modified && <p className="meta-data">Last Modified: {new Date(entry.last_modified).toLocaleString()}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}