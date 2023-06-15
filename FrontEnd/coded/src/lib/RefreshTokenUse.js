//컴포넌트가 아니고 Provider 안쪽 요소가 아니라서 useDispatch를 쓸 수가 없음. 필요한 경우 이걸 복사하던가 참고해서 새로 작성해야 함.

// import { useCallback } from "react";
// import axios from "axios";
// import { setRefresh } from "../modules/tokens";
// import cookie from "react-cookies";
// import { useDispatch } from "react-redux";

// function refreshTokenUse(){

//     const dispatch = useDispatch();
//     const onLogin = useCallback((accessToken) => dispatch(login(accessToken)), [dispatch]);
//     const onLogout = useCallback(()=>dispatch(logout()), [dispatch]);
//     const onSetRefresh = useCallback((refreshToken) => dispatch(setRefresh(refreshToken))[dispatch]);

//     return axios({
//         type:"GET",
//         url: "/auth/refresh",
//     }).then(function(response){
//         //엑세스 토큰 설정
//         onLogin(response.data);
//         let refreshToken = cookie.load("CodedRefreshToken")
//         refreshToken = refreshToken.substr("Bearer ".length, refreshToken.length);
//         onSetRefresh(refreshToken);
//     }).catch(function(e){
//         console.log(e);
//         onLogout();
//         history.go("/login");
//     });
// }

// export default refreshTokenUse;