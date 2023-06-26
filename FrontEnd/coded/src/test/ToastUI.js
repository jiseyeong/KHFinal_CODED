import CreatableSelect from 'react-select/creatable';
import Styled from './ToastUI.module.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function ToastUI() {
  const [file, setFile] = useState(null); //파일
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const handleChangeFile = (event) => {
    console.log(event.target.files);
    setFile(event.target.files);
    setImgBase64([]);

    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행.
          const base64 = reader.result;
          if (base64) {
            // 문자 형태로 저장
            var base64Sub = base64.toString();
            // 배열 state 업데이트
            if (imgBase64.length > 0) {
              // 이미 추가된 사진이 있는 경우
              setImgBase64([...imgBase64, base64Sub]);
            } else {
              // 이미 추가된 사진이 없는 경우
              setImgBase64([base64Sub]);
            }
          }
        };
      }
    }
  };
  const selectRef = useRef();
  const contentRef = useRef();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .request({
        url: '/PostHashs/selectAllPostTagNames',
        type: 'get',
      })
      .then((resp) => {
        const HashTagNameList = resp.data;
        let arrTemp = [];
        HashTagNameList.forEach((hashTag, index) => {
          arrTemp = arrTemp.concat({
            value: hashTag.hashTag,
            label: hashTag.hashTag,
          });
          setOptions([...options, ...arrTemp]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Cancelpicture = (index) => {
    const updatedImgBase64 = [...imgBase64];
    updatedImgBase64.splice(index, 1);
    setImgBase64(updatedImgBase64);
  };

  return (
    <div>
      {/* 좌측창 사진 미리보기 */}
      <div style={{ float: 'left', width: '30%', height: '459px' }}>
        <div
          style={{
            border: '1px solid black',
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
          }}
        >
          {/* imgBase64 사진들 */}
          {imgBase64.map((item) => {
            return (
              <div>
                <button style={{ float: 'right' }} onClick={Cancelpicture}>
                  취소
                </button>
                <div style={{ border: '1px solid black' }}>
                  <img
                    src={item}
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                  />
                </div>
                <div style={{ height: '10px' }}></div>
              </div>
            );
          })}

          <label
            className="input-file-button"
            for="input-file"
            style={{
              border: '1px solid black',
              height: '150px',
              display: 'inline-block',
              width: '100%',
              textAlign: 'center',
              lineHeight: '150px',
            }}
          >
            사진 등록
          </label>
          <input
            type="file"
            id="input-file"
            onChange={handleChangeFile}
            style={{ display: 'none' }}
            accept="image/gif,image/jpeg,image/png"
            multiple
          ></input>
        </div>
      </div>

      {/* 중앙 여백 */}
      <div style={{ float: 'left', width: '3%', height: '459px' }}></div>

      {/* 우측창 게시글 내용 및 해시태그 */}
      <div style={{ float: 'right', width: '67%', height: '459px' }}>
        <div
          className={Styled.yscroll}
          placeholder="내용을 입력해주세요"
          contentEditable="true"
          ref={contentRef}
        ></div>
        <br />
        <CreatableSelect
          isMulti
          options={options}
          ref={selectRef}
          className={Styled.select}
        />
        <br />
      </div>
    </div>
  );
}

export default ToastUI;
