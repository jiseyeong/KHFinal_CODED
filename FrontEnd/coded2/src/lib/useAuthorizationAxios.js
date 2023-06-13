import axios from "axios";

function AuthorizationAxois(url, method, param, token){
    return axios({
        url: url,
        method: method,
        data: param,
        header: `Bearer ${token}`
    })
}

export default AuthorizationAxois;