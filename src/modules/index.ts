import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userInfo from './UserInfo';


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    userInfo
});

export default persistReducer(persistConfig, rootReducer);