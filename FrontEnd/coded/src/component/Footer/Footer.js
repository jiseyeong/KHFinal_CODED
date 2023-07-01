import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Footer.scss';
import Modal from 'react-modal';
import { motion, useScroll } from "framer-motion";
import Tos from './Component/Tos/TermsOfUse';



const Footer = () => {

  const [modal, setModal] = useState(false);

  //모달 창 닫기
  const closeModal = () => {
    if (modal) {
        setModal(false);
      }
    };

  function Modal() {
    const modalBodyRef = useRef(null);
    const { scrollYProgress } = useScroll({
      container:modalBodyRef
    });
    return (

      <>
      <div className="modal" onClick={closeModal}>
      <motion.div
          className="progress-bar"
          style={{scaleX:scrollYProgress}}/>
        <div className="modalBody" ref={modalBodyRef}>
       
          <div className="tosContent">
              <Tos></Tos>
        </div>
        </div>
        </div>
      </>
    );
  }
  // const openModal = () => {
  //   if (!modal) {
  //     setModal(true);
  //   }
  // };

  return (
    <div className="Footer">
      <div className="footerContainer">
        <div className="left">
          <div className="title">
            <p>members.</p>
          </div>
          <div className="descList">
            <div className="deleteAccountWrapper">
              <Link to="/deleteAccount">Delete Account</Link>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="title">
            <p>us.</p>
          </div>
          <div className="descList">
            <Link to="" onClick={()=>{setModal(true)}}>Terms of Use</Link>
            {modal === true ? <Modal/> : null}
            {console.log(modal)}
          </div>
          <div className="descList">
            <Link to="/privacyPolicy">Privacy Policy</Link>
          </div>
        </div>

        <div className="right">
          <div className="title">
            <p>contact.</p>
          </div>
          <div className="descList">
            <p>coded@official.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;