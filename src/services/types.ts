export interface Patient {
    patient_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    address: string;
    date_of_birth: string;
    phone_num?: string;
    primaryDoctor?: string;
    register_date?: string;
}

export interface Entry {
    entry_id: number;
    patient_id: string;
    entry_date: string;
    main_symptoms: string;
    condition_description: string;
    labs_asked?: string;
    diagnosis: string;
    treatment: string;
    notes?: string;
    date_created?: string;
    last_modified?: string;
}

export interface DashboardLoaderData {
    patients: Patient[];
}

export interface PatientProfileLoaderData{
    patient: Patient | undefined;
    entries: Entry[];
}

export interface PatientLoaderData{
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
  