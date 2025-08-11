import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {}

function configureAppStore(preloadedState){
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState
    });

    if(process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./rootReducer');
    }
    return store;
}

export default configureAppStore(initialState);
