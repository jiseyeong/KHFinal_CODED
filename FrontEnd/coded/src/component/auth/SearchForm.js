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
    const [loading, setLoding] = useState(false);

    function doIdSearch(){
        setLoding(true);
        axios({
            method:"get",
            url:"/auth/memberIdByEmail",
            params:{
                email:emailRef.current.value
            }
        }).then((response)=>{
            setLoding(false);
            setMessage("찾은 아이디는 '"+response.data+"' 입니다.");
        }).catch((error)=>{
            setLoding(false);
            if(error.request.status == 400){
                setMessage(error.response.data);
            }else{
                console.log(error);
            }
        })
        setLoding(false);
    }

    function doPwSearch(){
        setLoding(true);
        axios({
            method:"post",
            url:"/auth/send-mail/pw",
            params:{
                email:emailRef.current.value,
                userId:idRef.current.value,
                userNickName:nickNameRef.current.value
            }
        }).then((response)=>{
            setLoding(false);
            setMessage(response.data);
        }).catch((error)=>{
            setLoding(false);
            if(error.request.status == 400){
                setMessage(error.response.data);
            }else{
                console.log(error);
            }
        })
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
            {
                loading ? (<div>진행 중입니다.</div>) : (            <button onClick={type==="id" ? doIdSearch : doPwSearch}>{type==="id" ? "아이디 찾기" : "비밀번호 재발급"}</button>)
            }
            <Link to="/login"><button>로그인 창으로</button></Link>
        </div>
    );
}

export default SearchForm;