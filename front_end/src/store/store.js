import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from "./reducers/userReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryGetModelReducer, categoryListReducer, categoryUpdateReducer } from "./reducers/categoryReducers";
import { projectCreateReducer, projectDeleteReducer, projectGetModelReducer, projectListReducer, projectUpdateReducer } from "./reducers/projectReducers";
import { newsCreateReducer, newsDeleteReducer, newsGetModelReducer, newsListReducer, newsUpdateReducer } from "./reducers/newsReducers";
import { partnerCreateReducer, partnerDeleteReducer, partnerGetModelReducer, partnerListReducer, partnerUpdateReducer } from "./reducers/partnerReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryGetModel: categoryGetModelReducer,
    categoryList: categoryListReducer,
    projectCreate: projectCreateReducer,
    projectDelete: projectDeleteReducer,
    projectUpdate: projectUpdateReducer,
    projectGetModel: projectGetModelReducer,
    projectList: projectListReducer,
    newsCreate: newsCreateReducer,
    newsDelete: newsDeleteReducer,
    newsUpdate: newsUpdateReducer,
    newsGetModel: newsGetModelReducer,
    newsList: newsListReducer,
    partnerCreate: partnerCreateReducer,
    partnerDelete: partnerDeleteReducer,
    partnerUpdate: partnerUpdateReducer,
    partnerGetModel: partnerGetModelReducer,
    partnerList: partnerListReducer,
})

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
