import CreatableSelect from 'react-select/creatable';
import Styled from './ToastUI.module.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function ToastUI() {
  
  const [file, setFile] = useState(null); //파일
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [inputFileButtonStyle, setInputFileButtonStyle] = useState({ display: "inline-block" });

  const handleChangeFile = (event) => {
    setFile(event.target.files); //파일 갯수 추가

    if (imgBase64.length + event.target.files.length == 10) {
      setInputFileButtonStyle({ display: "none" });
    }
    

    if (imgBase64.length + event.target.files.length > 10) {
      alert('사진은 최대 10개까지 밖에 안들어갑니다.');
      setImgBase64([...imgBase64]);
      console.log(imgBase64.length + event.target.files.length)
      return;
    } else {
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
              setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
            }
          };
        }
      }
    }
  };

  const Cancelpicture = (index) => {
    const updatedImgBase64 = [...imgBase64];
    updatedImgBase64.splice(index, 1);
    setImgBase64(updatedImgBase64);
    if (updatedImgBase64.length < 10) {
      setInputFileButtonStyle({ display: "inline-block" });
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
          {imgBase64.map((item, index) => {
            return (
              <div>
                <button
                  style={{ float: 'right' }}
                  onClick={() => {
                    Cancelpicture(index);
                  }}
                >
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
            id="input-file-button"
            htmlFor="input-file"
            style={{
              ...inputFileButtonStyle,
              border: '1px solid black',
              height: '150px',
              display: inputFileButtonStyle.display !== 'none' ? 'inline-block' : 'none',
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
