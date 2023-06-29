import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import ReportForm from '../../component/Admin/ReportForm';
import FeedListForm from '../../component/Admin/FeedListForm';
import UserForm from '../../component/Admin/UserForm';

function AdminPage() {
    const accessToken = useSelector((state)=>state.member.access);
  return (
    <div>
        {accessToken ?(
            <>
                <div style={{display:'flex'}}>
                    <table border="1" style={{flex:1}}>
                        <thead>
                            <tr>
                                <th colSpan={3}>Index</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align='center'><Link to="/Admin/report">report</Link></td>
                                <td align='center'><Link to="/Admin/feedList">feedList</Link></td>
                                <td align='center'><Link to="/Admin/user">user</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Routes>
                    <Route path="/report" element={<ReportForm />} />
                    <Route path="/feedList" element={<FeedListForm />} />
                    <Route path="/user" element={<UserForm />} />
                </Routes>
            </>
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
