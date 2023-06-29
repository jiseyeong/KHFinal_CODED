import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserForm(){

    const accessToken = useSelector((state)=>state.member.access);
    const [memberList, setMemberList] = useState([]);
    const [cpage, setCpage] = useState(1);
    const [naviList, setNaviList] = useState([]);
    const [needPrev, setNeedPrev] = useState(false);
    const [needNext, setNeedNext] = useState(false);

    useEffect(()=>{
        if(accessToken){
            updateMemberList();
        }
    },[accessToken, cpage])

    function updateMemberList(){
        if(accessToken){
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
        }
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserForm;