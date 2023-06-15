// import React from "react";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";
// import AuthForm from "../component/auth/AuthForm";
// import { login, logout } from "../modules/tokens";
// import { useCallback } from "react";

// function AuthFormContainer(){
//     const access = useSelector((state)=>state.token.access);
//     const dispatch = useDispatch();
//     const onLogin = useCallback((accessToken) => dispatch(login(accessToken)), [dispatch]);
//     const onLogout = useCallback(()=>dispatch(logout()), [dispatch]);
//     return (
//         <AuthForm
//             access={access}
//             onLogin={onLogin}
//             onLogout={onLogout}
//          />
//     )
// }

// export default React.memo(AuthFormContainer);