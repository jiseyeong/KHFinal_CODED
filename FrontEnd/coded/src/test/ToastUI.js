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
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };
  const selectRef = useRef();
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
      <div
        className={Styled.yscroll}
        placeholder="내용을 입력해주세요"
        contentEditable="true"
      ></div>
      <br />
      <CreatableSelect 
      isMulti
        options={options}
        ref={selectRef}
      />
      <br />
      <div
        style={{
          border: '1px solid black',
          width: '100%',
          height: '100px',
          overflowX: 'scroll',
          whiteSpace: 'nowrap',
        }}
      >
        
        {imgBase64.map((item) => {
          return (
            <div>
            <img
              src={item}
              style={{ maxHeight: '100%', maxWidth: '100px', float:"left"}}
            ></img>
            </div>
          );
        })}
        
        <label
          className="input-file-button"
          for="input-file"
          style={{
            border: '1px solid black',
            height: '100%',
            display: 'inline-block',
            width: '100px',
            textAlign: 'center',
            lineHeight: '80px',
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
      <br />
    </div>
  );
}

export default ToastUI;
