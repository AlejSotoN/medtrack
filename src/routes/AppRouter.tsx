import { createBrowserRouter } from "react-router-dom"
import Dashboard, { loader as dashboardLoader } from "../features/Dashboard/Dashboard"
import { patientLoader, patientProfileLoader } from "../features/PatientProfile/loader"
import { getPatient, getPatients } from "../services/patient.client"
import { entriesLoader } from "../features/Entries/loader"
import { getEntries, getEntriesByPatientId } from "../services/entries.client"
import Logged from "../layout/Logged/Logged"
import PublicLayout from "../layout/PublicLayout/PublicLayout"
import AuthLayout from "../layout/AuthLayout/AuthLayout"
import ProtectedRoute from "./ProtectedRoute"
import NotFound from "../components/ui/NotFound/NotFound"
import Home from "../features/Home/Home"
import Auth from "../features/Auth/Auth"
import Register from "../features/Auth/Register"
import PatientProfile from "../features/PatientProfile/PatientProfile"
import Entries from "../features/Entries/Entries"
import EditEntry from "../features/Entries/EditEntry"
import editPatient from "../features/editPatient/editPatient"
import Doctors from "../features/Doctors/Doctors"
import Profile from "../features/Profile/Profile"

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        Component: PublicLayout,
        ErrorBoundary: NotFound,
        children: [
            {
                index: true,
                Component: Home,
            },
        ]
    },
    {
        path: "login",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Auth,
            },
        ]
    },
    {
        path: "register",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Register,
            },
        ]
    },
    {
        Component: ProtectedRoute,
        children: [
            {
                Component: Logged,
                ErrorBoundary: NotFound,
                children: [
                    {
                        path: "dashboard",
                        Component: Dashboard,
                        loader: dashboardLoader(getPatients)
                    },
                    {
                        path: "dashboard/patient/:patientId",
                        Component: PatientProfile,
                        loader: patientProfileLoader(getPatient, getEntriesByPatientId),
                    },
                    {
                        path: "dashboard/patient/edit/:patientId",
                        Component: editPatient,
                        loader: patientLoader(getPatient),
                    },
                    {
                        path: "dashboard/patient/:patientId/edit-entry/:entryId",
                        Component: EditEntry,
                        loader: entriesLoader(getEntries)
                    },
                    {
                        path: "entries",
                        Component: Entries,
                        loader: entriesLoader(getEntries)
                    },
                    {
                        path: "doctors",
                        Component: Doctors,
                    },
                    {
                        path: "profile",
                        Component: Profile,
                    },
                ]
            }
        ]
    },
])
