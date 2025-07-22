export  interface Patient {
    patient_id: string;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    address: string;
    dateOfBirth: Date;
    phoneNum?: string;
    primaryDoctor?: string;
    registerDate: Date;
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
    date_created?: string;
    last_modified?: string;
}

export interface DashboardLoaderData {
    patients: Patient[];
}

export interface PatientDetailsLoaderData{
    patient: Patient;
}

export interface EditPatientLoaderData {
    patient: Patient;
  }
  
  export interface EditPatientActionData {
    success: boolean;
    message: string;
  }
  