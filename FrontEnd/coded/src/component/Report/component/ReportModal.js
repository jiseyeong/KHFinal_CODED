import React, { Component, useEffect, useRef, useState } from 'react';
// import "../styles/common.scss";
// import "../styles/reset.scss";
import './ReportModal.scss';
//import Image from "../image/326548_bookmark_icon.png";
import { useSelector } from 'react-redux';
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

const ImageLayout = styled('div')`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportH3 = styled('h3')`
  width: 100%;
  text-align: center;
  font-size: 26px;
  color: white;
  background-color: black;
`;

const Reportdiv = styled('div')`
  font-size: 20px;
  font-weight: bold;
`;
const Reportdiv2 = styled('div')`
  font-size: 15px;
  font-weight: bold;
`;

function ReportModal({ onReportView }) {
  const textread = useRef();
  const [text, setText] = useState('');
  const [reportType, setReportType] = useState('a');

  return (
    <div className="reportmodalwrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={onReportView}>
          <div
            className="innerWrapper"
            style={{ flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ReportH3>REPORT</ReportH3>
            <br></br>
            <br></br>
            <br></br>
            <Reportdiv>신고사유를 선택해주세요.</Reportdiv>
            <br></br>
            <br></br>
            <br></br>
            <div>
              <label>
                <input type="radio" name="theme" value="a" />
                개인정보 침해 및 명예훼손 게시물
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="theme" value="b" />
                불법 광고 게시물
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="theme" value="c" />
                도배성 게시물
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="theme" value="d" />
                저작권 침해 게시물
              </label>
            </div>
            <div>
              <label>
                <input type="radio" name="theme" value="e" />
                기타 (직접입력)
              </label>
            </div>
            <br></br>
            <div>
              <textarea rows="7" cols="50" value={text} />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
              <Reportdiv2>
                {' '}
                허위신고를 할 경우 신고자의 활동에 제한을 받을 수 있습니다.{' '}
                <br />이 점 유의해 주시기 바랍니다.
              </Reportdiv2>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportModal;
