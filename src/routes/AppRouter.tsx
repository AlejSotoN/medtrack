import { createBrowserRouter } from "react-router-dom"
import Dashboard, { loader as dashboardLoader } from "../features/Dashboard/Dashboard"
import PatientProfile from "../features/PatientProfile/PatientProfile"
import { patientLoader, patientProfileLoader } from "../features/PatientProfile/loader"
import Entries from "../features/Entries/Entries"
import Home from "../features/Home/Home"
import Auth from "../features/Auth/Auth"
import Root from "../layout/Root/Root"
import Logged from "../layout/Logged/Logged"
import { getPatient, getPatients } from "../services/patient.client"
import NotFound from "../components/ui/NotFound/NotFound"
import { entriesLoader } from "../features/Entries/loader"
import { getEntries, getEntriesByPatientId } from "../services/entries.client"
import EditEntry from "../features/Entries/EditEntry"
import editPatient from "../features/editPatient/editPatient"

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
        ]
    },
    {
        path: "login",
        Component: Auth,
    },
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
                path: "/dashboard/patient/:patientId/edit-entry/:entryId",
                Component: EditEntry,
                loader: entriesLoader(getEntries)
            },
            {
                path: "/entries",
                Component: Entries,
                loader: entriesLoader(getEntries)
            },
        ]
    },

])