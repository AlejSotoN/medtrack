import React from "react"
import styles from './Dashboard.module.css'
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import axios from "axios"
import { API_URL } from "../../config/localhost_env"

export default function PatientForm() {
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [age, setAge] = React.useState<number | undefined>(undefined);
    const [gender, setGender] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>(null)

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

    return (

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
            <Button
                onClick={handleSubmit}
            >
                Submit
            </Button>
            </div>
    )
}

