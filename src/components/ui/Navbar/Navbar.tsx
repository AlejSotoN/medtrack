import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../../assets/medtrack_logo.png'

export interface NavbarTab {
  label: string;
  route: string;
  icon?: string;
}

export interface NavbarProps {
  tabs: NavbarTab[];
  onTabClick: (route: string) => void;
  activeRoute: string;
  className?: string;
}

export default function Navbar({ tabs, onTabClick, activeRoute }: NavbarProps) {
  return (
    <div className={styles.navbarWrap}>
      <nav className={styles.navbarNav}>
        <img src={logo} alt="MedTrack" className={styles.logo} />
        <div className={styles.tabs}>
          {tabs.map(({ label, route }, index) => (
            <button
              key={index}
              onClick={() => onTabClick(route)}
              className={`${styles.navbarButton} ${activeRoute === route ? styles.active : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
