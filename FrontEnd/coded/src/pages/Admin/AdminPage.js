import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ReportForm from '../../component/Admin/ReportForm';
import FeedListForm from '../../component/Admin/FeedListForm';
import UserForm from '../../component/Admin/UserForm';
import ChatForm from '../../component/Admin/ChatForm';

function AdminPage() {
    const accessToken = useSelector((state)=>state.member.access);
    const navigate = useNavigate();
    useEffect(()=>{
        if(accessToken){
            axios({
                method:'get',
                url:'/auth/isAdmin',
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                },
            })
            .then((response)=>{
                if(!response){
                    navigate("/");
                }
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
        }
    },[accessToken])
  return (
    <div>
        {accessToken ?(
            <div>
                <div style={{display:'flex'}}>
                    <table border="1" style={{flex:1, marginBottom:'50px'}}>
                        <thead>
                            <tr>
                                <th colSpan={3}>Index</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center'><Link to="/Admin/feedList">Feed List</Link></td>
                                <td align='center'><Link to="/Admin/user">User List</Link></td>
                                <td align='center'><Link to="/Admin/chat">ChatRoom List</Link></td>
                            </tr>
                            <tr>
                                <td align='center'><Link to="/Admin/feedReport">Feed Report</Link></td>
                                <td align='center'><Link to='/Admin/userReport'>User Report(none)</Link></td>
                                <td align='center'><Link to="/Admin/chatReport">Chat Report(none)</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Routes>
                    <Route path="/feedReport" element={<ReportForm type={'feedPost'} />} />
                    <Route path="/feedList" element={<FeedListForm />} />
                    <Route path="/user" element={<UserForm />} />
                    <Route path="/chat" element={<ChatForm />} />
                </Routes>
            </div>
        )
        :
        (
            <div>로그인 후 이용 가능한 서비스입니다.</div>
        )
        }
    </div>
  )
}

export default AdminPage;
