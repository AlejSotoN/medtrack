import React from 'react'
import { Entry }from '../../services/types'
import styles from './Entries.module.css'
import EntryCard from '../../components/ui/EntryCard/EntryCard'

export default function Entries() {
  const [entries, setEntries] = React.useState<Entry[]>([])

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Patient Entries</h1>
      <EntryCard
        data={entries}
      />

    </div>
  )
}