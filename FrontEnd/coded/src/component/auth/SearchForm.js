import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const textMap = {
    id: '아이디 찾기',
    pw: '비밀번호 재발급',
  };

function SearchForm({type}){

    const text = textMap[type];

    const emailRef = useRef(null);
    const [message, setMessage] = useState();
    const idRef = useRef(null);
    const nickNameRef = useRef(null);

    function doIdSearch(){
        axios({
            method:"get",
            url:"/auth/memberIdByEmail",
            params:{
                email:emailRef.current.value
            }
        }).then((response)=>{
            console.log(response);
            setMessage(response.data);
        }).catch((error)=>{
            if(error.request.status == 400){
                setMessage(error.response.data);
            }
        })
    }

    function doPwSearch(){

    }

    return(
        <div>
            <h3>{text}</h3>
            <input 
                autoComplete="email"
                type="text"
                placeholder="input email"
                ref={emailRef}
            />
            {type === "pw" && (
                <>
                    <br/>
                    <input
                        autoComplete="username"
                        type="text"
                        placeholder="input id"
                        ref={idRef}
                    />
                    <br/>
                    <input
                        autoComplete="name"
                        type="text"
                        placeholder="input nickname"
                        ref={nickNameRef}
                    />
                </>
            )}
            <br />
            <div>{message}</div>
            <button onClick={type==="id" ? doIdSearch : doPwSearch}>{type==="id" ? "아이디 찾기" : "비밀번호 재발급"}</button>
            <Link to="/login"><button>로그인 창으로</button></Link>
        </div>
    );
}

export default SearchForm;