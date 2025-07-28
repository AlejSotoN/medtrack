import { createBrowserRouter } from "react-router-dom"
import Auth from "../features/Auth/Auth"
import Dashboard, { loader as dashboardLoader } from "../features/Dashboard/Dashboard"
import PatientProfile, {loader as patientProfileLoader } from "../features/PatientProfile/PatientProfile"
import Entries from "../features/Entries/Entries"
import Home from "../features/Home/Home"
import Root from "../layout/Root/Root"
import Logged from "../layout/Logged/Logged"
import { getPatient, getPatients } from "../services/patient.server"
import NotFound from "../components/ui/NotFound/NotFound"

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        ErrorBoundary: NotFound,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "about",
                // Component: About,
            },
        ]
    },
    {
        path: "auth",
        Component: Auth,
    },
    {
        Component: Logged,
        children: [
            {
                path: "dashboard",
                Component: Dashboard,
                loader: dashboardLoader(getPatients)
            },
            {
                path: "dashboard/patient/:patientId",
                Component: PatientProfile,
                loader: patientProfileLoader(getPatient)
            },
            {
                path: "/entries",
                Component: Entries,
            }
        ]
    },

])