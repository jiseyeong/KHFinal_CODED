import CreatableSelect from 'react-select/creatable';
import './ToastUI.scss';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Rain } from '../../../assets/ModalAsset/IconAsset';
import { Temperature } from '../../../assets/ModalAsset/ModalAsset';



const FeedUpdate = ({ clickdata }) => {
  const [file, setFile] = useState([]); //파일
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [CopyimgBase64, setCopyImgBase64] = useState([]); // 파일 보여지는것만
  const [contentbody, setContentbody] = useState();
  const [inputFileButtonStyle, setInputFileButtonStyle] = useState({
    display: 'inline-block',
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedpost, setFeedPost] = useState({});
  const [options, setOptions] = useState([]);
  const selectRef = useRef();
  const contentRef = useRef();

  const accessToken = useSelector((state) => state.member.access);

  //  토큰 가져오는거 첫번째로
  useEffect(() => {
    if (accessToken) {
      // 1. 토큰 값으로 나의 고유 넘버를 반환
      axios({
        url: '/auth/userNo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        // 2. 고유 넘버로 유저 정보 반환
        .then((resp) => {
          //   console.log(resp.data);
          setFeedPost(() => {
            return { ...feedpost, userNo: resp.data };
          });
          // userNo = resp.data;
          // return userNo;
          console.log('1');
        })
        // .then(getUserData(userNo))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  //   태그네임 가져오는거 두번째
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
        console.log('2');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   /feedpost/updatefeed 데이터를 가져와야됨 세번째
  useEffect(() => {
    axios({
      url: '/feedpost/updatefeed',
      method: 'get',
      params: {
        userNo: 18,
        feedpostId: 295,
      },
    })
      .then((resp) => {
        const data = resp.data;
        // console.log(data);
        // console.log(data.photoList); //아무것도 안넣었기 때문에 빈배열

        data.hashTagList.forEach((item) => {
          let temp = { value: item.hashTag, label: item.hashTag };
          setSelectedOptions((preview) => [...preview, temp]);
        });

        data.photoList
          .forEach((item) => {
            setCopyImgBase64((preview) => [...preview, item]);
            setImgBase64((preview) => [...preview, item]);
          })

          // console.log(data.feedPost); //객체로 나옴
          // console.log(data.feedPost.body); //test
          setContentbody(data.feedPost.body);
        console.log('3');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  토큰 가져오는거 1
  useEffect(() => {
    if (accessToken) {
      // 1. 토큰 값으로 나의 고유 넘버를 반환
      axios({
        url: '/auth/userNo',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        // 2. 고유 넘버로 유저 정보 반환
        .then((resp) => {
          //   console.log(resp.data);
          setFeedPost(() => {
            return { ...feedpost, userNo: resp.data };
          });
          // userNo = resp.data;
          // return userNo;
        })
        // .then(getUserData(userNo))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  // 데이터 서버로 보내는거
  useEffect(() => {
    const formData = new FormData();
    if (clickdata) {
      setImgBase64([...CopyimgBase64]);
      console.log(contentRef.current.innerText);
      console.log(CopyimgBase64.length)
      console.log(imgBase64.length);
      selectedOptions.forEach((option) => {
        formData.append('HashTag', option.value);
        console.log(option.value);
      });
      console.log(feedpost);
      formData.append('userNo', feedpost.userNo);
      formData.append('body', feedpost.body);
      for (var i = 0; i < file.length; i++) {
        formData.append('files', file[i]);
      }
      axios({
        method: 'Put',
        url: '/feedpost/updatefeed',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
        .then((resp) => {
          resp.data;
        })
        .catch((error) => {});
    }
  }, [clickdata]);

  const handleChangeFile = (event) => {
    setFile(event.target.files); //파일 갯수 추가

    if (imgBase64.length + event.target.files.length == 10) {
      setInputFileButtonStyle({ display: 'none' });
    }

    if (imgBase64.length + event.target.files.length > 10) {
      alert('사진은 최대 10개까지 밖에 안들어갑니다.');
      setImgBase64([...imgBase64]);
      console.log(imgBase64.length + event.target.files.length);
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
              setCopyImgBase64((CopyimgBase64) => [
                ...CopyimgBase64,
                base64Sub,
              ]);
              //   setImgBase64((imgBase64) => [...imgBase64, base64Sub]); // 찐데이터
            }
          };
        }
      }
    }
  };

  const Cancelpicture = (index) => {
    const updatedImgBase64 = [...CopyimgBase64];
    updatedImgBase64.splice(index, 1);
    setCopyImgBase64(updatedImgBase64);
    if (updatedImgBase64.length < 10) {
      setInputFileButtonStyle({ display: 'inline-block' });
    }
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
          {/* imgBase64확인되면 삭제 CopyimgBase64보여지는거 사진들 */}
          {CopyimgBase64.map((item, index) => {
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
              display:
                inputFileButtonStyle.display !== 'none'
                  ? 'inline-block'
                  : 'none',
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
          // className={Styled.yscroll}
          placeholder="내용을 입력해주세요"
          contentEditable
          ref={contentRef}
          onInput={(e) => {
            setFeedPost(() => {
              return { ...feedpost, body: e.target.innerText };
            });
          }}
        >
          {contentbody}
        </div>
        <br />
        <CreatableSelect
          isMulti
          options={options}
          ref={selectRef}
          onChange={(value) => setSelectedOptions(value)}
          // className={Styled.select}
          defaultValue={selectedOptions}
        />
        <br />
      </div>
    </div>
  );
};

export default FeedUpdate;