import axios from "axios";

const LOGIN = 'tokens/LOGIN';
const LOGOUT = 'tokens/LOGOUT';
const SETREFRESH = 'tokens/SETREFRESH';

export const login = (accessToken,userId,userNo) => ({ type : LOGIN, payload:accessToken, payload2:userId, payload3:userNo});
export const setRefresh = (refreshToken) => ({ type : SETREFRESH, payload: refreshToken})
export const logout = () => ({ type : LOGOUT});

const initialState = {
    access : "",
    refresh : "",
    userId : "",
    userNo : 0
}

function tokenReducer(state = initialState, action){
    switch (action.type){
        case LOGIN  :
            state = {...state, access : action.payload, userId : action.payload2, userNo: action.payload3};
            return state;
        case SETREFRESH :
            state = {...state, refresh : action.payload};
            return state;
        case LOGOUT :
            axios({
                method:"get",
                url:"/auth/logout",
                headers:{
                    Authorization:`Bearer ${state.access}`
                }
            })
            .catch((error)=>{
                console.log(error);
            })
            state = {access:"", refresh:"", userId:"", userNo:0};
            return state;
        default:
            return state;
    }
}

export default tokenReducer;