import React from 'react'
import Navbar, { NavbarTab } from '../../components/ui/Navbar/Navbar'
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import styles from './Logged.module.css'

export default function Logged() {
    const location = useLocation();
    const navigate = useNavigate();
    const navigation = useNavigation()

    const currentRoute = location.pathname;
    
    const handleNavigation = (route: string) => {
        navigate(route);
    }

    const loggedNavbarTabs: NavbarTab[] = [
        { label: 'Profile', route: '/profile', icon: '🔧' },
        { label: 'Dashboard', route: '/dashboard', icon: '🏠' },
        { label: 'Entries', route: '/entries', icon: '🔧' },
        { label: 'Logout', route: '/', icon: '🔧' },
      
    ];
    
    return (
    <div className={styles.div}>
        <Navbar
            tabs={loggedNavbarTabs}
            onTabClick={handleNavigation}
            activeRoute={currentRoute}
        />
        {navigation.state === 'loading' ? (
            <div> Loading...</div>
        ): null}
        <Outlet/>
    </div> 
    )
}