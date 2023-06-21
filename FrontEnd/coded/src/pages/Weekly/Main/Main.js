import React, { Component, useEffect, useState } from "react";
import NavbarWeekly from "../../../Component/Navbar/NavbarWeekly/NavbarWeekly";
import CardList from './CardList.scss';
import Modal from './Modal';
// import InfiniteScroll from 'react-infinite-scroller';
import WeeklyDate from "./Component/WeeklyDate/WeeklyDate";
import WeatherCodi from "./Component/WeatherCodi/WeatherCodi";
import style from "./Main.scss";
import axios from "axios";

// class Main extends Component {
//   render() {
//     return (
//       <>
//         <NavbarWeekly />
//         <div className="mainContainer">
//           <WeeklyDate />
//           <WeatherCodi />
//         </div>
//       </>
//     );
//   }
// }

// export default Main;


const API = 'http://';
const LIMIT = 100;

function Main({isModal, infiniteScroll}){
  const [likeBtn, setLikeBtn] = useState(false);
  const [cards, setCards] = useState([]);
  const [data, setData] = useState('');
  const [commentData, setCommentData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [loading, setLoading] = useState(false);

  function openModal(data){
    setIsModal(data);
  }

  function closeModal(){
    setIsModal(false);
    setModalData([]);
  }

  useEffect(()=>{
    window.addEventListener('scroll', infiniteScroll);
    axios({
      method:'get',
      url:`${API}/ootds?offset=${offSet}&limit=${LIMIT}`,
    }).then((response)=>{
      setCards(response.data.ootd_list),
      setOffSet(offSet + LIMIT);
    })
  },[]);

  // const loadFunc = () => {
  //   fetch(`${API}/ootds?offset=${this.state.offSet}&limit=${LIMIT}`)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     this.setState({
  //     cards: [...this.state.cards, ...res.ootd_list],
  //     offSet: this.state.offSet + LIMIT,
  //   });
  //   })
  // }

  function getData(data){
    setData(data);
  }

  function modalData(){
    setCommentData(data);
  }

  function handleModalData(data){
    setModalData(data);
  }

  useEffect(()=>{
    console.log(offSet);
  })

  return(
    <div style={{ overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={true || false}
          loader={<div className="loader" key={0} />}
          useWindow={false}
        >
          <NavbarWeekly />
          <div className="mainWrapper">
            <CardList
              key={cards.id}
              commentData={commentData}
              getModalInputComment={getData}
              isModal={this.openModal}
              modalData={this.handleModalData}
              cardsData={cards}
              handleClickLike={this.handleClickLike}
            />
          </div>
          <div>
            <div className="infiniteScrollTarget">
              <input type="text" alt="target" value="target"></input>
            </div>
          </div>
          <div className={isModal ? '' : 'displayNone'}>
            <Modal
              modalData={modalData}
              getData={this.getData}
              commentData={this.commetData}
              closeModal={this.closeModal}
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
        </InfiniteScroll>
      </div>
  );
}
export default Main;
