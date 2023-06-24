import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import styles from './Profile.module.scss';
import axios from 'axios';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setNonMember } from '../../modules/Redux/navbarSetting';
import ChangePwModal from './component/ChangePwModal';

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

  const handleEditing = () => {
    // 수정 버튼을 눌렀을 때
    let div = document.getElementsByClassName('forEdit');
    if (!editing) {
      Array.from(div).forEach((item) => {
        item.setAttribute('contenteditable', 'true');
        item.style.border = '1px solid silver';
      });
      setEditing((prev) => {
        return !prev;
      });
    } else {
      Array.from(div).forEach((item) => {
        item.setAttribute('contenteditable', 'false');
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
      // 여러 axios 통신을 한 번에 수행
      // access토큰으로 내 정보 가져오기
      axios
        .all([
          axios.get('/auth/userWithProfileDTO', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          axios.get('/auth/getAddress1List'),
        ])
        .then(
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

            setMemberInfo(member);
            setAddressList1(address);
            const obj = { member: member, addressList: address };
            return obj;
          }),
        )
        .then((obj) => initAddress1(obj))
        .then((obj) => getAddress2(obj))
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

  // 1차 주소를 토대로 2차 주소를 가져옴
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

  // 1차 주소 지정에 따른 2차 주소 지정
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

    axios.put('/auth');
  };

  const toggleChangePwModal = () => {
    setChangePwModal((prev) => !prev);
    console.log(changePwModal);
  };

  const handleMemberInfo = (e) => {
    const { id, innerText } = e.target;
    const isActiveElement = e.target === document.activeElement;
    if (!isActiveElement) {
      setMemberInfo((prev) => ({ ...prev, [id]: innerText }));
    }
  };

  // 회원 정보 수정 완료 버튼 클릭 시
  const UpdateMemberInfo = () => {
    axios
      .put('/auth/updateMemberByUserNo', memberInfo)
      .then(() => {
        alert('수정이 완료되었습니다.');
      })
      .catch((error) => {
        console.log(error);
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
                  id="profileChange"
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
                  사진 바꾸기
                </button>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.space}></div>
              <div className={styles.infoLayout}>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>nickname</div>
                  <div className={styles.infoSpace}>:</div>
                  <div
                    className={`${styles.infoBody} forEdit`}
                    id="userNickName"
                    onInput={handleMemberInfo}
                    value={memberInfo.userNickName}
                  >
                    {memberInfo.userNickName}
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>id</div>
                  <div className={styles.infoSpace}>:</div>
                  <div
                    className={`${styles.infoBody} forEdit`}
                    id="userId"
                    onInput={handleMemberInfo}
                  >
                    {memberInfo.userId}
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>pw</div>
                  <div className={styles.infoSpace}>:</div>
                  <div
                    className={styles.infoBody}
                    id="pw"
                    onInput={handleMemberInfo}
                  >
                    {memberInfo.pw}
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>email</div>
                  <div className={styles.infoSpace}>:</div>
                  <div
                    className={`${styles.infoBody} forEdit`}
                    id="email"
                    onInput={handleMemberInfo}
                  >
                    {memberInfo.email}
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
                        />
                      )}
                    </div>
                    <div className={styles.body2}>
                      {addressList2.length > 0 && (
                        <Select
                          ref={address2}
                          options={addressList2}
                          defaultValue={addressList2[addressIndex2]}
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
                      수정취소
                    </button>
                    <button
                      className={styles.EditComBtn}
                      onClick={UpdateMemberInfo}
                    >
                      수정완료
                    </button>
                  </div>
                ) : (
                  <div className={styles.infoBar3}>
                    <button className={styles.EditBtn} onClick={handleEditing}>
                      수정하기
                    </button>
                    <button
                      className={styles.PwChangeBtn}
                      onClick={toggleChangePwModal}
                    >
                      비밀번호 변경
                    </button>
                    <button className={styles.PwChangeBtn}>회원 탈퇴</button>
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
