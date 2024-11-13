import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Authenticate";

const store=configureStore({
    reducer:{
        authReducer,

    }
})

export default store;
