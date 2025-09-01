import React from "react"
import styles from '../Dashboard/Dashboard.module.css'
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import { postEntry } from "../../services/entries.server"
import { useParams } from "react-router-dom"

export default function EntryForm({ setIsModalOpen }: {setIsModalOpen: (isOpen: boolean) => void}) {
    const { patientId } = useParams<{ patientId: string }>();
    const [mainSymptoms, setMainSymptoms] = React.useState<string>("");
    const [conditionDescription, setConditionDescription] = React.useState<string>("");
    const [diagnosis, setDiagnosis] = React.useState<string>("");
    const [labsAsked, setLabsAsked] = React.useState<string>("");
    const [treatment, setTreatment] = React.useState<string>("");
    const [notes, setNotes] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async () => {
        const newEntry = {
            patient_id: patientId!,
            main_symptoms: mainSymptoms,
            condition_description: conditionDescription,
            diagnosis,
            labs_asked: labsAsked,
            treatment,
            notes,
        }
        try {
            postEntry(newEntry);
            console.log('Submission successful', newEntry)
        } catch (error: any) {
            console.error('Error submitting new patient:', error);
            setError(error.response?.data?.message || 'An error occurred while adding the patient.');
        }

        setIsModalOpen(false)
    }

    return (
            <div className={styles.modalContainer}>
                <div className={styles.modalDiv}>
                    <h3>Main symptoms</h3>
                    <Input
                        placeholder='i.e: Headache, fever'
                        onChange={(e) => setMainSymptoms(e.target.value)}
                        value={mainSymptoms}
                        className={styles.modalInput}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Description</h3>
                    <Input
                        placeholder='i.e: Patient has been experiencing...'
                        onChange={(e) => setConditionDescription(e.target.value)}
                        value={conditionDescription}
                        className={styles.modalInput}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Diagnosis</h3>
                    <Input
                        placeholder='i.e: Flu'
                        onChange={(e) => setDiagnosis(e.target.value)}
                        value={diagnosis}
                        className={styles.modalInput}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Labs asked</h3>
                    <Input
                        placeholder='i.e: Blood test'
                        onChange={(e) => setLabsAsked(e.target.value)}
                        value={labsAsked}
                        className={styles.modalInput}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Treatment</h3>
                    <Input
                        placeholder='i.e: Ibuprofen 400mg'
                        onChange={(e) => setTreatment(e.target.value)}
                        value={treatment}
                        className={styles.modalInput}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Notes</h3>
                    <Input
                        placeholder=''
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
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

