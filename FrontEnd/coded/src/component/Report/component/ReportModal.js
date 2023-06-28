import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
// import "../styles/common.scss";
// import "../styles/reset.scss";
import './ReportModal.scss';
//import Image from "../image/326548_bookmark_icon.png";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import FeedCommentList from '../../FeedPostDetail/FeedCommentList';
import {
  OptionBox,
  Like,
  ScrapImage,
} from '../../../assets/ModalAsset/ModalAsset';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
import { setNonMember } from '../../../modules/Redux/navbarSetting';

const ImageLayout = styled('div')`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportH3 = styled('h3')`
  width: 100%;
  font-size: 26px;
`;

const Reportdiv = styled('div')`
  margin: 0.5rem;
  color: #222;
  font-size: 20px;
  font-weight: bold;
  color: silver;
  text-align: center;
`;

const Reportdiv2 = styled('div')`
  margin-top: 20px;
  color: #ff0066;
  font-size: 14px;
  font-weight: 500;
`;

const EtcArea = styled('textarea')`
  padding: 4px;
  resize: none;
`;

const Buttonok = styled('button')`
  font-size: 13px;
  border-radius: 13px;
  position: relative;
  margin-right: 8px;

  width: 72px;
  height: 30px;
  background-color:black;
  border:none;
  color:white;
  cursor:pointer;

`;



function ReportModal({ onReportView }) {
  const textread = useRef();
  const [text, setText] = useState('');
  const [reportType, setReportType] = useState('a');

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);

  const handleReportNumber = (ev) => {
    setReportType(ev.target.value);
  };

  const handleEtcContents = (ev) => {
    setText(ev.target.value);
    console.log(ev.target.value);
  };

  const handlePopupCancel = () => {
    onReportView();
  }



  useEffect(() => {
      if (accessToken) {
        // 1. 토큰 값으로 나의 고유 넘버를 반환
        axios({
          url: '/auth/userNo',
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((resp) => {
          })
          // 2. 고유 넘버로 유저 정보 반환
          .catch((error) => {
            console.log(error);
          });
      } else {
        denyAccess();
      }
  }, [accessToken]);




  const handlePopupok = () => {
    console.log("abc")
    axios({
      url: '/ReportOk',
      method: 'post',
      data: {
        type:reportType,
        text:text
      },
    }).then((resp) => {
      
    }).catch((error)=>{
      console.log(error);
    })
  }

  const Buttonok2 = styled('button')`
  font-size: 13px;
  font-weight: bold;
  margin-left: 48px;
  position: relative;
  border-color: gray;
  border-radius: 8px;
  width: 57px;
  height: 27px;
  color: black;
`;
 

  return (
    <div className="reportmodalwrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={onReportView}>
          <div
            className="innerWrapper"
            style={{ flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="closeBtn" onClick={onReportView}>
              x
            </button>
            <ReportH3>REPORT</ReportH3>
            <Reportdiv>신고사유를 선택해주세요</Reportdiv>

            <div className="radioLayout">
              <div className="radios">
                <p>
                  <label>
                    <input
                      type="radio"
                      name="theme"
                      value="a"
                      onChange={handleReportNumber}
                    />
                    개인정보 침해 및 명예훼손 게시물
                  </label>
                </p>
              </div>

              <div>
                <div className="radios">
                  <p>
                    <label>
                      <input
                        type="radio"
                        name="theme"
                        value="b"
                        onChange={handleReportNumber}
                      />
                      불법 광고 게시물
                    </label>
                  </p>
                </div>
              </div>

              <div>
                <div className="radios">
                  <p>
                    <label>
                      <input
                        type="radio"
                        name="theme"
                        value="c"
                        onChange={handleReportNumber}
                      />
                      도배성 게시물
                    </label>
                  </p>
                </div>
              </div>
              <div>
                <div className="radios">
                  <p>
                    <label>
                      <input
                        type="radio"
                        name="theme"
                        value="d"
                        onChange={handleReportNumber}
                      />
                      저작권 침해 게시물
                    </label>
                  </p>
                </div>
              </div>
              <div>
                <div className="radios">
                  <p>
                    <label>
                      <input
                        type="radio"
                        name="theme"
                        value="e"
                        onChange={handleReportNumber}
                      />
                      기타 (직접입력)
                    </label>
                  </p>
                </div>
              </div>
            </div>
            <div>
              {reportType === 'e' ? (
                <EtcArea
                  style={{ padding: '4px' }}
                  rows="7"
                  cols="50"
                  value={text}
                  onChange={handleEtcContents}
                />
              ) : (
                <EtcArea
                  readOnly
                  style={{ pointerEvents: 'none' }}
                  rows="7"
                  cols="50"
                  value={text}
                />
              )}
            </div>
            <br />
            <div>

            <Buttonok onClick={handlePopupok}>확인</Buttonok>
            <Buttonok2 onClick={handlePopupCancel}>취소</Buttonok2>
              <br/>
              <br/>

              <Reportdiv2>
                허위신고를 할 경우 활동에 제한을 받을 수 있습니다. <br />이 점
                유의해주시기 바랍니다.
              </Reportdiv2>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportModal;
