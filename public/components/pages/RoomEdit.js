import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import RoomFields from "./RoomFields";

@inject('roomEditorStore', 'roomsStore')
@withRouter
@observer
export default class RoomEdit extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.match.params.identifier !== prevProps.match.params.identifier) {
      this.props.roomEditorStore.setRoomIdentifier(this.props.match.params.identifier);
      this.props.roomEditorStore.loadInitialData();
    }
  }

  componentDidMount() {
    this.props.roomEditorStore.reset();
    this.props.roomEditorStore.loadInitialData();
  }

  render() {
    let floatRooms = this.props.roomsStore.floatRooms;

    return (
      <div className="roomEdit">
        <RoomFields floatRooms={floatRooms}/>
      </div>
    );
  }
}
