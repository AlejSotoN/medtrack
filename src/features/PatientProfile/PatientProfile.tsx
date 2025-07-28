import React from 'react'
import Patient from 'services/types';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import PatientProfileLoaderData from '../../services/types'

export const loader = (getPatient: ()=> Promise<Patient>): LoaderFunction => async () => {
  const patient = await getPatient();
  console.log(patient)
  return { patient } as PatientProfileLoaderData;
}

export default function PatientProfile() {
// Pendiente resolver esto
  // const { patient } = useLoaderData as PatientProfileLoaderData

  
  return (
    <div>
      hola
    </div>
  )
}

