const DMNONE = 'DMSetting/DMNONE';
const DMSETUSER = 'DMSetting/DMSETUSER';


export const setDMNONE = () => ({type: DMNONE});
export const setDMSETUSER = (userNo, isUserAlert) => ({type : DMSETUSER, payload: userNo, payload2: isUserAlert});


const initialState = {
    userNo : 0,
    isUserAlert : false
};


function DMSettingReducer(state = initialState, action){
    switch(action.type){
        case DMNONE  : 
        state = {...state, userNo : 0};
        return state;
        case DMSETUSER : 
        state = {...state, userNo : action.payload , isUserAlert : action.payload2};
        return state;
        
        default : 
        return state;
    };
};

export default DMSettingReducer;