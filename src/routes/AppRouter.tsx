import { createBrowserRouter } from "react-router-dom"
import Auth from "../features/Auth/Auth"
import Dashboard from "../features/Dashboard/Dashboard"
import Entries from "../features/Entries/Entries"
import Home from "../features/Home/Home"
import Root from "../layout/Root/Root"
import Logged from "../layout/Logged/Logged"
import PatientProfile from "features/PatientProfile/PatientProfile"
import axios from "axios"
import { API_URL } from "config/localhost_env"

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        Component: Root,
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
            },
            {
                path: "/entries",
                Component: Entries,
            }
        ]
    },

])