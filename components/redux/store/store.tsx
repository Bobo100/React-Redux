import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer } from "../reducer/reducer";

const store = configureStore({
    reducer: combineReducers({
        reducer
    }),
    middleware: [thunk]
});

export default store;
