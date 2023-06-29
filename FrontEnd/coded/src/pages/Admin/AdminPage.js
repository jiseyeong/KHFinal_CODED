import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import ReportForm from '../../component/Admin/ReportForm';
import FeedListForm from '../../component/Admin/FeedListForm';

function AdminPage() {
  return (
    <div>
        <div style={{display:'flex'}}>
            <table border="1" style={{flex:1}}>
                <thead>
                    <tr>
                        <th colSpan={2}>Index</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align='center'><Link to="/Admin/report">report</Link></td>
                        <td align='center'><Link to="/Admin/feedList">feedList</Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Routes>
            <Route path="/report" element={<ReportForm />} />
            <Route path="/feedList" element={<FeedListForm />} />
        </Routes>
    </div>
  )
}

export default AdminPage;
