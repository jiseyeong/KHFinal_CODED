import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function NaverLastCallbackPage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState(searchParams.get('message'))

    useEffect(()=>{

    });
    return(
        <div>
            {message}
        </div>
    )
}

export default NaverLastCallbackPage;