import React, {lazy, Suspense, useState,  useEffect} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import AboutUs from "./components/AboutUs.js";
import ContactUs from "./components/ContactUs.js";
import Error from "./components/Error.js";
import RestaurantsMenu from "./components/RestaurantsMenu.js";
import { createBrowserRouter, RouterProvider , Outlet} from "react-router-dom";
import userContext from "./utils/userContext.js";
import {Provider} from "react-redux";
import appStore from "./utils/appStore.js";
import Cart from "./components/Cart.js";
import OrderConfirmed from "./components/OrderConfirmed.js";



// Chunking
// Code Splitting
// Dynamic Bundling
// Lazy loading 
// On demand loading
// Dynamic import

const Grocery = lazy (() =>import ("./components/Grocery.js"));

const  AppLayout = () =>
{

    const [userName , setUserName] = useState ();


    // Authentication code
    useEffect (() =>
    {
        // Make an API call and send the username and password
        const data = 
        {
            userName : "Govind",
            email : "gy65905@gmail.com"
        };
        setUserName (data.userName);
    }, []);

    return (
        <Provider store = {appStore}>
        <userContext.Provider value = {{loggedInUser : userName , setUserName}}>
            <div className="app-layout">
                <Header />
                {/* if path = "/"  then load Body in the Outlet */}
                {/* if path = "/AboutUs" then load AboutUs in the Outlet */}
                {/* if path = "/ContactUs" then load ContactUs in the Outlet  and so on */}
                <Outlet />
            </div>
        </userContext.Provider>
        </Provider>
    );
}


const appRouter = createBrowserRouter
(   
    [
        {
            path : "/",
            element : <AppLayout />,
            children :
                [
                    {
                        path : "/",
                        element : <Body />
                    },
                    {
                        path : "/AboutUs",
                        element : <AboutUs />
                    },
                    {
                        path : "/ContactUs",
                        element : <ContactUs />
                    },
                    {
                        path : "/restaurant/:restId",
                        element : <RestaurantsMenu/>
                    },
                    {
                        path: "/Grocery",
                        element: <Suspense fallback = {<h1> Loading ........</h1>}><Grocery /></Suspense>
                    },
                    {
                        path : "/Cart",
                        element : <Cart />
                    },
                    {
                        path: "/order-confirmed",
                        element: <OrderConfirmed /> 
                    }
                ],
            errorElement : <Error />
        }
        
    ]
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

