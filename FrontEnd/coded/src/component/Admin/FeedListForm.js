import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../pages/Ootd/Main/Modal";
import { useNavigate } from "react-router-dom";

function FeedListForm(){
    const accessToken = useSelector((state)=>state.member.access);
    const [feedPostList, setFeedPostList] = useState([]);
    const [cpage, setCpage] = useState(1);
    const [naviList, setNaviList] = useState([]);
    const [needPrev, setNeedPrev] = useState(false);
    const [needNext, setNeedNext] = useState(false);

    const [modal, setModal] = useState(false);
    const [feedLikeCount, setFeedLikeCount] = useState(0);
    const [isFeedLike, setIsFeedLike] = useState(false);
    const [hashTagList, setHashTagList] = useState([]);
    const [feedPost, setFeedPost] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        if(accessToken){
            updateFeedList();
        }
    },[accessToken, cpage])

    function updateFeedList(){
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
    }

    function handleCpage(index){
        setCpage(index);
    }

    // 모달 창 열기
    const openModal = () => {
        if (!modal) {
        setModal(true);
        }
    };

    // 모달 창 닫기
    const closeModal = () => {
        if (modal) {
        setModal(false);
        }
    };

    function moveToUser(userNo) {
        navigate('/myPickPage?userNo=' + userNo);
      }
    
      function onFeedModal(targetFeedPostId) {
        axios({
          method: 'get',
          url: '/feedpost/selectOneFeedPost',
          params: {
            feedpostId: targetFeedPostId,
          },
        })
          .then((response) => {
            setFeedPost(response.data);
    
            function getHashs() {
              return axios({
                method: 'get',
                url: '/feedpost/hashtagList',
                params: {
                  feedPostId: feedPost.feedPostId,
                },
              }).then((response) => {
                setHashTagList((prev) => {
                  return [...prev, ...response.data];
                });
              });
            }
            function getLikeCount() {
              return axios({
                method: 'get',
                url: '/feedpost/likeCount',
                params: {
                  feedPostId: feedPost.feedPostId,
                },
              })
                .then((response) => {
                  setFeedLikeCount(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
            function getIsLike() {
              return axios({
                method: 'get',
                url: '/feedpost/isLike',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                params: {
                  feedPostId: feedPost.feedPostId,
                },
              }).then((response) => {
                setIsFeedLike(response.data);
              });
            }
    
            axios.all([getHashs(), getLikeCount(), getIsLike()]).then(() => {
              openModal();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

    function feedDelete(feedPostId){
        if(accessToken){
            axios({
                method:'delete',
                url:'/feedpost/deleteFeedPost',
                params:{
                    feedPostId:feedPostId
                },
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            .then((response)=>{
                updateFeedList();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
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
                                <td onClick={()=>{onFeedModal(item.feedPostId)}}>{item.feedPostId}</td>
                                <td onClick={()=>{moveToUser(item.userNo)}}>{item.userNo}</td>
                                <td align="center"><button onClick={()=>{feedDelete(item.feedPostId)}}>삭제</button></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td align="center" colSpan={3}>
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
            {modal && (
                <Modal
                // modal={modal}
                closeModal={closeModal}
                feedPost={feedPost}
                feedLikeCount={feedLikeCount}
                setFeedLikeCount={setFeedLikeCount}
                isFeedLike={isFeedLike}
                setIsFeedLike={setIsFeedLike}
                hashTagList={hashTagList}
                />
            )}
        </div>
    )
}

export default FeedListForm;