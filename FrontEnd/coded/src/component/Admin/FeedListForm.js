import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function FeedListForm(){
    const accessToken = useSelector((state)=>state.member.access);
    const [feedPostList, setFeedPostList] = useState([]);
    const [cpage, setCpage] = useState(1);
    const [naviList, setNaviList] = useState([]);
    const [needPrev, setNeedPrev] = useState(false);
    const [needNext, setNeedNext] = useState(false);

    useEffect(()=>{
        if(accessToken){
            axios({
                method:'get',
                url:'/feedpost/getNaviInfo',
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
                url:'/feedpost/selectAllFeedPost/',
                params:{
                    cpage:cpage
                }
            })
            .then((response)=>{
                setFeedPostList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    },[accessToken, cpage])

    function handleCpage(index){
        setCpage(index);
    }

    return (
        <div style={{display:"flex"}}>
            <table border={1} style={{flex: 1}}>
                <thead>
                    <tr>
                        <th colSpan={3}>FeedList</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>UserNo</th>
                        <th>Delete Button</th>
                    </tr>
                </thead>
                <tbody>
                    {feedPostList.map((item, index)=>{
                        return(
                            <tr key={item.feedPostId}>
                                <td>{item.feedPostId}</td>
                                <td>{item.userNo}</td>
                                <td><button>삭제</button></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td align="center" colSpan={3}>
                            {needPrev && (<button onClick={()=>{handleCpage(naviList[0] - 1)}}>prev</button>)}
                            {naviList.map((item, index)=>{
                                return(
                                    <button onClick={()=>{handleCpage(item)}}>{item}</button>
                                )
                            })}
                            {needNext && (<button onClick={()=>{handleCpage(naviList[naviList.length - 1] + 1)}}>next</button>)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default FeedListForm;