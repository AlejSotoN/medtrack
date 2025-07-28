import React from 'react'
import Patient from 'services/types';
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import PatientProfileLoaderData from '../../services/types'

export const loader = (getPatient: (id:string)=> Promise<Patient[] | undefined>): LoaderFunction => async ({params}: LoaderFunctionArgs): Promise<PatientProfileLoaderData> => {
  const patientId = params.patientId;

  const patient = await getPatient(patientId);

  if (typeof patientId === 'undefined') {
    console.error("Patient ID is missing from route parameters. Cannot fetch patient.");
    // **Option A: Return an undefined patient (graceful fallback)**
    return { patient: undefined };
    // **Option B: Throw a Response for React Router to catch (recommended for robust error handling)**
    // throw new Response("Bad Request", {
    //     status: 400,
    //     statusText: "Patient ID missing from URL"
    // });
}
  console.log("Patient loaded in loader", patient)
  return { patient } as PatientProfileLoaderData;
}

export default function PatientProfile() {
// Pendiente resolver esto
  const { patient } = useLoaderData() as PatientProfileLoaderData;

  
  return (
    <div>
      <h1>{patient?.first_name}</h1>
      <h2>{patient?.age}</h2>
    </div>
  )
}

