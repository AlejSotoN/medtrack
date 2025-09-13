import { useState } from 'react'
import React from 'react'
import styles from './EditEntry.module.css'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'

export default function EditEntry() {
    return (
        <div>
            <div className={styles.formContainer}>
                <div className={styles.modalDiv}>
                    <h3>Main symptoms</h3>
                    <Input
                        placeholder='i.e: Headache, fever'
                        // onChange={(e) => setMainSymptoms(e.target.value)}
                        // value={mainSymptoms}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Description</h3>
                    <Input
                        placeholder='i.e: Patient has been experiencing...'
                        // onChange={(e) => setConditionDescription(e.target.value)}
                        // value={conditionDescription}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Diagnosis</h3>
                    <Input
                        placeholder='i.e: Flu'
                        // onChange={(e) => setDiagnosis(e.target.value)}
                        // value={diagnosis}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Labs asked</h3>
                    <Input
                        placeholder='i.e: Blood test'
                        // onChange={(e) => setLabsAsked(e.target.value)}
                        // value={labsAsked}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Treatment</h3>
                    <Input
                        placeholder='i.e: Ibuprofen 400mg'
                        // onChange={(e) => setTreatment(e.target.value)}
                        // value={treatment}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Notes</h3>
                    <Input
                        placeholder=''
                        // onChange={(e) => setNotes(e.target.value)}
                        // value={notes}
                        className={styles.input}
                    />
                </div>
            </div>
                <Button
                // onClick={handleSubmit}
                >
                    Submit
                </Button>
        </div>
    )
}