export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    chiefComplaint: string;
    condition: string;
  }
  
  export interface NewPatient extends Omit<Patient, 'id'> {}
  
  const patients: Patient[] = [];
  
  export function getPatients() {
    return patients;
  }
  
  export function postPatient(newPatient: NewPatient): Patient {
    const newId = patients.length + 1;
    const patient: Patient = { id: newId, ...newPatient };
    patients.push(patient);
    return patient;
  }
  