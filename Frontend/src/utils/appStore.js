import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";

const appStore = configureStore 
(
    {
        reducer : // This is the whole big app reducer which is a combination of all the small reducers
        {
            cart : cartReducer
        }
    }
);

export default appStore;