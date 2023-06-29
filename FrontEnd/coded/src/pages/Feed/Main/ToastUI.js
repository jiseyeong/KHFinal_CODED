import CreatableSelect from 'react-select/creatable';
import './ToastUI.scss';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CloseBtn, Rain } from '../../../assets/ModalAsset/IconAsset';
import Select from 'react-select';
import { Temperature } from '../../../assets/ModalAsset/ModalAsset';
import WeatherIcons from '../../../component/WeatherCommon/WeatherIcons';

function ToastUI({ clickdata, setFeedPostInsertOpen }) {
  const [file, setFile] = useState([]); //파일
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [inputFileButtonStyle, setInputFileButtonStyle] = useState({
    display: 'inline-block',
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedpost, setFeedPost] = useState({});
  const [addressList1, setAddressList1] = useState([]);
  const [addressList2, setAddressList2] = useState([]);
  const [addressIndex1, setAddressIndex1] = useState(-1);
  const [addressIndex2, setAddressIndex2] = useState(-1);
  const address = useRef();

  const selectRef = useRef();
  const contentRef = useRef();
  const [options, setOptions] = useState([]);

  const accessToken = useSelector((state) => state.member.access);
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
          setAddress1(response.data.address1);
          setAddress2(response.data.address2);
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
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: 'get',
        url: '/weather/todayNonMem',
        params: {
          time: new Date().getTime(),
        },
      })
        .then((response) => {
          setAddress1(response.data.address1);
          setAddress2(response.data.address2);
          setWeatherMessage(response.data.message);
          setRecentTemp(response.data.today.recent);
          setMinTemp(response.data.today.min);
          setMaxTemp(response.data.today.max);
          if (
            response.data.today.ptyCode == 1 ||
            response.data.today.ptyCode == 2
          ) {
            setWeatherIcon(WeatherIcons.rain);
          } else if (response.data.today.ptyCode == 3) {
            setWeatherIcon(WeatherIcons.snow);
          } else if (response.data.today.ptyCode == 4) {
            setWeatherIcon(WeatherIcons.heavyRain);
          } else {
            if (response.data.today.skyCode == 1) {
              setWeatherIcon(WeatherIcons.sun);
            } else {
              setWeatherIcon(WeatherIcons.cloud);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
          axios.get('/auth/getAddress1List'),
          axios.get('/PostHashs/selectAllPostTagNames'),
        ])
        // 2. 고유 넘버로 유저 정보 반환 후 저장
        // + 1차 주소들 저장

        // 3. 해시 태그의 기존 데이터들 반환
        .then(
          axios.spread((resp1, resp2, resp3) => {
            // 내 정보 + 피드 정보
            const { userNo, address1, address2 } = resp1.data;

            const feedPost = {
              userNo: userNo,
              address1: address1,
              address2: address2,
              writeDate: getCurrentDate(),
            };

            setFeedPost((prev) => {
              return {
                ...prev,
                ...feedPost,
              };
            });

            // 주소 데이터
            let address = [];
            resp2.data.forEach((addressData) => {
              address = address.concat({
                value: addressData,
                label: addressData,
              });
            });
            setAddressList1(address);

            // 해시태그 데이터
            const HashTagNameList = resp3.data;
            let arrTemp = [];
            HashTagNameList.forEach((hashTag) => {
              arrTemp = arrTemp.concat({
                value: hashTag.hashTag,
                label: hashTag.hashTag,
              });
              setOptions([...options, ...arrTemp]);
            });

            // 객체로 리턴
            const obj = { feedpost: feedPost, addressList: address };
            return obj;
          }),
          // 3. 내 정보에 등록된 1차 기본 주소 지정
        )
        .then((obj) => initAddress1(obj))
        .then((obj) => getAddress2(obj))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  // 내 정보에 등록된 1차 기본 주소 지정
  const initAddress1 = (obj) => {
    const { feedpost, addressList } = obj;
    let address1 = {};
    addressList.forEach((item, index) => {
      if (item.value === feedpost.address1) {
        setAddressIndex1(index);
        address1 = item;
      }
    });
    return { feedpost: feedpost, addressList: address1 };
  };

  // 1차 주소를 토대로 2차 주소를 가져옴 (넘겨받은 객체를 통한 주소 가져옴)
  const getAddress2 = (obj) => {
    const { feedpost, addressList } = obj;
    axios
      .get('/auth/getAddress2List', {
        params: {
          address1: addressList.value,
        },
      })
      .then((resp) => {
        let arrTemp = [];
        resp.data.forEach((addressData) => {
          arrTemp = arrTemp.concat({
            value: addressData,
            label: addressData,
          });
        });
        setAddressList2(arrTemp);
        obj = { feedpost: feedpost, addressList: arrTemp };
        initAddress2(obj);
        return obj;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 내 정보에 등록된 2차 기본 주소 지정
  const initAddress2 = (obj) => {
    const { feedpost, addressList } = obj;
    if (addressList.length > 0) {
      addressList.forEach((item, index) => {
        if (item.value === feedpost.address2) {
          setAddressIndex2(index);
          return;
        }
      });
    } else {
      setAddressIndex2(0);
    }
  };

  // 1차 주소 지정에 따른 2차 주소 지정 (target을 통한 지정된 내용 불러오기)
  const setAddress = (target) => {
    setFeedPost((prev) => ({ ...prev, address1: target.value }));
    axios
      .get('/auth/getAddress2List', {
        params: {
          address1: target.value,
        },
      })
      .then((resp) => {
        let arrTemp = [];
        resp.data.forEach((addressData) => {
          arrTemp = arrTemp.concat({
            value: addressData,
            label: addressData,
          });
        });
        address.current.setValue('');
        setAddressList2(arrTemp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const test = () => {
    const formData = new FormData();
    delete feedpost.address1;
    delete feedpost.address2;
    formData.append('dto', feedpost);
    selectRef.current.getValue().forEach((item) => {
      formData.append('hashTag', item.value);
      console.log(item.value);
    });
    for (var i = 0; i < file.length; i++) {
      formData.append('files', file[i]);
      console.log(file[i]);
    }

    // 기후 데이터
    axios({
      method: 'POST',
      url: '/feedpost/feedpost',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((resp) => {
        if (resp.data) {
          alert('등록이 완료되었습니다.');
        }
      })
      .catch((error) => {});
  };

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
              options={options}
              ref={selectRef}
              // onChange={(value) => setSelectedOptions(value)}
            />
          </div>

          {/* <div className="weatherSelectLayout">
            <div className="select1">
              {addressList1.length > 0 && (
                <Select
                  placeholder="지역1"
                  options={addressList1}
                  defaultValue={addressList1[addressIndex1]}
                  onChange={setAddress2}
                  isDisabled
                />
              )}
            </div>
            <div className="select2">
              {addressList2.length > 0 && (
                <Select
                  ref={address2}
                  placeholder="지역2"
                  options={addressList2}
                  defaultValue={addressList2[addressIndex2]}
                  onChange={(target) => {
                    setAddress2((prev) => ({
                      ...prev,
                      address2: target.value,
                    }));
                  }}
                  isDisabled
                />
              )}
            </div>
          </div>

          <div className="dateLayout">
            {feedpost.writeDate !== undefined && (
              <input
                type="date"
                value={feedpost.writeDate}
                onChange={(e) => {
                  setFeedPost((prev) => ({
                    ...prev,
                    writeDate: e.target.value,
                  }));
                }}
              />
            )}
          </div> */}

          <div className="weatherResultLayout">
            <div className="todayName">{`${feedpost.writeDate} ${address1}, ${address2} 날씨`}</div>
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
              <button onClick={test}>작성</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastUI;
