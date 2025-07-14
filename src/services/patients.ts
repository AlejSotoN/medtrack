export default interface Patient {
    first_name: string;
    last_name: string;
    age: number | undefined;
    chief_complaint: string;
    condition: string;
}