import React from 'react'
import Navbar, { NavbarTab } from '../../components/ui/Navbar/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './Logged.module.css'
import { logout } from '../../services/auth.client';

export default function Logged() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentRoute = location.pathname;

    const handleNavigation = (route: string) => {
        if (route === '/logout') {
            logout();
            navigate('/login', { replace: true });
            return;
        }

        navigate(route);
    }

    const loggedNavbarTabs: NavbarTab[] = [
        { label: 'Dashboard', route: '/dashboard', icon: '🏠' },
        { label: 'Entries', route: '/entries', icon: '🔧' },
        { label: 'Logout', route: '/logout', icon: '🔧' },

    ];

    return (
        <div className={styles.div}>
            <Navbar
                tabs={loggedNavbarTabs}
                onTabClick={handleNavigation}
                activeRoute={currentRoute}
            />
            <Outlet />
        </div>
    )
}