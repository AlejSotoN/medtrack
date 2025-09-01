// src/data.ts
import axios from 'axios';
import { Patient } from './types';
import { API_URL } from '../config/localhost_env';

export async function getPatients(): Promise<Patient[]> {
    const response = await axios.get(`${API_URL}/dashboard`)
    const result: Patient[] = response.data;
    return result;
}

export async function getPatient(id: string): Promise<Patient | undefined> {
    const response = await axios.get(`${API_URL}/dashboard/${id}`)
    const result: Patient = response.data;
    return result;
}

export async function postPatient(newPatient: Partial<Patient>): Promise<Patient> {
    const response = await axios.post(`${API_URL}/dashboard`, newPatient)
    const result: Patient = response.data;
    return result;
}