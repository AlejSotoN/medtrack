export default interface Patient {
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

export default interface Entry {
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

export default interface DashboardLoaderData {
    patients: Patient[];
}

export default interface PatientProfileLoaderData{
    patient: Patient;
}

export default interface EditPatientLoaderData {
    patient: Patient;
  }
  
  export default interface EditPatientActionData {
    success: boolean;
    message: string;
  }
  