//이름이 index이면 여기 디렉토리만 입력해도 이 녀석이 지정됨.
import { combineReducers } from "redux";
import member from './members'
import navbarSetting from './navbarSetting'
import dmSetting from './DMSetting'

const rootReducer = combineReducers({
    member,
    navbarSetting,
    dmSetting
});

export default rootReducer;