import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function ArrowIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function RecordsIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 12H15M9 16H12M7 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4H17M7 4C7 4.55228 7.44772 5 8 5H16C16.5523 5 17 4.55228 17 4M7 4C7 3.44772 7.44772 3 8 3H16C16.5523 3 17 3.44772 17 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6V12C4 16.4183 7.58172 20.4 12 22C16.4183 20.4 20 16.4183 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const PREVIEW_PATIENTS = [
    { initials: "MR", name: "Maria Rodriguez", tag: "Follow-up", color: "#3B82F6" },
    { initials: "JL", name: "James Lee", tag: "New", color: "#0EA5E9" },
    { initials: "AP", name: "Ana Perez", tag: "Review", color: "#8B5CF6" },
];

function DashboardPreview() {
    return (
        <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
                <div className={styles.windowDots}>
                    <span className={styles.dot} style={{ background: "#FF5F57" }} />
                    <span className={styles.dot} style={{ background: "#FFBD2E" }} />
                    <span className={styles.dot} style={{ background: "#28CA41" }} />
                </div>
                <span className={styles.previewTitle}>MedTrack Dashboard</span>
            </div>

            <div className={styles.previewStats}>
                <div className={styles.previewStatItem}>
                    <span className={styles.previewStatNum}>24</span>
                    <span className={styles.previewStatLabel}>Active Patients</span>
                </div>
                <div className={styles.previewStatItem}>
                    <span className={styles.previewStatNum}>8</span>
                    <span className={styles.previewStatLabel}>Visits Today</span>
                </div>
                <div className={styles.previewStatItem}>
                    <span className={styles.previewStatNum}>3</span>
                    <span className={styles.previewStatLabel}>Doctors</span>
                </div>
            </div>

            <div className={styles.previewSection}>
                <span className={styles.previewSectionLabel}>Recent Patients</span>
                {PREVIEW_PATIENTS.map((p) => (
                    <div key={p.name} className={styles.patientRow}>
                        <div
                            className={styles.avatar}
                            style={{ background: p.color + "22", color: p.color }}
                        >
                            {p.initials}
                        </div>
                        <span className={styles.patientName}>{p.name}</span>
                        <span
                            className={styles.patientTag}
                            style={{ color: p.color, background: p.color + "18" }}
                        >
                            {p.tag}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

type FeatureCardProps = { title: string; description: string; icon: React.ReactNode };

function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>{icon}</div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDesc}>{description}</p>
        </div>
    );
}

export default function Hero() {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <div className={styles.bgGrid} aria-hidden="true" />
            <div className={styles.bgGlow} aria-hidden="true" />

            <section className={styles.hero}>
                <div className={styles.heroLeft}>
                    <span className={styles.badge}>
                        <span className={styles.badgeDot} />
                        Clinic &amp; Practice Management
                    </span>

                    <h1 className={styles.title}>
                        Track Patient Records.
                        <br />
                        <span className={styles.titleAccent}>Simplify Clinical Follow-Ups.</span>
                    </h1>

                    <p className={styles.subtitle}>
                        MedTrack is a secure medical dashboard designed to help clinics
                        and independent doctors manage patient data and visit history efficiently.
                    </p>

                    <div className={styles.ctas}>
                        <button className={styles.ctaPrimary} onClick={() => navigate("/login")}>
                            Get Started <ArrowIcon />
                        </button>
                        <button className={styles.ctaSecondary} onClick={() => navigate("/register")}>
                            Create Account
                        </button>
                    </div>

                    <div className={styles.roles}>
                        <span className={styles.rolePill}>Clinic Admins</span>
                        <span className={styles.rolePill}>Doctors</span>
                        <span className={styles.rolePill}>Solo Practitioners</span>
                    </div>
                </div>

                <div className={styles.heroRight}>
                    <DashboardPreview />
                </div>
            </section>

            <section className={styles.features}>
                <p className={styles.sectionLabel}>Features</p>
                <h2 className={styles.sectionTitle}>Everything you need to manage patient care</h2>
                <div className={styles.featureGrid}>
                    <FeatureCard
                        title="Patient Records"
                        description="Store and manage essential patient information securely in one place."
                        icon={<RecordsIcon />}
                    />
                    <FeatureCard
                        title="Visit Tracking"
                        description="Keep a clear history of consultations, diagnoses, and follow-ups."
                        icon={<CalendarIcon />}
                    />
                    <FeatureCard
                        title="Secure Access"
                        description="Role-based authentication for clinics, doctors, and solo practitioners."
                        icon={<ShieldIcon />}
                    />
                </div>
            </section>
        </div>
    );
}
