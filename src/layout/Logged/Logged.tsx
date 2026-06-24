import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Logged.module.css'
import Sidebar from '../../components/ui/Sidebar/Sidebar'

export default function Logged() {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}
