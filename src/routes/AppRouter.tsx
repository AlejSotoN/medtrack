import { createBrowserRouter } from "react-router-dom"
import Auth from "../features/Auth/Auth"
import App from "../App"
import Dashboard from "../features/Dashboard/Dashboard"
import Patients from "../features/Patients/Patients"

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, element: <div>asfasd</div>},
            {path: "about", element: <div>About</div>}
        ]
    },
    {
        path: "/auth",
        Component: Auth,
    },
    {
        path: "/dashboard",
        Component: Dashboard,
    },
    {
        path: "/patients",
        Component: Patients,
    }
])