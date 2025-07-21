export default interface Patient {
    patient_id: number;
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


