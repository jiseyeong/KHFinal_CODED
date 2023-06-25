import { useEffect, useRef, useState } from 'react';
import './MyPickPage.scss';
import FeedPostDetail from '../../component/FeedPostDetail/FeedPostDetail';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyPickPage = () => {
  const accessToken = useSelector((state) => state.member.access);
  const [feedPost, setFeedPost] = useState([]);

  useEffect(() => {
    if (accessToken) {
      axios({
        url: '',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <div className="myPickPageLayout">
      <header>
        <nav>
          <div className="logo">
            <img src="instagram_logo.png" alt="Instagram Logo" />
          </div>
          <div className="searchBar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="profileIcon">
            <img src="profile_icon.jpg" alt="Profile Icon" />
          </div>
        </nav>
      </header>

      <div className="profile">
        <div className="profileHeader">
          <div className="imageLayout">
            <img src="/images/test.jpg" alt="Profile Picture" />
          </div>
          <div className="profileInfo">
            <h1>Heeeesam</h1>
            <div>@woosang97</div>
            <div>여름시러</div>
            <div>@heeeesam</div>
          </div>
          <div className="profileStatsLayout">
            <ul className="profileStats">
              <li>
                <strong className="statsCount">1,365</strong>
                <div className="statsTitle">Posts</div>
              </li>
              <li>
                <strong className="statsCount">238M</strong>
                <div className="statsTitle">Followers</div>
              </li>
              <li>
                <strong className="statsCount">67</strong>
                <div className="statsTitle">Following</div>
              </li>
            </ul>
          </div>
          <div className="btnLayout">
            <img alt="이미지 아이콘" className="followButton" />
          </div>
        </div>

        <hr />

        <div className="feed">
          {/* Post 1 */}
          {/* <FeedPostDetail index={i} feedPost={e}></FeedPostDetail> */}
        </div>
      </div>
    </div>
  );
};

export default MyPickPage;
