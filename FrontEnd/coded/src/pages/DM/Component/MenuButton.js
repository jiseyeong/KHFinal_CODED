import React, { useState } from 'react';
import { styled } from 'styled-components';
import ReportModal from '../../../component/Report/component/ReportModal';

function MenuButton(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ReportModalOpen, setReportModalOpen] = useState(false);
  const disconnect = props.disconnect;

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // 모달 상태를 반전시킴 (true이면 false로, false이면 true로)
  };

  const handleReportModalToggle = () => {
    setReportModalOpen((prev) => !prev);
  };

  return (
    <MenuButtonContainer style={{width:"20%",textAlign:"center"}}>
      <button className="moreBtn" onClick={handleModalToggle}>
        More
      </button>
      {isModalOpen && (
        // <div className="modal">
        <div className="modal-content">
          <ul className="ul">
            <li className="liReport" onClick={handleReportModalToggle}>
              신고
            </li>
            <li
              className="li"
              onClick={() => {
                handleModalToggle();
                disconnect();
              }}
            >
              나가기
            </li>
          </ul>
          {/* <button
            className="closeBtn2"
            onClick={() => {
              setReportModalOpen(false);
            }}
          >
            닫기
          </button> */}
          {/* </div> */}
        </div>
      )}
      {ReportModalOpen && (
        <ReportModal
          // feedPostId={}
          // feedPostId를 넘겨야 신고 기능 구현됩니다.
          onReportView={handleReportModalToggle}
        />
      )}
    </MenuButtonContainer>
  );
}

const MenuButtonContainer = styled.div`
  .moreBtn {
    margin-top:7px;
    margin-left: 35px;
    width: 50px;
    height: 30px;
    border: none;
    background-color: white;
    border-radius: 5px;
  }
  .moreBtn:hover {
    cursor: pointer;
    color:#ff0066; 
  }
  .ul {
    list-style: none;
    background-color: white;
    margin-left: 15px;
    padding: 0px;
    width: 70px;
    margin-top: 30px;
    position: relative;
    top:-20px;
    left:25px;
    border:1px solid silver;
  }
  .li {
    margin: 5px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size:11px;
  }
  .li:hover {
    cursor: pointer;
    color:#ff0066; 
  }
  .closeBtn2 {
    display: none;
  }
  .liReport{display:none;}
`;

export default MenuButton;
