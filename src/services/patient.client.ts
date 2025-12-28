// src/data.ts
import { Patient } from './types';
import { API_URL } from '../config/localhost_env';
import api from './api';

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