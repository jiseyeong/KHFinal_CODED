import React from 'react';
import { useDispatch } from 'react-redux';
import { setDMSETUSER } from '../../modules/Redux/DMSetting';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../component/Common/ConfirmDialog';

const ChatButton = ({ userNo }) => {
  const dispatch = useDispatch();
  const onSetDMSETUSER = useCallback((userNo) =>
    dispatch(setDMSETUSER(userNo, false), [dispatch]),
  );
  const navi = useNavigate();

  return (
    <div className="dmBtnLayout">
      <svg
        className="dmBtnSvg"
        width="35"
        height="35"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          onSetDMSETUSER(userNo);
          navi('/DMList');
        }}
        style={{ cursor: 'pointer' }}
      >
        <path
          className="dmButton"
          d="M8.53828 2C4.94843 2 2.03828 4.91015 2.03828 8.5C2.03828 9.651 2.33787 10.7334 2.86353 11.6719L2.06779 13.7542C1.7745 14.5216 2.48048 15.2957 3.2716 15.0741L5.75898 14.3774C6.60219 14.7768 7.5448 15 8.53828 15C12.1281 15 15.0383 12.0899 15.0383 8.5C15.0383 4.91015 12.1281 2 8.53828 2ZM3.03828 8.5C3.03828 5.46243 5.50071 3 8.53828 3C11.5758 3 14.0383 5.46243 14.0383 8.5C14.0383 11.5376 11.5758 14 8.53828 14C7.63615 14 6.78612 13.7832 6.03606 13.3993L5.86185 13.3101L3.0019 14.1111L3.97101 11.5753L3.84272 11.3655C3.33247 10.5313 3.03828 9.55079 3.03828 8.5ZM11.5009 18C9.53124 18 7.76622 17.1239 6.57422 15.7402C7.13727 15.8926 7.7266 15.981 8.33392 15.9973C9.22932 16.629 10.3218 17 11.5009 17C12.403 17 13.253 16.7832 14.0031 16.3993L14.1773 16.3101L17.0373 17.1111L16.0681 14.5752L16.1964 14.3655C16.7067 13.5313 17.0009 12.5508 17.0009 11.5C17.0009 10.3455 16.6452 9.27414 16.0374 8.38943C16.0286 7.78165 15.9475 7.19137 15.8024 6.6268C17.1506 7.81779 18.0009 9.5596 18.0009 11.5C18.0009 12.651 17.7013 13.7333 17.1756 14.6719L17.9714 16.7542C18.2646 17.5216 17.5587 18.2957 16.7675 18.0741L14.2802 17.3774C13.437 17.7768 12.4943 18 11.5009 18Z"
          fill="#222"
        />
      </svg>
    </div>
  );
};

export default ChatButton;
