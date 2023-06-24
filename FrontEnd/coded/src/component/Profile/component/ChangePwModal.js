import React, { Component, useEffect, useState } from 'react';
import './ChangePwModal.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FeedCommentList from '../../FeedPostDetail/FeedCommentList';
import {
  OptionBox,
  Like,
  ScrapImage,
} from '../../../assets/ModalAsset/ModalAsset';

function ChangePwModal({ toggleChangePwModal }) {
  const [userBio, setUserBio] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [res, setRes] = useState([]);
  const [isFollowBtn, setIsFollowBtn] = useState(false);
  const accessToken = useSelector((state) => state.member.access);

  let num = 0;

  return (
    <div className="ChangePwModalWrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={toggleChangePwModal}>
          <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
            <div className="centerWrapper">
              <div className="inputLayout">
                <input type="password" placeholder="비밀번호를 입력해주세요" />
              </div>
              <div className="inputLayout">
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요"
                />
              </div>
              <div>
                <button>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePwModal;
