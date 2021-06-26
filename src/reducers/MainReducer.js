import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import {
    GET_PHOTOS
} from "../actions/MainAction"

const INITIAL_STATE = {
    cameraRoll: []
}
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userData','isAuthLogin'],
    blacklist: ['authButtonSpinner', 'authSpinnerStatus']
};
const MainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                cameraRoll: action.payload
            }
        default:
            return state;
    }
}
export default persistReducer(persistConfig, MainReducer);