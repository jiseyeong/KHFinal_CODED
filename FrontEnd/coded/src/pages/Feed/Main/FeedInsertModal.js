import CreatableSelect from 'react-select/creatable';
import './FeedInsertModal.scss';
import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Rain } from '../../../assets/ModalAsset/IconAsset';
import Select from 'react-select';
import { Temperature } from '../../../assets/ModalAsset/ModalAsset';
import WeatherIcons from '../../../component/WeatherCommon/WeatherIcons';
import { setNonMember } from '../../../modules/Redux/navbarSetting';

function FeedInsertModal({ setFeedPostInsertOpen }) {
  const [file, setFile] = useState([]); //파일
  const [newfile, setNewfile] = useState([]);
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [inputFileButtonStyle, setInputFileButtonStyle] = useState({
    display: 'inline-block',
  });
  const [feedpost, setFeedPost] = useState({});
  const address = useRef();

  const selectRef = useRef();
  const contentRef = useRef();
  const [options, setOptions] = useState([]);

  const accessToken = useSelector((state) => state.member.access);
  const dispatch = useDispatch();
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);
  const bodyImageRef = useRef();

  //날씨
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherMessage, setWeatherMessage] = useState('');
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [recentTemp, setRecentTemp] = useState(0);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [weatherName, setWeatherName] = useState('');

  useEffect(() => {
    if (accessToken) {
      axios({
        method: 'get',
        url: '/weather/today',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          time: new Date().getTime(),
        },
      })
        .then((response) => {
          setWeatherMessage(response.data.message);
          setRecentTemp(response.data.today.recent);
          setMinTemp(response.data.today.min);
          setMaxTemp(response.data.today.max);
          if (
            response.data.today.ptyCode == 1 ||
            response.data.today.ptyCode == 2
          ) {
            setWeatherIcon(WeatherIcons.rain);
            setWeatherName('Rainy');
          } else if (response.data.today.ptyCode == 3) {
            setWeatherIcon(WeatherIcons.snow);
            setWeatherName('Snowy');
          } else if (response.data.today.ptyCode == 4) {
            setWeatherIcon(WeatherIcons.heavyRain);
            setWeatherName('Heavy Rain');
          } else {
            if (response.data.today.skyCode == 1) {
              setWeatherIcon(WeatherIcons.sun);
              setWeatherName('Sunny');
            } else {
              setWeatherIcon(WeatherIcons.cloud);
              setWeatherName('Cloudy');
            }
          }
          setFeedPost((prev) => ({
            ...prev,
            writeTemp: response.data.today.max,
            writeTempRange: response.data.today.max - response.data.today.min,
            writePtyCode: response.data.today.ptyCode,
            writeSkyCode: response.data.today.skyCode,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      denyAccess();
    }
  }, [accessToken]);

  // 현재 날짜 데이터 받아오기
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1, 두 자리 숫자로 맞추기 위해 padStart 사용
    const day = String(today.getDate()).padStart(2, '0'); // 두 자리 숫자로 맞추기 위해 padStart 사용
    return `${year}년 ${month}월 ${day}일`;
  }

  // 첫 마운트 시 초기 데이터 받아오기
  useEffect(() => {
    if (accessToken) {
      // 1. 토큰 값으로 나의 고유 넘버를 반환
      // + DB 내 1차 주소들을 가져옴
      axios
        .all([
          axios.get('/auth/userDTO', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          axios.get('/PostHashs/selectAllPostTagNames'),
        ])
        // 2. 고유 넘버로 유저 정보 반환 후 저장
        // + 1차 주소들 저장

        // 3. 해시 태그의 기존 데이터들 반환
        .then(
          axios.spread((resp1, resp2) => {
            // 내 정보 + 피드 정보
            const { userNo, address1, address2 } = resp1.data;

            setFeedPost((prev) => {
              return {
                ...prev,
                userNo: userNo,
                address1: address1,
                address2: address2,
                writeDate: getCurrentDate(),
              };
            });

            // 해시태그 데이터
            const HashTagNameList = resp2.data;
            let arrTemp = [];
            HashTagNameList.forEach((hashTag) => {
              arrTemp = arrTemp.concat({
                value: hashTag.hashTag,
                label: hashTag.hashTag,
              });
              setOptions([...options, ...arrTemp]);
            });
          }),
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  // 이미지 변경 시 적용,
  const [newimgBase64, setNewimgBase64] = useState([]);
  const newfileRef = useRef(null);
  const [addfiles, setaddfiles] = useState([]);
  const [forEnd, setForEnd] = useState(false);

  const handleChangeFile = (event) => {
    const regexImage = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    const addfile = event.target.files;

    if (file.length + addfile.length == 10) {
      setInputFileButtonStyle({ display: 'none' });
    }

    if (file.length + addfile.length > 10) {
      alert('사진은 최대 10장까지 첨부 가능합니다');
      setFile([...file]);
      setImgBase64([...imgBase64]);
      return;
    } else {
      for (var i = 0; i < addfile.length; i++) {
        if (addfile[i]) {
          const currentfile = addfile[i];
          let reader = new FileReader();
          if (!regexImage.test(event.target.files[0].name)) {
            alert('이미지 파일만 등록이 가능합니다.');
            return;
          }

          if (event.target.files[0].size > 20000000) {
            alert('20MB 이하의 이미지 파일만 등록이 가능합니다.');
            return;
          }
          reader.readAsDataURL(addfile[i]); // 1. 파일을 읽어 버퍼에 저장.
          // 파일 상태 업데이트
          reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행.
            const base64 = reader.result;
            if (base64) {
              setaddfiles((prevAddfiles) => [...prevAddfiles, currentfile]);
              setNewimgBase64((prevNewimgBase64) => [
                ...prevNewimgBase64,
                base64,
              ]);
            }
            // 문자 형태로 저장
            // 배열 state 업데이트
          };
        }
      }
      setForEnd(true);
    }
  };

  useEffect(() => {}, [addfiles]);

  useEffect(() => {
    const imageJB = imgBase64.some((e) => newimgBase64.includes(e));
    if (imageJB && forEnd) {
      alert('같은 사진이 존재합니다.');
      setFile([...file]);
      setNewimgBase64([]);
      setaddfiles([]);
      newfileRef.current.value = null;
    }
    if (forEnd) {
      setForEnd(false);
    }
  }, [forEnd]);

  useEffect(() => {
    const imageJB = imgBase64.some((e) => newimgBase64.includes(e));
    if (imageJB) {
      setForEnd(true);
    } else if (newimgBase64.length > 0) {
      setImgBase64((prevImgBase64) => [...prevImgBase64, ...newimgBase64]);
      setFile([...file, ...addfiles]);
      setaddfiles([]);
      setNewimgBase64([]);
      newfileRef.current.value = null;
    }
  }, [newimgBase64, imgBase64]);

  // 취소 버튼 클릭 시
  const Cancelpicture = (index) => {
    const updatedfile = file;
    const updatedImgBase64 = [...imgBase64];
    if (bodyImageRef.current.src === updatedImgBase64[index]) {
      setBodyImage('');
    }
    updatedImgBase64.splice(index, 1);
    updatedfile.splice(index, 1);
    setImgBase64(updatedImgBase64);
    setFile(updatedfile);
    if (updatedImgBase64.length < 10) {
      setInputFileButtonStyle({ display: 'inline-block' });
    }
  };

  // 이미지 클릭시 메인 이미지 란에 이미지 띄워주기
  const [bodyImage, setBodyImage] = useState('');
  const viewImage = (e) => {
    if (bodyImage !== e.target.src) {
      setBodyImage(e.target.src);
    } else {
      setBodyImage('');
    }
  };

  useEffect(() => {
    if (file.length > 0) {
    }
  }, [file]);
  useEffect(() => {}, [imgBase64]);
  // 폼 입력
  const insertForm = () => {
    if (feedpost.body === '' || feedpost.body === undefined) {
      alert('내용을 입력해주세요');
      return;
    }
    if (selectRef.current.getValue().length === 0) {
      alert('최소 한 개 이상의 해시태그를 입력해 주세요');
      return;
    }
    if (file.length === 0) {
      alert('최소 한 장 이상의 사진을 첨부해 주세요');
      return;
    }

    const formData = new FormData();
    formData.append('userNo', feedpost.userNo);
    formData.append('body', feedpost.body);
    formData.append('writeTemp', feedpost.writeTemp);
    formData.append('writeTempRange', feedpost.writeTempRange);
    formData.append('writePtyCode', feedpost.writePtyCode);
    formData.append('writeSkyCode', feedpost.writeSkyCode);
    selectRef.current.getValue().forEach((item) => {
      formData.append('hashTag', item.value);
    });
    for (var i = 0; i < file.length; i++) {
      formData.append('files', file[i]);
    }

    axios({
      method: 'POST',
      url: '/feedpost/insertFeedPost',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((resp) => {
        alert('등록이 완료되었습니다 :)');
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [inputCount, setInputCount] = useState(0);
  const inputCountRef = useRef();

  const onTextareaHandler = (e) => {
    const value = e.target.value.length;
    const value2 = 200 - value;
    setInputCount(value2);
    if (value2 >= 0) {
      inputCountRef.current.style.color = 'blue';
    } else {
      inputCountRef.current.style.color = 'red';
    }
  };

  const [select, setSelect] = useState([]);
  return (
    <div className="toastUIContainer">
      <div className="leftWrapper">
        <div className="bodyImageLayout">
          {bodyImage && bodyImage !== '' ? (
            <img ref={bodyImageRef} className="bodyImage" src={bodyImage} />
          ) : imgBase64.length > 0 ? (
            <img ref={bodyImageRef} className="bodyImage" src={imgBase64[0]} />
          ) : (
            <div className="imgText">
              <p>image</p>
            </div>
          )}
        </div>

        <div className="ImagePreviewLayout">
          {/* 좌측창 사진 미리보기 */}
          <div className="imageWrapper">
            <div className="imagePreview">
              {/* imgBase64 사진들 */}
              {imgBase64.map((item, index) => {
                return (
                  <div className="uploadedImage" key={index}>
                    <div className="closeBtnLayout">
                      <button
                        className="closeBtn"
                        onClick={() => {
                          Cancelpicture(index);
                        }}
                      >
                        <p className="closeXBtn">x</p>
                      </button>
                    </div>
                    <div className="imageLayout">
                      <img src={item} onClick={viewImage} />
                    </div>
                    <div style={{ height: '10px' }}></div>
                  </div>
                );
              })}

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
              <input
                type="file"
                id="input-file"
                onChange={handleChangeFile}
                ref={newfileRef}
                style={{ display: 'none' }}
                accept="image/gif,image/jpeg,image/png"
                multiple
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className="rightWrapper">
        {/* 우측창 게시글 내용 및 해시태그 */}
        <div className="InfoLayout">
          <div className="PostInfoLayout">
            <textarea
              className="post"
              placeholder="content"
              maxLength="200"
              ref={contentRef}
              onChange={onTextareaHandler}
              onInput={(e) => {
                setFeedPost(() => {
                  return { ...feedpost, body: e.target.value };
                });
              }}
            ></textarea>
            <div className="inputCount" ref={inputCountRef}>
              {inputCount}
            </div>
          </div>
          <div className="hashLayout">
            <CreatableSelect
              placeholder="hashtag"
              isMulti
              value={select}
              options={options}
              ref={selectRef}
              onChange={(selectedOptions) => {
                setSelect(selectedOptions);
                setTimeout(() => {
                  if (selectRef.current.getValue().length > 5) {
                    alert('해시태그는 5개까지 입력 가능합니다.');
                    setSelect((prevValues) => prevValues.slice(0, -1));
                  }
                }, 100);
              }}
            />
          </div>

          <div className="weatherResultLayout">
            <div className="todayName">{`${feedpost.writeDate} ${feedpost.address1}, ${feedpost.address2} 날씨`}</div>
            <div className="todaySky">
              {weatherIcon} {weatherName}
            </div>
            <div className="todayTemp">
              <div className="maxTemp">최고기온 : {maxTemp}°</div>
              <div className="tempMessage">{weatherMessage}</div>
            </div>
          </div>
          <div className="btnWrapper">
            <div className="btnLayout">
              <button onClick={insertForm}>upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedInsertModal;
