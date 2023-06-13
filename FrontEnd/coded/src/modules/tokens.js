
const LOGIN = 'tokens/LOGIN';
const LOGOUT = 'tokens/LOGOUT';
const SETREFRESH = 'tokens/SETREFRESH';

export const login = (accessToken) => ({ type : LOGIN, payload:accessToken});
export const setRefresh = (refreshToken) => ({ type : SETREFRESH, payload: refreshToken})
export const logout = () => ({ type : LOGOUT});

const initialState = {
    access : "",
    refresh : ""
}

function tokenReducer(state = initialState, action){
    switch (action.type){
        case LOGIN  :
            state = {...state, access : action.payload};
            return state;
        case SETREFRESH :
            state = {...state, refresh : action.payload};
            console.log(state);
            return state;
        case LOGOUT :
            state = {access:"", refresh:""};
            return state;
        default:
            return state;
    }
}

export default tokenReducer;