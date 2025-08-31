import { Patient, DashboardLoaderData } from '../../services/types'
import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'
import Table from '../../components/ui/Table/Table'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import StatCard from '../../components/ui/StatCard/StatCard'
import BaseModal from '../../components/ui/BaseModal/BaseModal'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import PatientForm from './PatientForm'

export const loader = (getPatients: () => Promise<Patient[]>): LoaderFunction => async () => {
  const patients = await getPatients();
  return { patients } as DashboardLoaderData;
}

export default function Dashboard() {
  const { patients } = useLoaderData() as DashboardLoaderData;
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [searchPatient, setSearchPatient] = React.useState<string>("")
  const [error, setError] = React.useState<string | null>(null)

  const navigate = useNavigate()


  const filterPatient = React.useMemo(() => {
    if (!searchPatient) return patients;

    const lowerCasePatient = searchPatient.toLowerCase();
    return patients.filter(patient => {
      return patient.first_name.toLowerCase().includes(lowerCasePatient) || patient.last_name.toLowerCase().includes(lowerCasePatient)
    })
  }, [patients, searchPatient])

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.h1}>Patients Dashboard</h1>
      <section className={styles.section}>
        <div className={styles.leftSide}>
          <div className={styles.inputSection}>
            <Input
              placeholder='Search by name'
              onChange={(e) => {
                setSearchPatient(e.target.value)
              }}
              value={searchPatient}
              className={styles.input}
            />
            <Button
              onClick={() => setModalOpen(true)}
              className={styles.addPatientButton}
            >
              Add Patient
            </Button>
          </div>
          <Table
            data={filterPatient}
            onView={(patients) => navigate(`/dashboard/patient/${patients.patient_id}`)}
            onEdit={(patients) => console.log(patients.patient_id)}
          />
          {patients.length === 0 && <p>No patients found.</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div>
          <StatCard
            label='Active Patients'
            value={patients.length}
          />
        </div>

      </section>
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title='Add New Patient'
      >
        <PatientForm />
      </BaseModal>

    </div>

  )
}