import { Patient } from './types';
import api from './api';

export async function getPatients(): Promise<Patient[]> {
    const response = await api.get('/dashboard');
    return response.data as Patient[];
}

export async function getPatient(id: string): Promise<Patient | undefined> {
    const response = await api.get(`/dashboard/patient/${id}`);
    return response.data as Patient;
}

type NewPatientPayload = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: string;
    doctorId?: string;
};

export async function postPatient(newPatient: NewPatientPayload): Promise<Patient> {
    const response = await api.post('/dashboard', newPatient);
    return response.data as Patient;
}

export async function deletePatient(id: string): Promise<void> {
    await api.delete(`/dashboard/${id}`);
}

export async function patchPatientMeta(
    patient: Patient,
    meta: { lastVisit?: string; nextFollowup?: string }
): Promise<void> {
    await api.patch(`/dashboard/${patient.patient_id}`, {
        dateOfBirth: patient.date_of_birth,
        gender: patient.gender,
        address: patient.address,
        phoneNum: patient.phone_num,
        lastVisit: meta.lastVisit,
        nextFollowup: meta.nextFollowup,
    });
}

export async function uploadPatientAvatar(patientId: string, dataUrl: string): Promise<Patient> {
    const response = await api.patch(`/dashboard/${patientId}/avatar`, { profilePicture: dataUrl });
    return response.data as Patient;
}
