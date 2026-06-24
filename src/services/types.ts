export type UserRole = "clinic" | "doctor" | "solo";

export interface AuthUser {
    id: string;
    role: UserRole;
    clinicId?: string | null;
    doctorId?: string | null;
}

export interface Doctor {
    id: string;
    clinic_id: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    specialty?: string;
}

export interface Patient {
    patient_id: string;
    doctor_id?: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    address: string;
    date_of_birth: string;
    phone_num?: string;
    register_date?: string;
    last_visit?: string;
    next_followup?: string;
    profile_picture?: string;
}

export interface Entry {
    entry_id: string;
    patient_id: string;
    entry_date: string;
    main_symptoms: string;
    condition_description: string;
    labs_asked?: string;
    diagnosis: string;
    treatment: string;
    notes?: string;
    next_followup?: string;
    date_created?: string;
    last_modified?: string;
}

export type EntryUpdatePayload = {
    entry_id: string;
    patient_id: string;
    main_symptoms: string;
    condition_description: string;
    labs_asked: string;
    diagnosis: string;
    treatment: string;
    notes: string;
};

export interface DashboardLoaderData {
    patients: Patient[];
}

export interface PatientProfileLoaderData {
    patient: Patient | undefined;
    entries: Entry[];
}

export interface PatientLoaderData {
    patient: Patient | undefined;
}

export interface EntriesLoaderData {
    entries: Entry[];
}

export interface EditPatientLoaderData {
    patient: Patient | undefined;
}

export interface EditPatientActionData {
    success: boolean;
    message: string;
}
