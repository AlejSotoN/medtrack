import React from 'react'
import { EntriesLoaderData } from '../../services/types'
import styles from './Entries.module.css'
import EntryCard from '../../components/ui/EntryCard/EntryCard'
import { useLoaderData } from 'react-router-dom'

export default function Entries() {
  const { entries } = useLoaderData() as EntriesLoaderData;
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!search) return entries;
    const lower = search.toLowerCase();
    return entries.filter(e => e.main_symptoms?.toLowerCase().includes(lower));
  }, [entries, search]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Entries</h1>
          {entries.length > 0 && (
            <span className={styles.badge}>{entries.length}</span>
          )}
        </div>
        <p className={styles.subtitle}>All medical entries across patients</p>
      </div>

      <div className={styles.section}>
        <div className={styles.toolbar}>
          <input
            className={styles.searchInput}
            placeholder="Filter by symptoms…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No entries found.</p>
        ) : (
          <div className={styles.listWrap}>
            <EntryCard data={filtered} />
          </div>
        )}
      </div>
    </div>
  );
}
