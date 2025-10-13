import React from 'react'
import Navbar, { NavbarTab } from '../../components/ui/Navbar/Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './Root.module.css'

export default function Root() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentRoute = location.pathname;
    
    const handleNavigation = (route: string) => {
        navigate(route);
    }

    const homeNavbarTabs: NavbarTab[] = [
        { label: 'Login', route: '/auth', icon: '🏠' },      
    ];
    
    return (
    <>
        <Navbar
            tabs={homeNavbarTabs}
            onTabClick={handleNavigation}
            activeRoute={currentRoute}
        />
        <Outlet/>
    </> 
    )
}