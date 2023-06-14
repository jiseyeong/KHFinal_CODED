import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const AutoSearchContainer = styled('div')`
  display: none;
  z-index: 3;
  height: 50vh;
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 2px solid;
  padding: 15px;
`;

const AutoSearchWrap = styled('ul')``;

const AutoSearchData = styled('li')`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SearchAutoCompleteBox = (props) => {
  const { searchInput } = props;
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchInput) change();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchInput]);

  const change = () => {
    axios({
      url: 'feedpost/searchByHashs/',
      method: 'GET',
      params: {
        hashTag: searchInput,
      },
    })
      .then((resp) => {
        let temp = [];
        resp.data.forEach((i) => {
          temp = [...temp, { id: i.feedPostId, body: i.body }];
        });
        setFeedData([...feedData, ...temp]);
      })
      .catch((resp) => console.log(resp));
  };

  return (
    <AutoSearchContainer>
      <AutoSearchWrap>
        <AutoSearchData>
          <a href="#"></a>
          <img src="assets/imgs/north_west.svg" alt="arrowIcon" />
        </AutoSearchData>
      </AutoSearchWrap>
    </AutoSearchContainer>
  );
};
export default SearchAutoCompleteBox;
