import { Patient, DashboardLoaderData } from '../../services/types'
import React from 'react'
import styles from './Dashboard.module.css'
import Table from '../../components/ui/Table/Table'
import Button from '../../components/ui/Button/Button'
import StatCard from '../../components/ui/StatCard/StatCard'
import { LoaderFunction, useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import PatientForm from './PatientForm'

function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 21C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 3.13C17.77 3.58 19.065 5.19 19.065 7.105C19.065 9.02 17.77 10.63 16 11.08" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 21C22 17.134 19.134 14.5 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 14V21M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MaleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 9L21 3M21 3H16M21 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const loader = (getPatients: () => Promise<Patient[]>): LoaderFunction => async () => {
  const patients = await getPatients();
  return { patients } as DashboardLoaderData;
}

export default function Dashboard() {
  const { patients } = useLoaderData() as DashboardLoaderData;
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [searchPatient, setSearchPatient] = React.useState("");
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const femaleCount = patients.filter(p => p.gender?.toLowerCase() === 'female').length;
  const maleCount = patients.filter(p => p.gender?.toLowerCase() === 'male').length;

  const filteredPatients = React.useMemo(() => {
    if (!searchPatient) return patients;
    const lower = searchPatient.toLowerCase();
    return patients.filter(p =>
      p.first_name.toLowerCase().includes(lower) || p.last_name.toLowerCase().includes(lower)
    );
  }, [patients, searchPatient]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Patients Dashboard</h1>
      </div>

      <div className={styles.statsRow}>
        <StatCard label="Total Patients" value={patients.length} icon={<PeopleIcon />} />
        <StatCard label="Female" value={femaleCount} icon={<FemaleIcon />} />
        <StatCard label="Male" value={maleCount} icon={<MaleIcon />} />
      </div>

      <div className={styles.tableSection}>
        <div className={styles.toolbar}>
          <input
            className={styles.searchInput}
            placeholder="Search by name…"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
          />
          <Button onClick={() => setShowAddForm((v) => !v)}>
            {showAddForm ? 'Cancel' : '+ Add Patient'}
          </Button>
        </div>

        {showAddForm && (
          <div className={styles.inlineForm}>
            <PatientForm
              onCancel={() => setShowAddForm(false)}
              onSuccess={() => { revalidator.revalidate(); setShowAddForm(false); }}
            />
          </div>
        )}

        {filteredPatients.length === 0 ? (
          <p className={styles.empty}>No patients found.</p>
        ) : (
          <Table
            data={filteredPatients}
            onView={(p) => navigate(`/dashboard/patient/${p.patient_id}`)}
            onEdit={(p) => navigate(`/dashboard/patient/edit/${p.patient_id}`)}
          />
        )}
      </div>
    </div>
  );
}
