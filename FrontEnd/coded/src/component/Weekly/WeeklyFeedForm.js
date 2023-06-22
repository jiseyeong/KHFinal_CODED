import { useContext, useEffect, useRef, useState } from "react";
import { FeedMaxTempContext } from "../../modules/Context/FeedMaxTempContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { styled } from 'styled-components';
import Masonry from 'react-masonry-component';
import FeedPostDetail from "../FeedPostDetail/FeedPostDetail";
import LoadingBar from "../Common/LoadingBar";

// 벽돌형 리스트 출력을 위해 react-masonry-component를 사용

// masonry의 옵션 세팅
const masonryOptions = {
  // 내부 요소들 선택자 지정
  itemSelector: '.grid-item',
  // 열 사이 간격
  gutter: 30,

  // 출력 순서 => 가로 방향 우선
  horizontalOrder: true,

  // 요소 내 가로 사이즈 동일
  isEqualSize: true,
  fitWidth: true,
};

const FeedPostOuter = styled('div')`
  margin: auto;
  width: 85%;
  display: flex;
  justify-content: center;
  border: 0px;
  padding: 20px;

  .my-masonry-grid {
    width: 100%;
    border: 0px;
  }
  .grid-item {
    // 행 사이 간격
    margin-bottom: 30px;
    border: 0px;
  }
`;

function WeeklyFeedForm(){
    const {maxTemp, tempRange} = useContext(FeedMaxTempContext);
    const [feedList, setFeedList] = useState([]);
    const accessToken = useSelector((state) => state.member.access);
    const [loading, setLoading] = useState(false);
    const [needLogin, setNeedLogin] = useState(false);

    const [cpage, setCpage] = useState(1);
    const [thumbNail, setThumbnail] = useState([]);
    const [member, setMember] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [hashTagList, setHashTagList] = useState([]);
    const feedPostOuterRef = useRef(null);
    
    useEffect(()=>{
        if(!(maxTemp === -9999 || tempRange === -9999)){
          setNeedLogin(false);
          addFeedList();
        }else{
          setNeedLogin(true);
        }
    }, [maxTemp, tempRange]);

    useEffect(()=>{
        console.log(feedList);
    }, [feedList]);

    useEffect(()=>{
      window.onscroll = function(){
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
            addFeedList();
        }
      }
      return ()=>{
        window.onscroll = null;
      }
    }, []);

    function addFeedList(){
        setLoading(true);
        axios({
            method:'get',
            url:'/feedpost/weeklyFeed',
            headers:{
                Authorization:'Bearer '+accessToken
            },
            params:{
                currentTemp:maxTemp,
                currentTempRange:tempRange,
                cpage: cpage
            }
        }).then((response)=>{
            setLoading(false);
            const {
                feedPostList,
                thumbNailList,
                memberList,
                userProfileList,
                hashTagLists,
              } = response.data;

            setFeedList((prev)=>{return [...prev, ...feedPostList]});
            setThumbnail((prev)=>{return [...prev, ...thumbNailList]});
            setMember((prev)=>{return [...prev, ...memberList]});
            setHashTagList((prev) => [...prev, ...hashTagLists]);
            setCpage((prev)=>{return prev+1});
        }).catch((error)=>{
            setLoading(false);
            console.log(error);
        })
    }

    if(needLogin){
      return(
        <div>로그인이 필요한 서비스입니다. 로그인부터 해주십시오.</div>
      )
    }

    return (
    <FeedPostOuter ref={feedPostOuterRef}>
      <Masonry className={'my-masonry-grid'} options={masonryOptions}>
        {feedList.map((item, index) => {
          return (
            <div className="grid-item" key={index}>
              <FeedPostDetail
                index={index}
                // columnHeights={columnHeights}
                // setColumnHeights={setColumnHeights}
                feedPost={item}
                thumbNail={thumbNail[index]}
                member={member[index]}
                userProfile={userProfile[index]}
                hashTagList={hashTagList[index]}
              ></FeedPostDetail>
            </div>
          );
        })}
      </Masonry>
    </FeedPostOuter>
    )
}

export default WeeklyFeedForm;