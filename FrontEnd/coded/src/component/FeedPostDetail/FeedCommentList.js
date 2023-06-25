 import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FeedComment from "./FeedComment";
import LoadingBar from "../Common/LoadingBar";



function FeedCommentList({feedPostId, depth, parentId}){

    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState(false);
    const accessToken = useSelector((state)=>state.member.access);
    const editorRef = useRef(null);

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

    function writeComment(){
        axios({
            method:'post',
            url:'/feedpost/comment',
            headers:{
                Authorization:`Bearer ${accessToken}`
            },
            params:{
                feedPostId:feedPostId,
                body:editorRef.current.innerText
            },
        })
        .then((response)=>{
            readComments();
        })
        .catch((error) => {
            if (error.request.status === 400) {
              console.log('먼저 로그인을 해주세요.');
            } else {
              console.log(error);
            }
        });
    }

    if(loading){
        return <LoadingBar />
    }

    return (
        <div>
            {(depth === 0 && accessToken) && 
                (
                    <div>
                        <div>댓글 쓰기</div>
                        <div ref={editorRef} contentEditable="true"/>
                        <button onClick={writeComment}>댓글 전송하기</button>
                    </div>
                )
            }
            {commentList &&
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
            </div>)}
        </div>
    )
}

export default FeedCommentList;