import React from 'react'
import Navbar, { NavbarTab } from '../../components/ui/Navbar/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Logged() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentRoute = location.pathname;
    
    const handleNavigation = (route: string) => {
        navigate(route);
    }

    const loggedNavbarTabs: NavbarTab[] = [
        { label: 'Profile', route: '/profile', icon: '🔧' },
        { label: 'Dashboard', route: '/dashboard', icon: '🏠' },
        { label: 'Patients', route: '/patients', icon: '📦' },
        { label: 'Entries', route: '/entries', icon: '🔧' },
        { label: 'Logout', route: '/', icon: '🔧' },
      
    ];
    
    return (
    <>
        <Navbar
            tabs={loggedNavbarTabs}
            onTabClick={handleNavigation}
            activeRoute={currentRoute}
        />
        <Outlet/>
    </> 
    )
}