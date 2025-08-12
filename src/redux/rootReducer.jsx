import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import commonReducer from "./reducers/commonReducer";

const rootReducer = combineReducers({
    categoryReducer,
    commonReducer,
    // Add other reducers here
});

export default rootReducer;
