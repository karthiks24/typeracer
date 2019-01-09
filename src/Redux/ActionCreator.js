import axios from 'axios';

export const GET_TEXT = 'GET_TEXT';
export const REQUEST_TEXT = 'REQUEST_TEXT';
export const RECEIVE_TEXT = 'RECEIVE_TEXT';




export const getText = channel => ({
    type: GET_TEXT,
    channel,
});
export const requestText = () => ({
    type: REQUEST_TEXT,
});
export const receiveText = json => ({
    type: RECEIVE_TEXT,
    json: json,
});
export function fetchText() {

    return function (dispatch) {
        dispatch(requestText());
        return fetch(`http://www.randomtext.me/api/`)
            .then(
                response => response.json(),

                error => console.log('An error occurred.', error),
            )
            .then((json) => {
            console.log(json)
                    dispatch(receiveText(json.text_out));
                },
            );
    };
}