import React from "react";
import FeedList from './Component/FeedList/FeedList';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IndexPage from './IndexPage';
import Login from "./Component/Login/Login";
import SignUp from "./Component/SignUp/SignUp";
import Profile from "./Component/Profile/Profile";
import FeedList from "./Component/FeedList/FeedList";
import PostDetail from "./Component/FeedPostDetail/FeedPostDetail";
import Search from "./Component/Search/Search";
import Ootd from "./Pages/Ootd/Main/Main";
import Weekly from "./Pages/Weekly/Home/Home";


import FeedListByIdWithMain from './test/FeedListByIdWithMain';
import FeedListByHashsWithMain from './test/FeedListByHashsWithMain';
import FeedListByNickNameWithMain from './test/FeedListByNickNameWithMain';
import FileUploadTest from './test/FileUploadTest';

class Routes extends React.Component {
  render() {
    return (
        <Router>
         <Switch>
           <Route exact path="/" component={IndexPage} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/signup" component={SignUp} />
           <Route exact path="/feed" componentment={FeedList} />
           <Route exact path="/post" componentent={PostDetail} />
           <Route exact path="/search" component={Search} />           
           <Route exact path="/profile" component={Profile} />
           <Route exact path="/ootd" component={Ootd} />
           <Route exact path="/FeedList" element={<FeedList />} />
           <Route exact path="/FeedList/id" element={<FeedListByIdWithMain />} />
           <Route exact path="/FeedList/nick" element={<FeedListByNickNameWithMain />} />
           <Route exact path="/FeedList/hashs" element={<FeedListByHashsWithMain />} />
         </Switch>
       </Router>
  );
}


}
export default Routes;
