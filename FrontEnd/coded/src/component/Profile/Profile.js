import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import styled from 'styled-components';
import styles from './Profile.module.scss';
import axios from 'axios';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setNonMember } from '../../modules/Redux/navbarSetting';

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

  const handleEditing = () => {
    setEditing((prev) => {
      return !prev;
    });
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
              address1,
              address2,
              email,
              userNickName,
              sysName,
            } = resp1.data;

            const member = {
              userNo: userNo,
              userId: userId,
              address1: address1,
              address2: address2,
              email: email,
              userNickName: userNickName,
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
        .then((obj) => setAddress2(obj))
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

  // 1차 주소 지정에 따른 2차 주소 지정
  const setAddress2 = (obj) => {
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

  const getAddress2 = (target) => {
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

  useEffect(() => {
    getInitData();
  }, [accessToken]);

  return (
    <ProfileTemplateBlock>
      <WhiteBox>
        <ProfileFormBlock>
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <div className={styles.profile1}>
                {memberInfo.sysName === null ? (
                  <img src={`/images/test.jpg`}></img>
                ) : (
                  <img src={`/images/${memberInfo.sysName}`}></img>
                )}
              </div>
              <div className={styles.profile2}>
                <button>사진 바꾸기</button>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.space}></div>
              <div className={styles.infoLayout}>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>nickname</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}>
                    {memberInfo.userNickName}
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>id</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}> {memberInfo.userId} </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>pw</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}> {memberInfo.pw} </div>
                </div>
                <div className={styles.infoBar}>
                  <div className={styles.infoTitle}>email</div>
                  <div className={styles.infoSpace}>:</div>
                  <div className={styles.infoBody}> {memberInfo.email} </div>
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
                          onChange={getAddress2}
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
                    <button className={styles.EditComBtn}>수정완료</button>
                  </div>
                ) : (
                  <div className={styles.infoBar3}>
                    <button className={styles.EditBtn} onClick={handleEditing}>
                      수정하기
                    </button>
                    <button className={styles.PwChangeBtn}>
                      비밀번호 변경
                    </button>
                    <button className={styles.PwChangeBtn}>회원 탈퇴</button>
                  </div>
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
