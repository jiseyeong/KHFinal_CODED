import React, { useRef, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import ImageAddButton from '../../../assets/ButtonAsset/ImageAddButton';
import './sendBtn.scss';

function SendBtn(props) {
  const Send = props.Send;
  const imageSend = props.imageSend;
  const DMRoom = props.DMRoom;
  const sendRef = useRef(null);
  const [upLoadForm, setUploadForm] = useState(false);

  // DMRoom 지정하지 않으면 입력 불가
  const isReadOnly = Object.keys(DMRoom).length !== 0 ? false : true;

  const sendToServer = (e) => {
    if (e.target.value !== undefined) {
      Send(sendRef.current.value);
      // 입력 필드 초기화
      sendRef.current.value = '';
    }
  };

  const sentToServerByEnter = (e) => {
    if (e.key === 'Enter' && e.target.value !== undefined) {
      Send(sendRef.current.value);
      // 입력 필드 초기화
      sendRef.current.value = '';
    }
  };

  return (
    <SendBtnContainer>
      <IconLayout
        onClick={() => {
          setUploadForm((prev) => {
            return !prev;
          });
        }}
      >
        <ImageAddButton />
      </IconLayout>
      {upLoadForm && !isReadOnly && (
        <ImageUpload
          setUploadForm={setUploadForm}
          Send={Send}
          imageSend={imageSend}
        />
      )}
      <SendChat
        type="text"
        ref={sendRef}
        onKeyUp={sentToServerByEnter}
        readOnly={isReadOnly}
      />
      <SendButton onClick={sendToServer}>Send</SendButton>
    </SendBtnContainer>
  );
}

const ImageUpload = ({ setUploadForm, imageSend }) => {
  const [file, setFile] = useState([]); //파일
  const [imgBase64, setImgBase64] = useState(null); // 파일 base64
  const [inputFileButtonStyle, setInputFileButtonStyle] = useState({
    display: 'inline-block',
  });
  const [uploadStats, setUploadStats] = useState(false);
  const fileRef = useRef();

  // 취소 버튼 클릭 시
  const Cancelpicture = () => {
    setImgBase64(null);
    setFile(null);
  };

  // 이미지 변경 시 적용,
  const handleChangeFile = (event) => {
    setFile(event.target.files); //파일 갯수 추가

    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // 1. 파일을 읽어 버퍼에 저장.
      // 파일 상태 업데이트
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행.
        const base64 = reader.result;
        if (base64) {
          // 문자 형태로 저장
          var base64Sub = base64.toString();
          // 배열 state 업데이트
          setImgBase64(base64Sub);
        }
      };
    }
  };

  const submit = () => {
    imageSend(file);
    // 입력 필드 초기화
    setUploadForm(false);
  };

  return (
    <div className="chatImageUploadForm">
      <div className="imagePreview">
        {/* imgBase64 사진들 */}
        {imgBase64 && (
          <div className="uploadedImage">
            <div className="imageLayout">
              <img
                src={imgBase64}
                onClick={() => {
                  Cancelpicture();
                }}
              />
            </div>
          </div>
        )}

        {!imgBase64 && (
          <label
            className="inputFileButton"
            id="input-file-button"
            htmlFor="input-file"
            style={{
              ...inputFileButtonStyle,
              display:
                inputFileButtonStyle.display !== 'none'
                  ? 'inline-block'
                  : 'none',
            }}
          >
            <div className="labelIconLayout">
              <svg
                height="30"
                viewBox="0 0 20 20"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.12412 2C7.55707 2 7.03849 2.31977 6.78386 2.82643L6.19437 3.9994H4.50488C3.12417 3.9994 2.00488 5.11868 2.00488 6.4994V14.5C2.00488 15.8807 3.12417 17 4.50488 17H9.59989C9.43795 16.6832 9.30582 16.3486 9.20722 16H4.50488C3.67646 16 3.00488 15.3284 3.00488 14.5V6.4994C3.00488 5.67097 3.67646 4.9994 4.50488 4.9994H6.50268C6.69169 4.9994 6.86455 4.89281 6.94943 4.72392L7.67736 3.27548C7.76224 3.10659 7.9351 3 8.12412 3H11.8883C12.0777 3 12.2509 3.10702 12.3356 3.27643L13.0587 4.72296C13.1433 4.89238 13.3165 4.9994 13.5059 4.9994H15.5049C16.3333 4.9994 17.0049 5.67097 17.0049 6.4994V9.60212C17.3627 9.78548 17.6978 10.0069 18.0049 10.261V6.4994C18.0049 5.11869 16.8856 3.9994 15.5049 3.9994H13.8149L13.23 2.8293C12.976 2.32106 12.4565 2 11.8883 2H8.12412Z"
                  fill="#212121"
                />
                <path
                  d="M10.0002 6.00003C11.8763 6.00003 13.4508 7.29169 13.8828 9.03426C13.5457 9.07192 13.2178 9.14004 12.902 9.23581C12.564 7.94911 11.3929 7.00003 10.0002 7.00003C8.34333 7.00003 7.00018 8.34318 7.00018 10C7.00018 11.3928 7.94927 12.5639 9.23598 12.9018C9.14021 13.2177 9.07209 13.5456 9.03444 13.8827C7.29186 13.4507 6.00018 11.8762 6.00018 10C6.00018 7.79089 7.79104 6.00003 10.0002 6.00003Z"
                  fill="#212121"
                />
                <path
                  className="plus"
                  d="M19.0002 14.5C19.0002 16.9853 16.9855 19 14.5002 19C12.0149 19 10.0002 16.9853 10.0002 14.5C10.0002 12.0147 12.0149 10 14.5002 10C16.9855 10 19.0002 12.0147 19.0002 14.5ZM15.0002 12.5C15.0002 12.2239 14.7763 12 14.5002 12C14.224 12 14.0002 12.2239 14.0002 12.5V14H12.5002C12.224 14 12.0002 14.2239 12.0002 14.5C12.0002 14.7761 12.224 15 12.5002 15H14.0002V16.5C14.0002 16.7761 14.224 17 14.5002 17C14.7763 17 15.0002 16.7761 15.0002 16.5V15H16.5002C16.7763 15 17.0002 14.7761 17.0002 14.5C17.0002 14.2239 16.7763 14 16.5002 14H15.0002V12.5Z"
                  fill="#212121"
                />
              </svg>
            </div>
          </label>
        )}
        <input
          type="file"
          id="input-file"
          onChange={handleChangeFile}
          style={{ display: 'none' }}
          ref={fileRef}
          accept="image/gif,image/jpeg,image/png"
        ></input>
      </div>
      {imgBase64 && (
        <button
          className="sendBtn"
          onClick={() => {
            submit();
          }}
        >
          send
        </button>
      )}
    </div>
  );
};

const SendBtnContainer = styled.div`
  height: 8%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SendChat = styled.input`
  width: 85%;
  height: 30px;
  margin: 10px 10px 0px;
  font-size: 15px;
  color: #222222;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`;
const SendButton = styled.button`
  margin-top: 10px;
  width: 13%;
  height: 30px;
  margin-left: auto;
  color: white;
  border: none;
  background-color: #ff0066;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 70%;
  }
`;

const IconLayout = styled('div')`
  width: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export default SendBtn;
