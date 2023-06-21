import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HeartIcons = {
    empty:<svg
      className="like"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        clipRule="evenodd"
      ></path>
    </svg>,
    heart:null
}

function FeedComment({feedPostId, depth, parentId}){

    const [commentList, setCommentList] = useState([]);
    const [commentLikeList, setCommentLikeList] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [userNickNames, setUserNickNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const loginUserNo = useSelector((state)=>state.member.userNo);
    
    useEffect(()=>{
        setLoading(true);
        setCommentList([]);
        setCommentLikeList([]);
        setUserIds([]);
        setUserNickNames([]);
        if(depth === 0){
            axios({
                method:'get',
                url:'/feedpost/comment/depth0',
                params:{
                    feedPostId:feedPostId,
                    userNo:loginUserNo
                }
            }).then((response)=>{
                const {commentList, isLikeList, userIdList, userNickNameList} = response.data;

                setLoading(false);
                setCommentList((prev)=>{return [...prev, ...commentList]});
                setCommentLikeList((prev)=>{return [...prev, ...isLikeList]});
                setUserIds((prev)=>{return [...prev, ...userIdList]});
                setUserNickNames((prev)=>{return [...prev, ...userNickNameList]});
            }).catch((error)=>{
                setLoading(false);
                if(error.request.status === 400){
                    console.log(error.request.body);
                }else{
                    console.log(error);
                }
            })
        }else{
            axios({
                method:'get',
                url:'/feedpost/comment/depthN',
                params:{
                    parentId : parentId,
                    depth : depth,
                    userNo:loginUserNo
                }
            }).then((response)=>{
                setLoading(false);
                setCommentList((prev)=>{return [...prev, ...response.data.commentList]});
                setCommentLikeList((prev)=>{return [...prev, ...response.data.isLikeList]});
                setUserIds((prev)=>{return [...prev, ...response.data.userIdList]});
                setUserNickNames((prev)=>{return [...prev, ...response.data.userNickNameList]});
            }).catch((error)=>{
                setLoading(false);
                if(error.request.status === 400){
                    console.log(error.response.data);
                }else{
                    console.log(error);
                }
            })
        }
    }, []);

    return (
        <>
            {commentList ?
            (<div>
                {commentList.map((item, index)=>{
                    return(
                        <div key={item.feedCommentId}>
                            <div>작성자: {userNickNames[index]}</div>
                            <div>작성자 ID : {userIds[index]}</div>
                            <div>본문: {item.body}</div>
                            <div>작성일시: {item.writeDate}</div>
                            <div>좋아요: {commentLikeList[index] ? "heart" : HeartIcons.empty}</div>
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