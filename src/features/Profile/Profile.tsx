import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/auth.client';
import styles from './Profile.module.css';

const ROLE_LABELS: Record<string, string> = {
    clinic: 'Clinic',
    doctor: 'Doctor',
    solo: 'Solo Practitioner',
};

export default function Profile() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/login', { replace: true });
    };

    const roleName = user?.role ? ROLE_LABELS[user.role] ?? user.role : '—';
    const avatarLetter = roleName[0]?.toUpperCase() ?? '?';

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Profile</h1>
                <p className={styles.subtitle}>Your account information</p>
            </div>

            <div className={styles.card}>
                <div className={styles.avatarWrap}>
                    <div className={styles.avatar}>{avatarLetter}</div>
                </div>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>User ID</span>
                        <span className={styles.fieldValue}>{user?.id ?? '—'}</span>
                    </div>
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Role</span>
                        <span className={styles.fieldValue}>
                            <span className={styles.roleBadge}>{roleName}</span>
                        </span>
                    </div>
                    {user?.clinicId && (
                        <div className={styles.field}>
                            <span className={styles.fieldLabel}>Clinic ID</span>
                            <span className={styles.fieldValue}>{user.clinicId}</span>
                        </div>
                    )}
                    {user?.doctorId && (
                        <div className={styles.field}>
                            <span className={styles.fieldLabel}>Doctor ID</span>
                            <span className={styles.fieldValue}>{user.doctorId}</span>
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
