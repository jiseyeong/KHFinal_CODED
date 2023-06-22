import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeedComment from "./FeedComment";
import LoadingBar from "../Common/LoadingBar";



function FeedCommentList({feedPostId, depth, parentId}){

    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState(false);
    const loginUserNo = useSelector((state)=>state.member.userNo);


    useEffect(()=>{
        readComments();
    }, []);

    function readComments(){
        setLoading(true);
        setCommentList([]);

        if(depth === 0){
            axios({
                method:'get',
                url:'/feedpost/comment/depth0',
                params:{
                    feedPostId:feedPostId,
                    userNo:loginUserNo
                }
            }).then((response)=>{
                setLoading(false);
                setCommentList((prev)=>{return [...prev, ...response.data]});
            }).catch((error)=>{
                setLoading(false);
                if(error.request.status === 400){
                    console.log(error.response.data);
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
                setLoading(false);
                setCommentList((prev)=>{return [...prev, ...response.data]});
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