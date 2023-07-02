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
    <MenuButtonContainer>
      <button className="moreBtn" onClick={handleModalToggle}>
        More
      </button>
      {isModalOpen && (
        // <div className="modal">
        <div className="modal-content">
          <ul className="ul">
            <li className="li" onClick={handleReportModalToggle}>
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
    margin-top: 15px;
    margin-left: 20px;
    width: 50px;
    height: 30px;
    border: none;
    background-color: white;
    border-radius: 5px;
  }
  .moreBtn:hover {
    cursor: pointer;
  }
  .ul {
    list-style: none;
    background-color: white;
    margin-left: 15px;
    padding: 0px;
    width: 60px;
    margin-top: 30px;
    border-radius: 10px;
    position: relative;
  }
  .li {
    margin: 5px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .li:hover {
    cursor: pointer;
  }
  .closeBtn2 {
    display: none;
  }
`;

export default MenuButton;
