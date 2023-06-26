import React from 'react';
import { Like } from '../../assets/ModalAsset/ModalAsset';
import './FeedListNavi.scss';

const FeedListNavi = () => {
  const abc = () => {};
  return (
    <div className="feedListNaviLayout">
      <div className="menu">
        <Like onClick={abc} />
      </div>
      <div className="menu">
        <Like />
      </div>
      <div className="menu">
        <Like />
      </div>
      <div className="menu">
        <Like />
      </div>
    </div>
  );
};

export default FeedListNavi;
