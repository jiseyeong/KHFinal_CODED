import React, { useState } from 'react';
import { styled } from 'styled-components';

function MenuButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // 모달 상태를 반전시킴 (true이면 false로, false이면 true로)
  };

  
  const MenuButton = styled('div')`
  
    .moreBtn{margin-top:15px; margin-left:20px; width:50px; height:30px;
        border:none; background-color:white; border-radius:5px;}
    .moreBtn:hover{cursor:pointer;}
    .ul{list-style: none; background-color:white; margin-left:15px; padding:0px;
    width:60px; margin-top:30px; border-radius:10px;}
    .li{margin:5px; text-align:center;}
    .li:hover{cursor:pointer;}
    .closeBtn{display:none;}
  `

  return (
    <MenuButton>
      <button className='moreBtn' onClick={handleModalToggle}>More</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <ul className='ul'>
              <li className='li'>신고</li>
              <li className='li'>나가기</li>
            </ul>
            <button className='closeBtn' onClick={handleModalToggle}>닫기</button>
          </div>
        </div>
      )}
    </MenuButton>
  );
}
export default MenuButton;