import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Track Patient Records.
                    <br />
                    Simplify Clinical Follow-Ups.
                </h1>

                <p className={styles.subtitle}>
                    MedTrack is a secure medical dashboard designed to help clinics
                    manage patient data and visit history efficiently.
                </p>

                <button
                    className={styles.ctaButton}
                    onClick={() => navigate("/login")}
                >
                    Get Started
                </button>
            </div>

            <div className={styles.features}>
                <Feature
                    title="Patient Records"
                    description="Store and manage essential patient information securely."
                    icon="📋"
                />
                <Feature
                    title="Visit Tracking"
                    description="Keep a clear history of consultations and follow-ups."
                    icon="📅"
                />
                <Feature
                    title="Secure Access"
                    description="Role-based authentication with protected data."
                    icon="🔒"
                />
            </div>
        </section>
    );
}

type FeatureProps = {
    title: string;
    description: string;
    icon: string;
};

function Feature({ title, description, icon }: FeatureProps) {
    return (
        <div className={styles.featureCard}>
            <div className={styles.featureIcon}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
