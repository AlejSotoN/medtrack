import { API_URL } from '../../config/localhost_env'
import Patient from '../../services/patients'
import React, { useEffect } from 'react'
import axios from 'axios'
import styles from './Dashboard.module.css'
import Table from '../../components/ui/Table/Table'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import StatCard from '../../components/ui/StatCard/StatCard'
import Modal from '../../components/ui/Modal/Modal'

interface Props { }

export default function Dashboard(props: Props) {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [searchPatient, setSearchPatient] = React.useState<string>("")
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [age, setAge] = React.useState<number | undefined>(undefined);
  const [chiefComplaint, setChiefComplaint] = React.useState<string>("");
  const [condition, setCondition] = React.useState<string>("");
  const [patients, setPatients] = React.useState<Patient[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async () => {
    const newPatient = {
      firstName,
      lastName,
      age,
      chiefComplaint,
      condition
    }
    try {
      const response = await axios.post(`${API_URL}/dashboard`, newPatient)
      console.log('Submission successful', response, newPatient)
    } catch (error) {
    }
    setModalOpen(false)
  }

  const filterPatient = React.useMemo(() => {
    if (!searchPatient) return patients;

    const lowerCasePatient = searchPatient.toLowerCase();
    return patients.filter(patient => {
      return patient.first_name.toLowerCase().includes(lowerCasePatient) || patient.last_name.toLowerCase().includes(lowerCasePatient)
    })
  }, [patients, searchPatient])

  useEffect(() => {
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
  }, [patients])

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
            >
              Add Patient
            </Button>
          </div>
          <Table
            data={filterPatient}
            onView={(patients) => console.log(patients)}
            onEdit={(patients) => console.log(patients)}
          />
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div>
          <StatCard
            label='Active Patients'
            value={patients.length}
          />
          <StatCard
            label='Recent entries'
            value={456}
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
            <h3>Chief Complaint</h3>
            <Input
              placeholder='i.e: Headache'
              onChange={(e) => setChiefComplaint(e.target.value)}
              value={chiefComplaint}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalDiv}>
            <h3>Condition</h3>
            <Input
              placeholder='i.e: Migraine'
              onChange={(e) => setCondition(e.target.value)}
              value={condition}
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