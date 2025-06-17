import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import App from "./App";

const routes=createBrowserRouter([

    {
        path:"/",
        element:<App/>
    },
    {
        path:"/sign-in",
        element:<SignInPage/>
    },
    {
        path:"/sign-up",
        element:<SignUpPage/>
    }
])

export default routes;
// This file defines the routes for the application using React Router.