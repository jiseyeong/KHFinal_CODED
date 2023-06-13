import { useCallback } from "react";
import axios from axios
import { setRefresh } from "../modules/tokens";

function refreshTokenUse(){

    const dispatch = useDispatch();
    const onLogin = useCallback((accessToken) => dispatch(login(accessToken)), [dispatch]);
    const onLogout = useCallback(()=>dispatch(logout()), [dispatch]);
    const onSetRefresh = useCallback((refreshToken) => dispatch(setRefresh(refreshToken))[dispatch]);

    const refreshToken = useSelector((state)=>state.token.refreshToken);

    return axios({
        type:"GET",
        url: "/auth/refresh",
        params:{
            refreshToekn: refreshToken
        }
    }).then(function(response){
        onLogin(response.data.accessToken);
        onSetRefresh(response.data.refreshToken);

    }).catch(function(e){
        console.log(e);
        onLogout();
        history.go("/login");
    });
}