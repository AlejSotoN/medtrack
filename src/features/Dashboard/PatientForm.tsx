import React from "react"
import styles from './PatientForm.module.css'
import { postPatient } from "../../services/patient.client"
import { getDoctors } from "../../services/doctor.client"
import { useRevalidator } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Doctor, Patient } from "../../services/types"
import api from "../../services/api"

export default function PatientForm({
    mode = 'create',
    patient,
    onCancel,
    onSuccess,
}: {
    mode?: 'create' | 'edit';
    patient?: Patient;
    onCancel: () => void;
    onSuccess?: () => void;
}) {
    const { user } = useAuth();
    const isEdit = mode === 'edit';

    const [firstName, setFirstName] = React.useState(patient?.first_name ?? "");
    const [lastName, setLastName] = React.useState(patient?.last_name ?? "");
    const [dateOfBirth, setDateOfBirth] = React.useState(patient?.date_of_birth?.split('T')[0] ?? "");
    const [gender, setGender] = React.useState(patient?.gender ?? "");
    const [address, setAddress] = React.useState(patient?.address ?? "");
    const [phone, setPhone] = React.useState(patient?.phone_num ?? "");
    const [doctorId, setDoctorId] = React.useState("");
    const [doctors, setDoctors] = React.useState<Doctor[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const revalidator = useRevalidator();

    React.useEffect(() => {
        if (!isEdit && user?.role === "clinic") {
            getDoctors().then(setDoctors).catch(() => setError("Failed to load doctors"));
        }
    }, [isEdit, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dateOfBirth) { setError("Date of birth is required."); return; }
        if (!isEdit && user?.role === "clinic" && !doctorId) {
            setError("Please select an assigned doctor.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            if (!isEdit) {
                await postPatient({
                    firstName,
                    lastName,
                    dateOfBirth,
                    gender,
                    ...(user?.role === "clinic" && { doctorId }),
                });
                revalidator.revalidate();
            } else {
                await api.patch(`/dashboard/${patient?.patient_id}`, {
                    dateOfBirth,
                    gender,
                    address,
                    phoneNum: phone,
                });
            }
            onSuccess?.();
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                (isEdit ? "Error updating patient. Please try again." : "An error occurred while adding the patient.")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {!isEdit && <h3 className={styles.formTitle}>New Patient</h3>}
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label}>First Name</label>
                    {isEdit ? (
                        <p className={styles.readOnly}>{firstName || '—'}</p>
                    ) : (
                        <input
                            className={styles.input}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            required
                        />
                    )}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Last Name</label>
                    {isEdit ? (
                        <p className={styles.readOnly}>{lastName || '—'}</p>
                    ) : (
                        <input
                            className={styles.input}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            required
                        />
                    )}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Date of Birth</label>
                    <input
                        className={styles.input}
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Gender</label>
                    <select
                        className={styles.input}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select…</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <input
                        className={styles.input}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label className={styles.label}>Address</label>
                    <input
                        className={styles.input}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street, City, Country"
                    />
                </div>
                {!isEdit && user?.role === "clinic" && (
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label className={styles.label}>Assigned Doctor</label>
                        <select
                            className={styles.input}
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            required
                        >
                            <option value="">Select a doctor…</option>
                            {doctors.map((doc) => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.first_name} {doc.last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.actions}>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading
                        ? (isEdit ? "Saving…" : "Adding…")
                        : (isEdit ? "Save Changes" : "Add Patient")}
                </button>
            </div>
        </form>
    );
}
