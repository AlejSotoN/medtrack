import { API_URL } from '../../config/localhost_env'
import { Patient, DashboardLoaderData} from '../../services/types'
import React, { useEffect } from 'react'
import axios from 'axios'
import styles from './Dashboard.module.css'
import Table from '../../components/ui/Table/Table'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import StatCard from '../../components/ui/StatCard/StatCard'
import Modal from '../../components/ui/Modal/Modal'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'

export const loader = (getPatients: ()=> Promise<Patient[]>): LoaderFunction => async () => {
    const patients = await getPatients();
    console.log(patients)
    return { patients } as DashboardLoaderData;
}

export default function Dashboard() {
  const { patients } = useLoaderData() as DashboardLoaderData;

  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [searchPatient, setSearchPatient] = React.useState<string>("")
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [age, setAge] = React.useState<number | undefined>(undefined);
  const [gender, setGender] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const newPatient = {
      firstName,
      lastName,
      age,
      gender,
    }
    try {
      const response = await axios.post(`${API_URL}/dashboard`, newPatient)
      console.log('Submission successful', newPatient)
    } catch (error: any) {
      console.error('Error submitting new patient:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the patient.');
    }

    setModalOpen(false)
  }

  const filterPatient = React.useMemo(() => {
    if (!searchPatient) return patients;

    const lowerCasePatient = searchPatient.toLowerCase();
    return patients.filter(patient => {
      return patient.first_name.toLowerCase().includes(lowerCasePatient)|| patient.last_name.toLowerCase().includes(lowerCasePatient)
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
            onView={(patients)=> navigate(`/dashboard/patient/${patients.patient_id}`)}
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title='Add New Patient'
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalDiv}>
            <h3>First Name</h3>
            <Input
              placeholder='i.e: Alejandro'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalDiv}>
            <h3>Last Name</h3>
            <Input
              placeholder='i.e: Soto'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalDiv}>
            <h3>Age</h3>
            <Input
              placeholder='i.e: 30'
              onChange={(e) => setAge(parseInt(e.target.value))}
              value={age}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalDiv}>
            <h3>Gender</h3>
            <Input
              placeholder='i.e: Male'
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className={styles.modalInput}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </div>

  )
}