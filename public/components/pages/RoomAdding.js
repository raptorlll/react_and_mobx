import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import RoomFields from "./RoomFields";

@inject('roomEditorStore', 'roomsStore')
@withRouter
@observer
export default class RoomAdding extends React.Component {
  componentDidMount() {
    this.props.roomEditorStore.reset();
  }

  render() {
    let floatRooms = this.props.roomsStore.floatRooms;

    return (
      <div className="room-create">
        <RoomFields floatRooms={floatRooms}/>
      </div>
    );
  }
}
