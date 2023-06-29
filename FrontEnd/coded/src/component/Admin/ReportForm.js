import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ReportForm() {
  const accessToken = useSelector((state) => state.member.access);
  const [reportList, setReportList] = useState([]);
  const [body, setBody] = useState('');

  const [modal, setModal] = useState(false);
  const [feedLikeCount, setFeedLikeCount] = useState(0);
  const [isFeedLike, setIsFeedLike] = useState(false);
  const [hashTagList, setHashTagList] = useState([]);
  const [feedPost, setFeedPost] = useState([]);

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
      axios({
        method: 'get',
        url: '/feedReport/report',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          setReportList(response.data);
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
  }, [accessToken]);

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
        setFeedPost(respons.data);

        function getHashs() {
          return axios({
            method: 'get',
            url: '/feedpost/hashtagList',
            params: {
              feedPostId: response.data.feedPostId,
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
              feedPostId: response.data.feedPostId,
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

  return (
    <div>
      {accessToken ? (
        <div style={{ display: 'flex' }}>
          <table border={1} style={{ flex: 2 }}>
            <thead>
              <tr>
                <th colSpan={5}>신고글 리스트</th>
              </tr>
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th style={{ width: '5%' }}>writer<br />userNo</th>
                <th style={{ width: '70%' }}>Title</th>
                <th style={{ width: '15%' }}>Write <br /> Date</th>
                <th style={{ width: '5%' }}>target<br />FeedPost<br />Id</th>
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
                    <td
                      onClick={() => {
                        onFeedModal(item.targetFeedPostId);
                      }}
                    >
                      {item.targetFeedPostId}
                    </td>
                  </tr>
                );
              })}
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
      ) : (
        <div>로그인 후 이용 가능한 서비스입니다.</div>
      )}
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
  );
}

export default ReportForm;
