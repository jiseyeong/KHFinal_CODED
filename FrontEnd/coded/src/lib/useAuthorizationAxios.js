import axios from "axios";

function AuthorizationAxois(url, method, param, token){
    return axios({
        url: url,
        method: method,
        data: param,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default AuthorizationAxois;