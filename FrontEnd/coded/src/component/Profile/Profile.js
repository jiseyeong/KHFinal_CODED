import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import styles from './Profile.module.scss';
import axios from 'axios';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setNonMember } from '../../modules/Redux/navbarSetting';
import ChangePwModal from './component/ChangePwModal';
import { useNavigate } from 'react-router-dom';

const ProfileTemplateBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin: 0;
  padding: 2rem;
`;

const WhiteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ProfileFormBlock = styled.div`
  width: 60%;
  margin: 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
`;

const ProfileTemplate = () => {
  const [memberInfo, setMemberInfo] = useState({});
  const [addressList1, setAddressList1] = useState([]);
  const [addressList2, setAddressList2] = useState([]);
  const [addressIndex1, setAddressIndex1] = useState(-1);
  const [addressIndex2, setAddressIndex2] = useState(-1);
  const address1 = useRef();
  const address2 = useRef();
  // useSelector로 토큰 값 가져오기
  // 토큰 값을 활용하여 유저 DTO 정보를 가져오기
  // 로그인 정보 출력
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef();
  const [changePwModal, setChangePwModal] = useState(false);
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64

  const navi = useNavigate();

  // 정규식 적용
  const regexId = /^[A-Za-z0-9_]{7,13}$/;
  const regexNickName = /^[가-힣A-Za-z0-9_]{1,8}$/;
  const regexEmail = /^(?=.{1,30}$)[^@\s]+@[^@\s]+\.[^@\s]+$/;

  // 수정 버튼을 눌렀을 때 (readonly 적용 해제, css 변경)
  const handleEditing = () => {
    let edit = document.getElementsByClassName('forEdit');

    // 수정 버튼이 눌린 상태
    if (!editing) {
      Array.from(edit).forEach((item) => {
        item.style.border = '1px solid silver';
      });
      setEditing((prev) => {
        return !prev;
      });
      // 수정 버튼이 눌리지 않은 상태
    } else {
      Array.from(edit).forEach((item) => {
        item.style.border = 'none';
      });
      setEditing((prev) => {
        return !prev;
      });
    }
  };

  // 초기 데이터 가져옴
  const getInitData = () => {
    if (accessToken) {
      // 여러 axios 통신을 한 번에 수행 (axios.all)
      axios
        .all([
          // 1. access토큰으로 내 정보 가져오기
          axios.get('/auth/userWithProfileDTO', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          // 2. DB에 저장된 1차 주소들을 가져옴
          axios.get('/auth/getAddress1List'),
        ])
        .then(
          // axios의 다중 통신 이후 전달받은 데이터는 spread로 다른 매개 변수에 지정
          axios.spread((resp1, resp2) => {
            console.log(resp1);
            const {
              userNo,
              userId,
              userNickName,
              email,
              address1,
              address2,
              sysName,
            } = resp1.data;

            const member = {
              userNo: userNo,
              userId: userId,
              pw: '******',
              userNickName: userNickName,
              email: email,
              address1: address1,
              address2: address2,
              sysName: sysName,
            };

            console.log(member);
            let address = [];
            resp2.data.forEach((addressData) => {
              address = address.concat({
                value: addressData,
                label: addressData,
              });
            });

            // 현재 내 정보와 1차 주소 리스트를 저장
            setMemberInfo(member);
            setAddressList1(address);
            const obj = { member: member, addressList: address };
            return obj;
          }),
        )
        // 3. 내 정보에 등록된 1차 기본 주소 지정
        .then((obj) => initAddress1(obj))
        // 4. 1차 주소를 토대로 2차 주소를 가져옴 (getAddress2와 setAddress2를 매개변수로 구분)
        .then((obj) => getAddress2(obj))
        // 5. 내 정보에 등록된 2차 기본 주소 지정
        .then((obj) => initAddress2(obj))
        .catch((error) => {
          console.log(error);
        });
    } else {
      denyAccess();
    }
  };

  // 내 정보에 등록된 1차 기본 주소 지정
  const initAddress1 = (obj) => {
    const { addressList, member } = obj;
    let address1 = {};
    addressList.forEach((item, index) => {
      if (item.value === member.address1) {
        setAddressIndex1(index);
        address1 = item;
      }
    });
    return { member: member, addressList: address1 };
  };

  // 1차 주소를 토대로 2차 주소를 가져옴 (넘겨받은 객체를 통한 주소 가져옴)
  const getAddress2 = (obj) => {
    const { member, addressList } = obj;
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
        obj = { member: member, addressList: arrTemp };
      })
      .catch((error) => {
        console.log(error);
      });
    return obj;
  };

  // 내 정보에 등록된 2차 기본 주소 지정
  const initAddress2 = (obj) => {
    const { member, addressList } = obj;
    if (addressList.length > 0) {
      addressList.forEach((item, index) => {
        if (item.value === member.address2) {
          setAddress2Index(index);
        }
      });
    } else {
      setAddressIndex2(0);
    }
  };

  // 1차 주소 지정에 따른 2차 주소 지정 (target을 통한 지정된 내용 불러오기)
  const setAddress2 = (target) => {
    setMemberInfo((prev) => ({ ...prev, address1: target.value }));
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
        address2.current.setValue('');
        setAddressList2(arrTemp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 첫 렌더링, 새로고침 시 초기 데이터 불러오기 작업 시작
  useEffect(() => {
    getInitData();
  }, [accessToken]);

  // 사진 등록 시, 바로 불러오기 기능

  const handleChangeFile = (event) => {
    console.log(event.target.files);
    setImgBase64([]);

    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장.
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

    // Multi-part/form을 사용하기 위한 Form데이터 구성
    const formData = new FormData();
    formData.append('userNo', memberInfo.userNo);
    formData.append('files', event.target.files[0]);

    axios
      .request({
        method: 'post',
        url: '/photo/updatePhoto',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
      .then(() => {
        alert('Profile Image Updated!');
      });
  };

  // 모달창 열고 닫기 적용
  const toggleChangePwModal = () => {
    setChangePwModal((prev) => !prev);
  };

  // input 태그 입력 시
  const handleMemberInfo = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 회원 정보 수정 완료 버튼 클릭 시
  const updateMemberInfo = async () => {
    if (
      memberInfo.userId === '' ||
      memberInfo.userNickName === '' ||
      memberInfo.email === ''
    ) {
      alert('모든 입력박스를 입력해주세요.');
      return;
    }

    if (!regexId.test(memberInfo.userId)) {
      alert('ID는 영문 대소문자 또는 숫자로 7~13 자리로 구성되어야 합니다.');
      return;
    }

    if (!regexNickName.test(memberInfo.userNickName)) {
      alert('닉네임은 특수문자를 제외, 8자리 이하 길이로 구성되어야 합니다.');
      return;
    }

    if (!regexEmail.test(memberInfo.email)) {
      alert('이메일은 이메일 형식의 30자리 이하 길이로 구성되어야 합니다.');
      return;
    }

    axios
      .put('/auth/updateMemberByUserNo', memberInfo)
      .then(() => {
        alert('Updated!');
        // forceUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 회원 탈퇴 시
  const removeAccount = () => {
    let checkPw = '';
    if (comfirm('정말로 회원을 탈퇴하시겠습니까?')) {
      checkPw = prompt('비밀번호를 다시 입력해주세요.');
    }
    axios({
      url: '/auth/deleteMemberWithoutId',
      method: 'delete',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        checkPw: checkPw,
      },
    }).then((resp) => {
      if (resp.data === 0) {
        alert('회원 탈퇴가 완료되었습니다.');
        navi('/');
      } else {
        alert('회원 번호가 일치하지 않습니다.');
        return;
      }
    });
  };

  return (
    <ProfileTemplateBlock>
      <WhiteBox>
        <ProfileFormBlock>
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <div className={styles.profile1}>
                {imgBase64.length > 0 ? (
                  <img
                    src={imgBase64}
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  ></img>
                ) : memberInfo.sysName === null ? (
                  <img
                    src={`/images/test.jpg`}
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  ></img>
                ) : (
                  <img
                    src={`/images/${memberInfo.sysName}`}
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  ></img>
                )}
              </div>
              <div className={styles.profile2}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  name="file"
                  onChange={handleChangeFile}
                />
                <button
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                >
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.245 2.81706C14.3318 1.73025 16.0939 1.73025 17.1807 2.81706C18.2222 3.85858 18.2656 5.52026 17.3109 6.61346L17.1807 6.75273L7.57485 16.3586C7.36976 16.5636 7.12302 16.7212 6.85215 16.821L6.68687 16.8739L2.6319 17.9798C2.28531 18.0743 1.96524 17.7857 2.00279 17.4452L2.01796 17.3658L3.12386 13.3109C3.20017 13.031 3.33624 12.7718 3.52191 12.5508L3.63917 12.4229L13.245 2.81706ZM12.3848 5.09195L4.34628 13.13C4.25399 13.2223 4.18096 13.3314 4.13089 13.4511L4.08862 13.574L3.21199 16.7847L6.42375 15.9091C6.5077 15.8862 6.58793 15.8526 6.66256 15.8093L6.77006 15.7372L6.86774 15.6515L14.9058 7.61295L12.3848 5.09195ZM16.4736 3.52417C15.816 2.86656 14.7725 2.83003 14.072 3.41457L13.9521 3.52417L13.0918 4.38495L15.6128 6.90595L16.4736 6.04563C17.1312 5.38803 17.1677 4.34455 16.5832 3.64407L16.4736 3.52417Z"
                      fill="#ffffff"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.space}></div>
              <div className={styles.infoLayout}>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>nickname</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}>
                    <input
                      type="text"
                      className="forEdit"
                      placeholder="닉네임을 입력해주세요"
                      name="userNickName"
                      onChange={handleMemberInfo}
                      value={memberInfo.userNickName || ''}
                      readOnly={!editing}
                    />
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>id</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}>
                    <input
                      type="text"
                      className="forEdit"
                      placeholder="ID를 입력해주세요"
                      name="userId"
                      onChange={handleMemberInfo}
                      value={memberInfo.userId || ''}
                      readOnly={!editing}
                    />
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>pw</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}>
                    <input
                      type="text"
                      placeholder="비밀번호를 입력해주세요"
                      name="pw"
                      onChange={handleMemberInfo}
                      value={memberInfo.pw || ''}
                      readOnly
                    />
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>email</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}>
                    <input
                      type="text"
                      className="forEdit"
                      placeholder="이메일을 입력해주세요"
                      name="email"
                      onChange={handleMemberInfo}
                      value={memberInfo.email || ''}
                      readOnly={!editing}
                    />
                  </div>
                </div>
                <div className={styles.infoBar2}>
                  <div className={styles.infoTitle}>location</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}>
                    <div className={styles.body1}>
                      {addressList1.length > 0 && (
                        <Select
                          ref={address1}
                          options={addressList1}
                          defaultValue={addressList1[addressIndex1]}
                          onChange={setAddress2}
                          isDisabled={!editing}
                        />
                      )}
                    </div>
                    <div className={styles.body2}>
                      {addressList2.length > 0 && (
                        <Select
                          ref={address2}
                          options={addressList2}
                          defaultValue={addressList2[addressIndex2]}
                          isDisabled={!editing}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {editing ? (
                  <div className={styles.infoBar3}>
                    <button
                      className={styles.EditCancelBtn}
                      onClick={handleEditing}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.EditComBtn}
                      onClick={updateMemberInfo}
                    >
                      Complete
                    </button>
                  </div>
                ) : (
                  <div className={styles.infoBar3}>
                    <button className={styles.EditBtn} onClick={handleEditing}>
                      Edit
                    </button>
                    <button
                      className={styles.PwChangeBtn}
                      onClick={toggleChangePwModal}
                    >
                      Change PW
                    </button>
                    {/* <button className={styles.PwChangeBtn} onCLick={removeAccount}>회원 탈퇴</button> */}
                  </div>
                )}
                {changePwModal && (
                  <ChangePwModal toggleChangePwModal={toggleChangePwModal} />
                )}
              </div>
            </div>
          </div>
        </ProfileFormBlock>
      </WhiteBox>
    </ProfileTemplateBlock>
  );
};

export default ProfileTemplate;
