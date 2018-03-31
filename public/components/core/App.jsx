import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import RoomContent from "../pages/RoomContent";
import HomePage from "../pages/HomePage";
import '../../sass/index.scss';

@inject('roomsStore')
@withRouter
@observer
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path="/room" component={RoomContent}/>
            <Route path="/" component={HomePage}/>
          </Switch>
        </div>
      </div>
    );
  }
}
