import React from 'react'
import Entry from 'services/entries'
import styles from './EntryCard.module.css'

interface EntryCardProps {
    data: Entry[];
}

export default function EntryCard({ data }: EntryCardProps) {
  return (
    <div className={styles.card}>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.entry_id}>
            {/* <td>{entry.date_created}</td> */}
            <td>{entry.main_symptoms}</td>
            <td>{entry.condition_description}</td>
            <td>{entry.labs_asked}</td>
            <td>{entry.diagnosis}</td>
            <td>{entry.treatment}</td>
            {/* <td>{entry.date_created}</td> */}
            {/* <td>{entry.last_modified}</td> */}
          </tr>
        ))}
      </tbody>
    </div>
  )
}

