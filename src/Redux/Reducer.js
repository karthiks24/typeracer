import { GET_TEXT, REQUEST_TEXT, RECEIVE_TEXT } from './ActionCreator';
const reducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TEXT:
            return { ...state, loading: true };
        case REQUEST_TEXT:
            return { ...state, loading: true };
        case RECEIVE_TEXT:
            return { ...state, text: action.json, loading: false };
        default:
            return state;
    }
};
export default reducer;