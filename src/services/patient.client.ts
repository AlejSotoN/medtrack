// src/data.ts
import { Patient } from './types';
import api from './api';

const API_URL = import.meta.env.VITE_API_URL;

export async function getPatients(): Promise<Patient[]> {
    const response = await api.get(`${API_URL}/dashboard`)
    const result: Patient[] = response.data;
    return result;
}

export async function getPatient(id: string): Promise<Patient | undefined> {
    const response = await api.get(`${API_URL}/dashboard/patient/${id}`)
    const result: Patient = response.data;
    return result;
}

export async function postPatient(newPatient: Partial<Patient>): Promise<Patient> {
    const response = await api.post(`${API_URL}/dashboard`, newPatient)
    const result: Patient = response.data;
    return result;
}

export async function deletePatient(id: string): Promise<void> {
    await api.delete(`${API_URL}/dashboard/${id}`);
}