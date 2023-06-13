import React,{ useState } from "react";
import Axios from 'axios'

const JoinPageComponent = ()=>{
    const [userNickName, setUserNickName] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const [disabled, setDisabled] = useState(false);

    const handleNameChange = ({target: {value}})=>setUserNickName(value);

    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();
        await new Promise((r) => setTimeout(r, 1000));
        alert("회원가입 전송 완료");
        setDisabled(false);
    }

    return (
        <div>
            <p>Hello</p>
        </div>
      )
}

export default JoinPageComponent;
