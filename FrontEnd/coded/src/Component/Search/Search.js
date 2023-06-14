import React, { Component } from "react";
import "./Search.scss";
import Hashtag from "./Component/HashTag/Hashtag";
import User from "./Component/User/User";
import Navbar from "../Navbar/NavbarOotd/NavbarOotd";
import Footer from "../../Pages/Weekly/Home/Component/Footer/Footer";
import { searchDataAPI } from "../../config";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      tagList: [],
      userList: [],
      tagCount: 0,
      userCount: 0,
    };
  }

  getSearchData = () => {
    fetch(`${searchDataAPI}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          tagsList: res.results.tags,
          usersList: res.results.users,
          tagCount: res.results.tag_count,
          userCount: res.results.user_count,
        });
      });
  };

  componentDidMount() {
    this.getSearchData();
  }

  render() {
    const { tagList, tagCount, usersList, userCount } = this.state;

    return (
      <div className="search">
        <div>
          <Navbar />
        </div>
        <div className="searchContainer">
          <span className="subtitle">태그</span>
          <span className="count">{tagCount}</span>
          <div className="tag">
            <div className="tagListContainer">
              <Tag tagList={tagList} />
            </div>
            <div className="buttonContainer">
              <button className="showAll">모두보기</button>
            </div>
          </div>
          <span className="subtitle">사용자</span>
          <span className="count">{userCount}</span>
          <div className="userSection">
            <div>
              <User usersList={usersList} />
            </div>
            <div className="buttonContainer">
              <button className="showAll">모두보기</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
