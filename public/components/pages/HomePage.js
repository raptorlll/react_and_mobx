import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import MainView from "./RoomContent";

@inject('commonStore')
@withRouter
@observer
export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
          <div className="row">
            <MainView/>
          </div>
      </div>
    );
  }
}
