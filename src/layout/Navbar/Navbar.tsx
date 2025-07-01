import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export interface NavbarTab {
  label: string,
  route: string,
  icon?: string;
}

export interface NavbarProps {
  tabs: NavbarTab[];
  onTabClick: (route: string) => void;
  activeRoute: string;
  className?: string;
  tabStyle?: string;
  activeTabStyle?: string;
}

export default function Navbar({
  tabs,
  onTabClick, 
  activeRoute,
  className,
  tabStyle,
  activeTabStyle
}:NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav
      className={styles.navbarNav}>
      {tabs.map(({label, route, icon}, index) =>(
        <button
          key={index || route}
          onClick={()=> {onTabClick(route);}}
          className={className}
     >
          {label}
        </button>
      ))}
    </nav>
  )
}

