import React from 'react'
import Navbar, { NavbarTab } from '../Navbar/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Home from '../../features/Home/Home';

export default function Root() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentRoute = location.pathname;
    
    const handleNavigation = (route: string) => {
        navigate(route);
    }

    const myNavbarTabs: NavbarTab[] = [
        { label: 'Profile', route: '/profile', icon: '🔧' },
        { label: 'Dashboard', route: '/dashboard', icon: '🏠' },
        { label: 'Patients', route: '/patients', icon: '📦' },
        { label: 'Entries', route: '/entries', icon: '🔧' },
        { label: 'Logout', route: '/', icon: '🔧' },
      
    ];
    


    return (
    <>
        <Navbar
            tabs={myNavbarTabs}
            onTabClick={handleNavigation}
            activeRoute={currentRoute}
        />
        <Outlet/>
    </> 
    )
}