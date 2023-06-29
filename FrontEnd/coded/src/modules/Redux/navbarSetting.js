
const SETNONMEMBER = 'navbarSetting/SETNONMEMBER';
const SETMEMBER = 'navbarSetting/SETMEMBER';
const SETWEEKLY = 'navbarSetting/SETWEEKLY';

const INDEXHOT = 'navbarSetting/INDEXHOT';
const INDEXNEW = 'navbarSetting/INDEXNEW';
const INDEXFOLLOWING = 'navbarSetting/INDEXFOLLOWING';
const INDEXMYPICK = 'navbarSetting/INDEXMYPICK';
const INDEXSCRAP = 'navbarSetting/INDEXSCRAP';

const INDEXOOTD = 'navbarSetting/INDEXOOTD';
const INDEXWEEKLY = 'navbarSetting/INDEXWEEKLY';

export const setNonMember = ()=>({type:SETNONMEMBER});
export const setMember = ()=>({type:SETMEMBER});
export const setWeekly = ()=>({type:SETWEEKLY});

export const setIndexHot = ()=>({type:INDEXHOT});
export const setIndexNew = ()=>({type:INDEXNEW});
export const setIndexFollowing = ()=>({type:INDEXFOLLOWING});
export const setIndexMyPick = ()=>({type:INDEXMYPICK});
export const setIndexScrap = ()=>({type:INDEXSCRAP});

export const setIndexOOTD = ()=>({type:INDEXOOTD});
export const setIndexWeekly = ()=>({type:INDEXWEEKLY});

const initialState = {
    type:'NonMem',
    navbarIndex : 1,
    navbarIndex2 : 1,
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
        case INDEXHOT:
            state = {...state, navbarIndex:1}
            return state;
        case INDEXNEW:
            state = {...state, navbarIndex:2}
            return state;
        case INDEXFOLLOWING:
            state = {...state, navbarIndex:3}
            return state;
        case INDEXMYPICK:
            state = {...state, navbarIndex:4}
            return state;
        case INDEXSCRAP:
            state = {...state, navbarIndex:5}
            return state;
        case INDEXOOTD:
            state = {...state, navbarIndex2:1}
            return state;
        case INDEXWEEKLY:
            state = {...state, navbarIndex2:2}
            return state;
        default:
            return state;
    }
}

export default navbarSettingReducer;