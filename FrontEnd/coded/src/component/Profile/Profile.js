import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import styles from './Profile.module.scss';
import { useSearchParams } from 'react-router-dom';
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
  const address1 = useRef(null);
  const address2 = useRef(null);
  const dispatch = useDispatch();

  // useSelector로 토큰 값 가져오기
  // 토큰 값을 활용하여 유저 DTO 정보를 가져오기
  // 로그인 정보 출력

  const accessToken = useSelector((state) => state.member.access);
  const denyAccess = useCallback(() => dispatch(setNonMember()), [dispatch]);

  const getLoginData = () => {
    if (accessToken) {
      axios({
        method: 'get',
        url: '/auth/userDTO',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          const {
            userNo,
            userId,
            pw,
            address1,
            address2,
            email,
            userNickName,
          } = response.data;

          console.log(response.data);
          setMemberInfo({
            userNo: userNo,
            userId: userId,
            pw: pw,
            address1: address1,
            address2: address2,
            email: email,
            userNickName: userNickName,
          });
          // userno userid pw address1 address2 email
        })
        .catch((error) => {
          console.log(error);
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
        console.log(response.data);
        const addressListTemp = response.data;
        let arrTemp = [];
        addressListTemp.forEach((address) => {
          arrTemp = arrTemp.concat({
            value: address,
            label: address,
          });
          setAddressList1([...addressList1, ...arrTemp]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAddressList2 = () => {
    axios({
      method: 'get',
      url: '/auth/getAddress2List',
      params: {
        address1: address1.current.value,
      },
    })
      .then((response) => {
        setAddressList2([]);
        response.data.forEach((item) => {
          setAddressList2((prev) => {
            return [...prev, item];
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLoginData();
      await updateAddressList1();
      // await updateAddressList2();
    };

    fetchData();
  }, []);

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
                    <div className={styles.body1}>
                      <Select
                        options={addressList1}
                        defaultValue={addressList1[0]}
                      />
                    </div>
                    <div className={styles.body2}>
                      <Select options={addressList2} />
                    </div>
                  </div>
                </div>
                <div className={styles.infoBar}>
                  <button className={styles.PwChangeBtn}>비밀번호 변경</button>
                  <button className={styles.EditBtn}>수정하기</button>
                  <button className={styles.EditCancelBtn}>수정취소</button>
                  <button className={styles.EditComBtn}>수정완료</button>
                </div>
              </div>
            </div>
          </div>
        </ProfileFormBlock>
      </WhiteBox>
    </ProfileTemplateBlock>
  );
};

export default ProfileTemplate;
