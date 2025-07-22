import React, { useEffect, useMemo } from 'react'
import Entry from '../../services/entries'
import { API_URL } from '../../config/localhost_env'
import axios from 'axios'
import styles from './Entries.module.css'
import EntryCard from '../../components/ui/EntryCard/EntryCard'

export default function Entries() {
  const [entries, setEntries] = React.useState<Entry[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Patient Entries</h1>
      <EntryCard
        data={entries}
      />

    </div>
  )
}