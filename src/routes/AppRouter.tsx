import { createBrowserRouter } from "react-router-dom"
import Auth from "../features/Auth/Auth"
import Dashboard from "../features/Dashboard/Dashboard"
import Patients from "../features/Patients/Patients"
import Home from "../features/Home/Home"
import Root from "../layout/Root/Root"
import Logged from "../layout/Logged/Logged"

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
                path: "/about",
                // Component: About,
            },
        ]
    },
    {
        path: "/auth",
        Component: Auth,
    },
    {
        Component: Logged,
        children: [
            {
                path: "/dashboard",
                Component: Dashboard,
            },
            {
                path: "/patients",
                Component: Patients,
            }
        ]
    },

])