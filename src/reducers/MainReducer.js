import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import {
    GET_PHOTOS,
    SELECT_PHOTOS
} from "../actions/MainAction"

const INITIAL_STATE = {
    cameraRoll: [],
    selectedPhotos: [],

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
            action.payload.map((item) => {
                item.id = Math.random()
                item.selectedItem = false
            })
            console.log("idli hali", action.payload);
            return {
                ...state,
                cameraRoll: action.payload
            }
        case SELECT_PHOTOS:
            console.log("action ",action.payload);
            state.cameraRoll.map((item) => {
                if(item.id == action.payload.id && item.selectedItem === false){
                    item.selectedItem = true
                    state.selectedPhotos = state.selectedPhotos.concat(action.payload)
                }
                else if(item.id == action.payload.id && item.selectedItem === true){
                    item.selectedItem = false
                    let index = action.payload.id
                    state.selectedPhotos.splice(item, 1)
                }
            })
            console.log("?????", state.selectedPhotos);
            return {
                ...state,
                cameraRoll: [...state.cameraRoll],
                // selectedPhotos: action.payload
            }
        default:
            return state;
    }
}
export default persistReducer(persistConfig, MainReducer);