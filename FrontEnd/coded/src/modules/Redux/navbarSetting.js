
const SETNONMEMBER = 'navbarSetting/SETNONMEMBER';
const SETMEMBER = 'navbarSetting/SETMEMBER';
const SETWEEKLY = 'navbarSetting/SETWEEKLY';

export const setNonMember = ()=>({type:SETNONMEMBER});
export const setMember = ()=>({type:SETMEMBER});
export const setWeekly = ()=>({type:SETWEEKLY});

const initialState = {
    type:'NonMem'
}

function navbarSettingReducer(state = initialState, action){
    switch(action.type){
        case SETNONMEMBER:
            state = {...state, type:'NonMem'}
            return state;
        case SETMEMBER:
            state = {...state, type:'Mem'};
            return state;
        case SETWEEKLY:
            state = {...state, type:'Weekly'}
            return state;
        default:
            return state;
    }
}

export default navbarSettingReducer;