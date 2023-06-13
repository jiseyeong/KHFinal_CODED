//이름이 index이면 여기 디렉토리만 입력해도 이 녀석이 지정됨.
import { combineReducers } from "redux";
import token from './tokens'

const rootReducer = combineReducers({
    token
});

export default rootReducer;