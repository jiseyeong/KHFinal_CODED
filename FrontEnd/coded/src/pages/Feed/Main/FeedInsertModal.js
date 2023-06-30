import CreatableSelect from 'react-select/creatable';
import './FeedInsertModal.scss';
import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CloseBtn, Rain } from '../../../assets/ModalAsset/IconAsset';
import Select from 'react-select';
import { Temperature } from '../../../assets/ModalAsset/ModalAsset';
import WeatherIcons from '../../../component/WeatherCommon/WeatherIcons';
import { setNonMember } from '../../../modules/Redux/navbarSetting';

function FeedInsertModal({ setFeedPostInsertOpen }) {
  const [file, setFile] = useState([]); //파일
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
            setWeatherName('비');
          } else if (response.data.today.ptyCode == 3) {
            setWeatherIcon(WeatherIcons.snow);
            setWeatherName('눈');
          } else if (response.data.today.ptyCode == 4) {
            setWeatherIcon(WeatherIcons.heavyRain);
            setWeatherName('소나기');
          } else {
            if (response.data.today.skyCode == 1) {
              setWeatherIcon(WeatherIcons.sun);
              setWeatherName('맑음');
            } else {
              setWeatherIcon(WeatherIcons.cloud);
              setWeatherName('구름많음');
            }
          }
          setFeedPost((prev) => ({
            ...prev,
            writeTemp: response.data.today.min,
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
  const handleChangeFile = (event) => {
    setFile(event.target.files); //파일 갯수 추가

    if (imgBase64.length + event.target.files.length == 10) {
      setInputFileButtonStyle({ display: 'none' });
    }

    if (imgBase64.length + event.target.files.length > 10) {
      alert('사진은 최대 10개까지 밖에 안들어갑니다.');
      setImgBase64([...imgBase64]);
      return;
    } else {
      for (var i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i]) {
          console.log(event.target.files[i].size);
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

  // 취소 버튼 클릭 시
  const Cancelpicture = (index) => {
    const updatedImgBase64 = [...imgBase64];
    if (bodyImageRef.current.src === updatedImgBase64[index]) {
      setBodyImage('');
    }
    updatedImgBase64.splice(index, 1);
    setImgBase64(updatedImgBase64);
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
      console.log(file[0].size);
    }
  }, [file]);
  // 폼 입력
  const insertForm = () => {
    if (feedpost.body === '' || feedpost.body === undefined) {
      alert('내용을 입력해 주세요.');
      return;
    }
    if (selectRef.current.getValue().length === 0) {
      alert('최소 한 개 이상의 해시 태그를 입력해 주세요.');
      return;
    }
    if (file.length === 0) {
      alert('최소 한 개 이상의 사진을 첨부해 주세요.');
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
        alert('등록이 완료되었습니다.');
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div>이미지를 넣어주세요</div>
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
                    <CloseBtn
                      onClick={() => {
                        Cancelpicture(index);
                      }}
                    />
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
                <div className="labelText">사진을 등록해주세요</div>
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
        </div>
      </div>

      <div className="rightWrapper">
        {/* 우측창 게시글 내용 및 해시태그 */}
        <div className="InfoLayout">
          <div className="PostInfoLayout">
            <textarea
              className="post"
              placeholder="내용을 입력해주세요"
              ref={contentRef}
              onInput={(e) => {
                setFeedPost(() => {
                  return { ...feedpost, body: e.target.value };
                });
              }}
            ></textarea>
          </div>
          <div className="hashLayout">
            <CreatableSelect
              placeholder="해시태그 추가"
              isMulti
              value={select}
              options={options}
              ref={selectRef}
              onChange={(selectedOptions) => {
                setSelect(selectedOptions);
                setTimeout(() => {
                  if (selectRef.current.getValue().length > 5) {
                    alert('해시 태그는 5개 까지 입력 가능합니다.');
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
              <div className="minTemp">{weatherMessage}</div>
            </div>
          </div>

          <div className="btnWrapper">
            <div className="btnLayout">
              <button
                onClick={() => {
                  setFeedPostInsertOpen(false);
                }}
              >
                취소
              </button>
              <button onClick={insertForm}>작성</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedInsertModal;