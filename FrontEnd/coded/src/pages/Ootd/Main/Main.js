import React, { Component, useEffect, useState } from 'react';
// import CardList from './CardList.scss';
import Modal from './Modal';
// import InfiniteScroll from 'react-infinite-scroller';
import style from './Main.module.scss';
import axios from 'axios';

const API = 'http://';
const LIMIT = 100;

function Main({ InfiniteScroll, handleClickLike }) {
  const [isLikeBtn, setIsLikeBtn] = useState(false);
  const [cards, setCards] = useState([]);
  const [data, setData] = useState('');
  const [commentData, setCommentData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  function openModal(data) {
    setIsModal(data);
  }

  function closeModal() {
    setIsModal(false);
    setModalData([]);
  }

  // useEffect(()=>{
  //   window.addEventListener('scroll', infiniteScroll);
  //   axios({
  //     method:'get',
  //     url:`${API}/ootds`,
  //     params:{
  //       offset:offSet,
  //       limit:LIMIT
  //     }
  //   }).then((response)=>{
  //     setCards(response.data.ootd_list);
  //     setOffSet(offSet + LIMIT);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // },[]);

  // function loadFunc(){
  //   axios({
  //     method:'get',
  //     url:`${API}/ootds`,
  //     params:{
  //       offset:offSet,
  //       limit:LIMIT
  //     }
  //   }).then((response)=>{
  //     setCards((prev)=>{return [...prev, ...response.ootd_list]});
  //     setOffSet(offSet + LIMIT);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }

  function getData(data) {
    setData(data);
  }

  function modalData_func() {
    setCommentData(data);
  }

  function handleModalData(data) {
    setModalData(data);
  }

  useEffect(() => {
    console.log(offSet);
  });

  return (
    <div style={{ overflow: 'auto' }}>
      {/* <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={<div className="loader" key={0} />}
          useWindow={false}
        > */}
      <NavbarOotd />
      <div className="mainWrapper">
        {/* <CardList
              key={cards.id}
              commentData={commentData}
              getModalInputComment={getData}
              isModal={openModal}
              modalData={handleModalData}
              cardsData={cards}
              handleClickLike={handleClickLike ? handleClickLike:()=>{}}
            /> */}
      </div>
      <div>
        <div className="infiniteScrollTarget">
          <input type="text" alt="target" value="target"></input>
        </div>
      </div>
      <div className={isModal ? '' : 'displayNone'}>
        <Modal
          modalData={modalData_func}
          data={getData}
          commentData={commentData}
          closeModal={closeModal}
          key={cards.id}
          id={cards.id}
          contentImg={cards?.contentImg}
          authorImg={cards?.authorImg}
          author={cards?.author}
          date={cards?.date}
          hashtag={cards?.hashtag}
          description={cards?.description}
          follower={cards?.follower}
          commentNum={cards?.commentNum}
          scrap={cards?.scrap}
        />
      </div>
      {/* </InfiniteScroll> */}
    </div>
  );
}
export default Main;
