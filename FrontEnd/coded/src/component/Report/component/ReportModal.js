import React, { Component, useEffect, useState } from 'react';
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

function ReportModal({ onReportView }) {
  return (
    
    <div className="reportmodalwrapper">
      <div className="mainWrapper">
        <div className="modalWrapper" onClick={onReportView}>
          <div className="innerWrapper" onClick={(e) => e.stopPropagation()}>
            
            <div>aa</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReportModal;
