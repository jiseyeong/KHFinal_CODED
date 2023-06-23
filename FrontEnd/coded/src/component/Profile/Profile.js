import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [addressList1, setAddressList1] = useState([]);
  const [addressList2, setAddressList2] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const dispatch = useDispatch();

  // useSelector로 토큰 값 가져오기
  // 토큰 값을 활용하여 유저 DTO 정보를 가져오기
  // 로그인 정보 출력

  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);
  const [myAddress1, setMyAddress1] = useState(null);
  const [myAddress1Location, setMyAddress1Location] = useState({});
  const [myAddress2, setMyAddress2] = useState(null);
  const [editing, setEditing] = useState(false);

  const getLoginData = () => {
    if (accessToken) {
      axios({
        method: 'get',
        url: '/auth/userDTO',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((resp) => {
          const {
            userNo,
            userId,
            pw,
            address1,
            address2,
            email,
            userNickName,
          } = resp.data;

          let test = {
            userNo: userNo,
            userId: userId,
            pw: pw,
            address1: address1,
            address2: address2,
            email: email,
            userNickName: userNickName,
          };
          console.log(test);
          return test;
        })
        .then((resp) => {
          updateAddressList1(resp);
        });
    } else {
      denyAccess();
    }
  };

  const updateAddressList1 = () => {
    axios({
      method: 'get',
      url: '/auth/getAddress1List',
    })
      .then((response) => {
        let arrTemp = [];
        response.data.forEach((address) => {
          arrTemp = arrTemp.concat({
            value: address,
            label: address,
          });
        });
        setAddressList1(arrTemp);
        return arrTemp;
      })
      .then((resp) => {
        handleAddress1(resp);
      })
      .then(() => {
        updateAddressList2();
      })
      .then(() => {
        handleAddress2();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Address1 자동 선택
  const handleAddress1 = (resp) => {
    resp.forEach((item, index) => {
      if (item.value === memberInfo.address1) {
        console.log('find');
        setMyAddress1(() => {
          setMyAddress1Location(addressList1[index]);
          return (
            <Select options={addressList1} defaultValue={addressList1[index]} />
          );
        });
      }
    });
  };

  const updateAddressList2 = () => {
    const response = axios({
      method: 'get',
      url: '/auth/getAddress2List',
      params: {
        address1: myAddress1Location.value,
      },
    })
      .then((response) => {
        let arrTemp = [];
        response.data.forEach((address) => {
          arrTemp = arrTemp.concat({
            value: address,
            label: address,
          });
          setAddressList2(tmp);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddress2 = () => {
    addressList2.forEach((item, index) => {
      if (item.value === memberInfo.address2) {
        setMyAddress2(() => {
          return (
            <Select options={addressList2} defaultValue={addressList2[index]} />
          );
        });
      }
    });
  };

  useEffect(() => {
    const member = getLoginData();
    console.log(member);
    // updateAddressList1();
    // handleAddress1();
    // updateAddressList2();
    // handleAddress2();
  }, [accessToken]);

  // useEffect(() => {
  // }, [memberInfo]);

  // useEffect(() => {
  // }, [myAddress1Location]);

  // useEffect(() => {
  // }, [addressList2]);

  const handleEditing = () => {
    setEditing((prev) => {
      return !prev;
    });
  };

  return (
    <ProfileTemplateBlock>
      <WhiteBox>
        <ProfileFormBlock>
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <div className={styles.profile1}>
                <img></img>
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
                    <div className={styles.body1}>{myAddress1}</div>
                    <div className={styles.body2}>{myAddress2}</div>
                  </div>
                </div>
                {editing ? (
                  <div className={styles.infoBar3}>
                    <button className={styles.EditCancelBtn}>수정취소</button>
                    <button
                      className={styles.EditComBtn}
                      onClick={handleEditing}
                    >
                      수정완료
                    </button>
                  </div>
                ) : (
                  <div className={styles.infoBar3}>
                    <button className={styles.EditBtn} onClick={handleEditing}>
                      수정하기
                    </button>
                    <button className={styles.PwChangeBtn}>
                      비밀번호 변경
                    </button>
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
