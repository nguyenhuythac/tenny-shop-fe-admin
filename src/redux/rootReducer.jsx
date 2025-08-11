import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";

const rootReducer = combineReducers({
    categoryReducer
    // Add other reducers here
});

export default rootReducer;
