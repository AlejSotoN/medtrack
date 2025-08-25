import React from 'react'
import styles from "./PatientCard.module.css"
import { Patient } from 'services/types'

export default function PatientCard({ patient }: {patient: Patient | undefined}) {
  return (
    <section className={styles.patientCard}>
           <div className={styles.leftSide}>
          <img className={styles.profilePicture} alt='Profile Picture'></img>
        </div>
        <div className={styles.rightSide}>
          <h1>{`${patient?.first_name} ${patient?.last_name}`}</h1>
          <p>{`Date of Birth: ${patient?.dateOfBirth} (Age: ${patient?.age})`}</p>
          <p>{`Gender: ${patient?.gender}`}</p>
          <p>{`Address: ${patient?.address}`}</p>
          <p>{`Phone: ${patient?.phoneNum}`}</p>
          <p>{`Registered: ${patient?.registerDate}`}</p>
          <p>{`Primary Doctor: ${patient?.primaryDoctor}`}</p>
        </div>
    </section>
  )
}