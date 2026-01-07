import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

export default function ProtectedRoute() {
    const token = localStorage.getItem("medtrack_token");

    if (!token || isTokenExpired()) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}