import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import App from "./App";
import MessagePage from "./pages/MessagePage";
import HomePage from "./pages/HomePage";
import WelcomeChatScreen from "./components/WelcomeChatScreen";
import ChatScreen from "./components/ChatScreen";

const routes=createBrowserRouter([

    {
        path:"/",
        element:<App/>
    },
    {
        path:"/home",
        element:<HomePage/>,
        children:[
            {
                path:'/home',
                element:<WelcomeChatScreen/>
            },
            {
                path:'/home/chat',
                element:<ChatScreen/>
            }
        ]
    },
    {
        path:"/sign-in",
        element:<SignInPage/>
    },
    {
        path:"/sign-up",
        element:<SignUpPage/>
    },{
        path:'/message',
        element:<MessagePage/>
    }
])

export default routes;
// This file defines the routes for the application using React Router.