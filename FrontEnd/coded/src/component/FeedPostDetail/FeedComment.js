import axios from "axios";
import { useEffect, useState } from "react";

function FeedComment({feedPostId, depth, parentId}){

    const [commentList, setCommentList] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [userNickNames, setUserNickNames] = useState([]);
    
    useEffect(()=>{
        if(depth === 0){
            axios({
                method:'get',
                url:'/feedpost/comment/depth0',
                params:{
                    feedPostId:feedPostId
                }
            }).then((response)=>{
                setCommentList((prev)=>{return [...prev, ...response.data]});
                commentList.forEach((item, index)=>{
                    axios({
                        method:'get',
                        url:'/auth/getUserNamesByUserNo',
                        params:{
                            userNo : item.userNo
                        }
                    }).then((response)=>{
                        setUserIds((prev)=>{return [...prev, response.userId]});
                        setUserNickNames((prev)=>{return [...prev, response.userNickName]});
                    });
                });
            }).catch((error)=>{
                console.log(error);
            })
        }else{
            axios({
                method:'get',
                url:'/feedpost/depthN',
                params:{
                    parentId : parentId,
                    depth : depth
                }
            }).then((response)=>{
                setCommentList((prev)=>{return [...prev, ...response.data]});
                commentList.forEach((item, index)=>{
                    axios({
                        method:'get',
                        url:'/auth/getUserNamesByUserNo',
                        params:{
                            userNo : item.userNo
                        }
                    }).then((response)=>{
                        setUserIds((prev)=>{return [...prev, response.userId]});
                        setUserNickNames((prev)=>{return [...prev, response.userNickName]});
                    });
                });
            })
        }
    }, []);

    return (
        <>
            {commentList ?
            (<div>
                {commentList.map((item, index)=>{
                    return(
                        <div>
                            <div>작성자: {userNickNames[index]}</div>
                            <div>작성자 ID : {userIds[index]}</div>
                            <div>본문: {item.body}</div>
                            <div>작성일시: {item.writeDate}</div>
                            <div>
                                {/* 답글 리스트 */}
                                <FeedComment
                                    feedPostId={feedPostId}
                                    depth={depth+1}
                                    parentId={item.feedCommentId}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>)
            :null}
        </>
    )
}

export default FeedComment;