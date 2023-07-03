import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserForm(){

    const accessToken = useSelector((state)=>state.member.access);
    const [memberList, setMemberList] = useState([]);
    const [cpage, setCpage] = useState(1);
    const [naviList, setNaviList] = useState([]);
    const [needPrev, setNeedPrev] = useState(false);
    const [needNext, setNeedNext] = useState(false);

    const type = useRef('none');
    const selectBoxRef = useRef(null);
    const inputRef = useRef(null);

    const numberRegex = /^[0-9]+$/

    const navigate = useNavigate();

    useEffect(()=>{
        if(accessToken){
            updateMemberList();
        }
    },[accessToken, cpage])

    function updateMemberList(){
        if(accessToken){
            if(type.current==='none'){
                axios({
                    method:'get',
                    url:'/auth/getNaviInfo',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage
                    }
                })
                .then((response)=>{
                    setNaviList(response.data.naviList);
                    setNeedPrev(response.data.needPrev);
                    setNeedNext(response.data.needNext);
                })
                .catch((error)=>{
                    if (error.request.status === 403) {
                        console.log('Forbiddened. 권한이 없습니다.');
                        navigate('/');
                      } else if (error.request.status === 400) {
                        console.log('badRequest. : ' + error.response.data);
                      } else {
                        console.log(error);
                      }
                })
                axios({
                    method:'get',
                    url:'/auth/pagingMember',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage
                    },
                })
                .then((response)=>{
                    setMemberList(response.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }else if(type.current === 'id'){
                axios({
                    method:'get',
                    url:'/auth/getNaviInfo/id',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        userId:inputRef.current.value
                    }
                })
                .then((response)=>{
                    setNaviList(response.data.naviList);
                    setNeedPrev(response.data.needPrev);
                    setNeedNext(response.data.needNext);
                })
                .catch((error)=>{
                    if (error.request.status === 403) {
                        console.log('Forbiddened. 권한이 없습니다.');
                        navigate('/');
                      } else if (error.request.status === 400) {
                        console.log('badRequest. : ' + error.response.data);
                      } else {
                        console.log(error);
                      }
                })
                axios({
                    method:'get',
                    url:'/auth/pagingMember/id',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        userId:inputRef.current.value
                    },
                })
                .then((response)=>{
                    setMemberList(response.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }else if(type.current === 'nickName'){
                axios({
                    method:'get',
                    url:'/auth/getNaviInfo/nickName',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        userNickName:inputRef.current.value,
                    }
                })
                .then((response)=>{
                    setNaviList(response.data.naviList);
                    setNeedPrev(response.data.needPrev);
                    setNeedNext(response.data.needNext);
                })
                .catch((error)=>{
                    if (error.request.status === 403) {
                        console.log('Forbiddened. 권한이 없습니다.');
                        navigate('/');
                      } else if (error.request.status === 400) {
                        console.log('badRequest. : ' + error.response.data);
                      } else {
                        console.log(error);
                      }
                })
                axios({
                    method:'get',
                    url:'/auth/pagingMember/nickName',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        userNickName:inputRef.current.value,
                    },
                })
                .then((response)=>{
                    setMemberList(response.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }else if(type.current === 'role'){
                axios({
                    method:'get',
                    url:'/auth/getNaviInfo/role',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        userRole:inputRef.current.value
                    }
                })
                .then((response)=>{
                    setNaviList(response.data.naviList);
                    setNeedPrev(response.data.needPrev);
                    setNeedNext(response.data.needNext);
                })
                .catch((error)=>{
                    if (error.request.status === 403) {
                        console.log('Forbiddened. 권한이 없습니다.');
                        navigate('/');
                      } else if (error.request.status === 400) {
                        console.log('badRequest. : ' + error.response.data);
                      } else {
                        console.log(error);
                      }
                })
                axios({
                    method:'get',
                    url:'/auth/pagingMember/role',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        userRole:inputRef.current.value
                    },
                })
                .then((response)=>{
                    setMemberList(response.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }else if(type.current === 'email'){
                axios({
                    method:'get',
                    url:'/auth/getNaviInfo/email',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        email:inputRef.current.value
                    }
                })
                .then((response)=>{
                    setNaviList(response.data.naviList);
                    setNeedPrev(response.data.needPrev);
                    setNeedNext(response.data.needNext);
                })
                .catch((error)=>{
                    if (error.request.status === 403) {
                        console.log('Forbiddened. 권한이 없습니다.');
                        navigate('/');
                      } else if (error.request.status === 400) {
                        console.log('badRequest. : ' + error.response.data);
                      } else {
                        console.log(error);
                      }
                })
                axios({
                    method:'get',
                    url:'/auth/pagingMember/email',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        cpage:cpage,
                        email:inputRef.current.value
                    },
                })
                .then((response)=>{
                    setMemberList(response.data);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }else if(type.current==='userNo'){
                axios({
                    method:'get',
                    url:'/auth/getUserByUserNo',
                    headers:{
                        Authorization:`Bearer ${accessToken}`,
                    },
                    params:{
                        userNo:inputRef.current.value
                    },
                })
                .then((response)=>{
                    if(response.data){
                        setMemberList([response.data]);
                        setNaviList([1]);
                        setNeedPrev(false);
                        setNeedNext(false);
                    }else{
                        setMemberList([]);
                        setNaviList([]);
                        setNeedPrev(false);
                        setNeedNext(false);
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
    }

    function handleSearchSelect(){
        if(selectBoxRef.current.value === 'UserNo'){
            type.current = 'userNo';
        }else if(selectBoxRef.current.value === 'ID'){
            type.current = 'id';
        }else if(selectBoxRef.current.value === 'NickName'){
            type.current = 'nickName';
        }else if(selectBoxRef.current.value === 'Role'){
            type.current = 'role';
        }else if(selectBoxRef.current.value === 'Email'){
            type.current = 'email';
        }else{
            type.current = 'none';
        }
    }

    function handleSearch(){
        handleSearchSelect();
        if(type.current === 'userNo'){
            if(!numberRegex.test(inputRef.current.value)){
                alert("해당 요소는 숫자로만 검색할 수 있습니다.");
                return;
            }
        }
        setCpage(1);
        updateMemberList();
    }

    function handleCpage(index){
        setCpage(index);
    }

    function moveToUser(userNo) {
        navigate('/myPickPage?userNo=' + userNo);
      }

      function memberDelete(userNo){
        if(accessToken){
            axios({
                method:'delete',
                url:'/auth/deleteMemberByAdmin',
                params:{
                    userNo:userNo
                },
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            .then((response)=>{
                updateMemberList();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    return (
        <div>
            <div style={{display:'flex'}}>
                <table border={1} style={{flex:1}}>
                    <thead>
                        <tr>
                            <th colSpan={6}>user list</th>
                        </tr>
                        <tr>
                            <th>userNo</th>
                            <th>userID</th>
                            <th>userNickName</th>
                            <th>UserRole</th>
                            <th>UserEmail</th>
                            <th>삭제 버튼</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList.map((item, index)=>{
                            return <tr key={item.userNo}>
                                <td onClick={()=>{moveToUser(item.userNo)}}>{item.userNo}</td>
                                <td>{item.userId}</td>
                                <td>{item.userNickName}</td>
                                <td>{item.role}</td>
                                <td>{item.email}</td>
                                <td><button onClick={()=>{memberDelete(item.userNo)}}>삭제</button></td>
                            </tr>
                        })}
                    <tr>
                        <td align="center" colSpan={6}>
                            {needPrev && (<button onClick={()=>{handleCpage(naviList[0] - 1)}}>prev</button>)}
                            {naviList.map((item, index)=>{
                                return(
                                    <button key={item} onClick={()=>{handleCpage(item)}}>{item}</button>
                                )
                            })}
                            {needNext && (<button onClick={()=>{handleCpage(naviList[naviList.length - 1] + 1)}}>next</button>)}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colSpan={6}>
                            <select ref={selectBoxRef} onChange={handleSearchSelect}>
                                <option value='UserNo'>UserNo</option>
                                <option value='ID'>ID</option>
                                <option value='NickName'>NickName</option>
                                <option value='Role'>Role</option>
                                <option value="Email">Email</option>
                            </select>
                            <input type="text" ref={inputRef}></input>
                            <button onClick={handleSearch}>검색</button>
                            <button onClick={()=>{type.current = 'none'; updateMemberList();}}>검색 취소</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserForm;