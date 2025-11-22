import React from 'react'
import styles from './editPatient.module.css'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import { useNavigate, useParams } from 'react-router-dom'

export default function editPatient() {
    const navigate = useNavigate()
    const { patientId } = useParams<{ patientId: string }>();
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phone, setPhone] = React.useState('');

    console.log("patient ID", patientId)

    const handleSubmit = async () => {
        try {
            const updatedData = {
                dateOfBirth,
                gender,
                address,
                phoneNum: phone,
            };

            const response = await fetch(`http://localhost:3000/dashboard/${patientId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update patient: ${response.statusText}`);
            }

            const updatedPatient = await response.json();
            console.log("✅ Patient updated:", updatedPatient);

            navigate(-1); // Go back after successful update
        } catch (error) {
            console.error("❌ Error updating patient:", error);
            alert("Error updating patient. Please try again.");
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Button
                onClick={() => navigate(-1)}
                className={styles.backButton}
            >
                Back
            </Button>
            <div className={styles.formContainer}>
                <div className={styles.modalDiv}>
                    <h3>Date of Birth</h3>
                    <Input
                        type='date'
                        placeholder='31/03/1998'
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Gender</h3>
                    <Input
                        placeholder='Male'
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Address</h3>
                    <Input
                        placeholder='Street 123, City, Country'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Phone</h3>
                    <Input
                        placeholder='+1 234 567 890'
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        className={styles.input}
                    />
                </div>
            </div>
            <Button
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    )
}