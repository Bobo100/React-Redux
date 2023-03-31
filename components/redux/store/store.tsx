import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducer } from "../reducer/reducer";

// const store = configureStore({
//     reducer: combineReducers({
//         reducer
//     }),
//     middleware: [thunk]
// });

const store = configureStore({
    reducer: {
        firstReducer: reducer
    },
    middleware: [thunk]
});


export default store;
