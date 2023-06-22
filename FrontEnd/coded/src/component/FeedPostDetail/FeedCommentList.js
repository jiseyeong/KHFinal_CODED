import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeedComment from "./FeedComment";
import LoadingBar from "../Common/LoadingBar";



function FeedCommentList({feedPostId, depth, parentId}){

    const [commentList, setCommentList] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const [userNickNames, setUserNickNames] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const loginUserNo = useSelector((state)=>state.member.userNo);


    useEffect(()=>{
        readComments();
    }, []);

    function readComments(){
        setLoading(true);
        setCommentList([]);
        setUserIds([]);
        setUserNickNames([]);
        setUserProfiles([]);

        if(depth === 0){
            axios({
                method:'get',
                url:'/feedpost/comment/depth0',
                params:{
                    feedPostId:feedPostId,
                    userNo:loginUserNo
                }
            }).then((response)=>{
                const {commentList, userIdList, userNickNameList, userProfileList} = response.data;

                setLoading(false);
                setCommentList((prev)=>{return [...prev, ...commentList]});
                setUserIds((prev)=>{return [...prev, ...userIdList]});
                setUserNickNames((prev)=>{return [...prev, ...userNickNameList]});
                setUserProfiles((prev)=>{return [...prev, ...userProfileList]});
            }).catch((error)=>{
                setLoading(false);
                if(error.request.status === 400){
                    console.log(error.response.body);
                }else{
                    console.log(error);
                }
            })
        }else if(depth < 2){
            axios({
                method:'get',
                url:'/feedpost/comment/depthN',
                params:{
                    parentId : parentId,
                    depth : depth,
                    userNo:loginUserNo
                }
            }).then((response)=>{
                const {commentList, userIdList, userNickNameList, userProfileList} = response.data;
                setLoading(false);
                setCommentList((prev)=>{return [...prev, ...commentList]});
                setUserIds((prev)=>{return [...prev, ...userIdList]});
                setUserNickNames((prev)=>{return [...prev, ...userNickNameList]});
                setUserProfiles((prev)=>{return [...prev, ...userProfileList]});
            }).catch((error)=>{
                setLoading(false);
                if(error.request.status === 400){
                    console.log(error.response.data);
                }else{
                    console.log(error);
                }
            })
        }else{
            setLoading(false);
        }
    }

    if(loading){
        return <LoadingBar />
    }

    return (
        <>
            {commentList ?
            (<div>
                {commentList.map((item, index)=>{
                    return(
                        <FeedComment
                            key={item.feedCommentId}
                            userNickName={userNickNames[index]}
                            userId={userIds[index]}
                            userProfile={userProfiles[index]}
                            commentInfo={item}
                            feedPostId={feedPostId}
                            depth={item.depth}
                            readComments={readComments}
                        />
                    )
                })}
            </div>)
            :null}
        </>
    )
}

export default FeedCommentList;