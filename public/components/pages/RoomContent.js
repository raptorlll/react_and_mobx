import React from 'react';
import {inject, observer} from 'mobx-react';
import {Route, withRouter, Link} from 'react-router-dom'
import RoomList from "./RoomList";
import HeaderComponent from "../common/HeaderComponent";
import SearchComponent from "../common/SearchComponent";
import LogoutComponent from "../common/LogoutComponent";
import RoomAdding from "./RoomAdding";
import RoomEdit from "./RoomEdit";
import CreateButtons from "./buttons/CreateButtons";
import EditButtons from "./buttons/EditButtons";

@inject('roomsStore', 'commonStore', 'userStore')
@withRouter
@observer
export default class RoomContent extends React.Component {
  componentDidMount() {
    this.props.roomsStore.loadRooms();
  }

  render() {
    const {rooms, roomsIerarchy, isLoading, page, totalPagesCount} = this.props.roomsStore;

    return (
      <div>
        <div className={"content-wrapper"}>
          <div className={"contentBlock col-xs-6"}>
            <Link
              to={`${this.props.match.url}create`}
              className="add-item">
              <span>Add organization</span>
            </Link>
            <Route
              path={`${this.props.match.url}edit/:identifier`}
              component={RoomEdit}/>
            <Route
              path={`${this.props.match.url}create`}
              component={RoomAdding}/>
          </div>
        </div>
        <div className={"sidebar col-xs-6"}>
          <div>
            <RoomList
              rooms={rooms}
              roomsIerarchy={roomsIerarchy}
              loading={isLoading}
              totalPagesCount={totalPagesCount}
              currentPage={page}
            />
          </div>
          <div className="searchForm">
            <SearchComponent/>
          </div>
          <div className="searchForm">
            <HeaderComponent/>
          </div>
        </div>
        <div className={"content-wrapper"}>
          <div className="searchForm">
            <Route
              path={`${this.props.match.url}edit/:identifier`}
              component={EditButtons}/>
            <Route
              path={`${this.props.match.url}create`}
              component={CreateButtons}/>
            <div className={"logout-part"}>
              {<LogoutComponent/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};