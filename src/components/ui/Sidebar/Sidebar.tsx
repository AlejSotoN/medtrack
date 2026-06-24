import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logo from '../../../assets/medtrack_logo.png';
import { useAuth } from '../../../contexts/AuthContext';
import { logout } from '../../../services/auth.client';

function DashboardIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function EntriesIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 12H15M9 16H12M7 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4H17M7 4C7 4.55228 7.44772 5 8 5H16C16.5523 5 17 4.55228 17 4M7 4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function DoctorsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20C4 17.2386 7.58172 15 12 15C13.5 15 14.9 15.3 16.1 15.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 17.5V19M18 19V20.5M18 19H16.5M18 19H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function ProfileIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

const ROLE_LABELS: Record<string, string> = {
    clinic: 'Clinic',
    doctor: 'Doctor',
    solo: 'Solo',
};

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    // Close drawer on route change
    React.useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navItems = [
        { label: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Entries', route: '/entries', icon: <EntriesIcon /> },
        ...(user?.role === 'clinic' ? [{ label: 'Doctors', route: '/doctors', icon: <DoctorsIcon /> }] : []),
    ];

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/login', { replace: true });
    };

    const isActive = (route: string) =>
        location.pathname === route || location.pathname.startsWith(route + '/');

    const initials = user?.role ? ROLE_LABELS[user.role]?.[0] ?? '?' : '?';

    return (
        <>
            {/* Mobile backdrop */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Hamburger toggle */}
            <button
                className={styles.hamburger}
                onClick={() => setIsOpen((o) => !o)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.logoWrap}>
                    <img src={logo} alt="MedTrack" className={styles.logo} />
                </div>

                <nav className={styles.nav}>
                    {navItems.map(({ label, route, icon }) => (
                        <button
                            key={route}
                            className={`${styles.navItem} ${isActive(route) ? styles.active : ''}`}
                            onClick={() => navigate(route)}
                        >
                            <span className={styles.navIcon}>{icon}</span>
                            <span className={styles.navLabel}>{label}</span>
                        </button>
                    ))}
                </nav>

                <div className={styles.bottom}>
                    <div className={styles.divider} />

                    <button
                        className={`${styles.navItem} ${isActive('/profile') ? styles.active : ''}`}
                        onClick={() => navigate('/profile')}
                    >
                        <span className={styles.navIcon}><ProfileIcon /></span>
                        <span className={styles.navLabel}>Profile</span>
                    </button>

                    <button className={`${styles.navItem} ${styles.logoutBtn}`} onClick={handleLogout}>
                        <span className={styles.navIcon}><LogoutIcon /></span>
                        <span className={styles.navLabel}>Logout</span>
                    </button>

                    <div className={styles.userChip}>
                        <div className={styles.userAvatar}>{initials}</div>
                        <div className={styles.userInfo}>
                            <span className={styles.userRole}>{user?.role ? ROLE_LABELS[user.role] : ''}</span>
                            <span className={styles.userId}>ID: {user?.id?.slice(0, 8) ?? '—'}</span>
                        </div>
                        {user?.role && (
                            <span className={styles.roleBadge}>{ROLE_LABELS[user.role]}</span>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
