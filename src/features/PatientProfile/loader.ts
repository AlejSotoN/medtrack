import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { Patient, Entry, PatientProfileLoaderData } from '../../services/types'

export const patientProfileLoader = (getPatient: (id: string) => Promise<Patient | undefined>, getEntries: (id: string) => Promise<Entry[]>): LoaderFunction => async ({ params }: LoaderFunctionArgs): Promise<PatientProfileLoaderData> => {
    const { patientId } = params;
  
    if (!patientId) {
      throw new Response("Patient ID missing", {status: 400});
    }
  
    const patient = await getPatient(patientId);
    const entries = await getEntries(patientId);
  
    return { patient, entries };
  }