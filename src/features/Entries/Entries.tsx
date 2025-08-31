import React from 'react'
import { EntriesLoaderData, Entry }from '../../services/types'
import styles from './Entries.module.css'
import EntryCard from '../../components/ui/EntryCard/EntryCard'
import { useLoaderData } from 'react-router-dom'

export default function Entries() {
  const { entries } = useLoaderData() as EntriesLoaderData;

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Patient Entries</h1>
      <EntryCard
        data={entries}
      />

    </div>
  )
}