import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FeedModal from '../../pages/Ootd/Main/FeedModal';

function ReportForm({ type }) {
  const accessToken = useSelector((state) => state.member.access);
  const [reportList, setReportList] = useState([]);
  const [cpage, setCpage] = useState(1);
  const [naviList, setNaviList] = useState([]);
  const [needPrev, setNeedPrev] = useState(false);
  const [needNext, setNeedNext] = useState(false);
  const [body, setBody] = useState('');

  const [modal, setModal] = useState(false);
  const [feedLikeCount, setFeedLikeCount] = useState(0);
  const [isFeedLike, setIsFeedLike] = useState(false);
  const [hashTagList, setHashTagList] = useState([]);
  const [feedPost, setFeedPost] = useState([]);

  const searchType = useRef('none');
  const selectBoxRef = useRef(null);
  const inputRef = useRef(null);
  const numberRegex = /^[0-9]+$/;
  const navigate = useNavigate();

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

  useEffect(() => {
    if (accessToken) {
      updateReportList();
    }
  }, [accessToken]);

  function updateReportList() {
    if (accessToken) {
      if (type === 'feedPost') {
        axios({
          method: 'get',
          url: '/feedReport/feed',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            cpage: cpage.current,
            searchType: searchType.current,
            value: inputRef.current.value,
          },
        })
          .then((response) => {
            if (searchType.current === 'reportId') {
              if (response.data) {
                setReportList([response.data]);
                setNaviList([1]);
                setNeedPrev(false);
                setNeedNext(false);
              } else {
                setReportList([]);
                setNaviList([]);
                setNeedPrev(false);
                setNeedNext(false);
              }
            } else {
              setReportList(response.data.dataList);
              setNaviList(response.data.naviList);
              setNeedPrev(response.data.needPrev);
              setNeedNext(response.data.needNext);
            }
          })
          .catch((error) => {
            if (error.request.status === 403) {
              console.log('Forbiddened. 권한이 없습니다.');
              navigate('/');
            } else if (error.request.status === 400) {
              console.log('badRequest. : ' + error.response.data);
            } else {
              console.log(error);
            }
          });
      }
    }
  }

  function handleSearchSelect() {
    if (selectBoxRef.current.value === 'ReportID') {
      searchType.current = 'reportId';
    } else if (selectBoxRef.current.value === 'WriterUserNo') {
      searchType.current = 'writerUserNo';
    } else if (selectBoxRef.current.value === 'Title') {
      searchType.current = 'title';
    } else if (selectBoxRef.current.value === 'TargetId') {
      searchType.current = 'targetId';
    } else {
      searchType.current = 'none';
    }
  }

  function handleSearch() {
    if (selectBoxRef.current.value !== 'Title') {
      if (!numberRegex.test(inputRef.current.value)) {
        alert('해당 요소는 숫자만으로 검색 가능합니다.');
        return;
      }
    }
    handleSearchSelect();
    setCpage(1);
    updateReportList();
  }

  function handleCpage(index) {
    setCpage(index);
  }

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

        function getHashs(feedPostId) {
          return axios({
            method: 'get',
            url: '/feedpost/hashtagList',
            params: {
              feedPostId: feedPostId,
            },
          }).then((response) => {
            setHashTagList((prev) => {
              return [...prev, ...response.data];
            });
          });
        }
        function getLikeCount(feedPostId) {
          return axios({
            method: 'get',
            url: '/feedpost/likeCount',
            params: {
              feedPostId: feedPostId,
            },
          }).then((response) => {
            setFeedLikeCount(response.data);
          });
        }
        function getIsLike(feedPostId) {
          return axios({
            method: 'get',
            url: '/feedpost/isLike',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              feedPostId: feedPostId,
            },
          }).then((response) => {
            setIsFeedLike(response.data);
          });
        }

        axios
          .all([
            getHashs(response.data.feedPostId),
            getLikeCount(response.data.feedPostId),
            getIsLike(response.data.feedPostId),
          ])
          .then(() => {
            openModal();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <table border={1} style={{ flex: 2 }}>
          <thead>
            <tr>
              <th colSpan={5}>신고글 리스트</th>
            </tr>
            <tr>
              <th style={{ width: '5%' }}>ID</th>
              <th style={{ width: '5%' }}>
                writer
                <br />
                UserNo
              </th>
              <th style={{ width: '70%' }}>Title</th>
              <th style={{ width: '15%' }}>
                Write <br /> Date
              </th>
              <th style={{ width: '5%' }}>
                target
                <br />
                FeedPost
                <br />
                Id
              </th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((item, index) => {
              return (
                <tr key={item.reportId}>
                  <td>{item.reportId}</td>
                  <td
                    onClick={() => {
                      moveToUser(item.writerUserNo);
                    }}
                  >
                    {item.writerUserNo}
                  </td>
                  <td
                    onClick={() => {
                      setBody(item.body);
                    }}
                  >
                    {item.title}
                  </td>
                  <td>{item.formedWriteDate}</td>
                  {type === 'feedPost' && (
                    <td
                      onClick={() => {
                        onFeedModal(item.targetFeedPostId);
                      }}
                    >
                      {item.targetFeedPostId}
                    </td>
                  )}
                </tr>
              );
            })}
            <tr>
              <td align="center" colSpan={5}>
                {needPrev && (
                  <button
                    onClick={() => {
                      handleCpage(naviList[0] - 1);
                    }}
                  >
                    prev
                  </button>
                )}
                {naviList.map((item, index) => {
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        handleCpage(item);
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
                {needNext && (
                  <button
                    onClick={() => {
                      handleCpage(naviList[naviList.length - 1] + 1);
                    }}
                  >
                    next
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td align="center" colSpan={5}>
                <select ref={selectBoxRef} onChange={handleSearchSelect}>
                  <option value="ReportID">ReportID</option>
                  <option value="WriterUserNo">WriterUserNo</option>
                  <option value="Title">Title</option>
                  <option value="TargetId">TargetId</option>
                </select>
                <input type="text" ref={inputRef}></input>
                <button onClick={handleSearch}>검색</button>
                <button
                  onClick={() => {
                    searchType.current = 'none';
                    updateReportList();
                  }}
                >
                  검색 취소
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1} style={{ flex: 1 }}>
          <thead>
            <tr>
              <th>선택된 신고글 본문</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{body}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {modal && (
        <FeedModal
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
  );
}

export default ReportForm;
