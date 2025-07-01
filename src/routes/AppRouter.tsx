import { createBrowserRouter } from "react-router-dom"
import Auth from "../features/Auth/Auth"
import App from "../App"
import Dashboard from "../features/Dashboard/Dashboard"
import Patients from "../features/Patients/Patients"
import Home from "../features/Home/Home"
import Root from "../layout/Root/Root"

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
                path: "/dashboard",
                Component: Dashboard,
            },
        ]
    },
    {
        path: "/auth",
        Component: Auth,
    },
    {
        path: "/patients",
        Component: Patients,
    }
])