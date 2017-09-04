import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'dva/router';
import Main from './components/layout/main.jsx';

import Index from './routes/index.jsx';
import downloadPage from './routes/downloadPage.jsx';
import registration from './routes/registration.jsx';
import friendHelp from './routes/friendHelp.jsx';
import Forum from "./routes/Forum.js";
import Lens from "./routes/Lens.js";
import Market from "./routes/Market.js";
import Album from "./routes/Album.js";
import Login from "./routes/Login.js";
import Guide from "./routes/Guide.js";

import AnnouncementList from "./routes/AnnouncementList.js";

import EquipDetail from "./routes/EquipDetail.js";

import Tosell from "./routes/Tosell.js";

import AddAnnouncement from "./routes/AddAnnouncement.js";

import Article from "./routes/Article.js"; 

function RouterConfig({
  history
}) {
  return (
    <Router history={history}>
      <Route component={Main}>
        <Route path="/" component={Index} />
        <Route path="/downloadPage" component={downloadPage} />
        <Route path="/registration" component={registration} />
        <Route path="/friendHelp" component={friendHelp} />
        <Route path="/forum" component={Forum} />
        <Route path="/lens" component={Lens} />
        <Route path="/market" component={Market} />
        <Route path="/album" component={Album} />
        <Route path="/login" component={Login} />
        <Route path="/guide" component={Guide} />
        <Route path="/announcementList" component={AnnouncementList} />
        <Route path="/equipDetail" component={EquipDetail} />
        <Route path="/Tosell" component={Tosell} />
        <Route path="/addAnnouncement" component={AddAnnouncement} />
        <Route path="/Article" component={Article} />
      </Route>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
