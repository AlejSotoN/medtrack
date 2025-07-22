// src/data.ts
import axios from 'axios';
import { Patient } from './types';
import { API_URL } from '../config/localhost_env';

export async function getPatients(): Promise<Patient[]> {
    const response = await axios.get(`${API_URL}/dashboard`)
    const result = response.data
    return result;
}

export async function fakeGetPatient(id: string): Promise<Patient | undefined> {
    const response = await axios.get(`${API_URL}/dashboard`)
    const result = response.data
    return result.find(p => p.patient_id === id)
}
