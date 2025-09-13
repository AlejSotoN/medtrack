import React from "react"
import styles from './Dashboard.module.css'
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import { postPatient } from "../../services/patient.server"
import { useNavigate } from "react-router-dom"

export default function PatientForm({ setIsModalOpen }: { setIsModalOpen: (isOpen: boolean) => void }) {
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
            postPatient(newPatient);
            console.log('Submission successful', newPatient)
        } catch (error: any) {
            console.error('Error submitting new patient:', error);
            setError(error.response?.data?.message || 'An error occurred while adding the patient.');
        }
        setIsModalOpen(false)
    }

    return (
        <div className={styles.modalContent}>
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

        </div >
        <Button
            onClick={handleSubmit}
            >
            Submit
        </Button>
        </div>
    )
}

