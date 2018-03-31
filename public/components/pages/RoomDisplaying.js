import React from 'react';
import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

@inject('roomsStore', 'roomEditorStore')
@observer
@withRouter
export default class RoomDisplaying extends React.Component {
  render() {
    const {room, roomsStore, roomEditorStore, level} = this.props;

    return (
      <li
        className={`room-preview ${roomEditorStore.isEnabled(room.identifier) ? 'open' : ''}`}
        key={room.identifier}
        onClick={(e) => {
          e.stopPropagation();
          roomEditorStore.setRoomIdentifier(room.identifier);
          this.props.history.push(`/edit/${room.identifier}`);
        }}
      >
        {
          room.descendant.length && roomsStore.isMenuOpenFor(room.identifier) ?
            <ul
              className={"descendant"}
              style={{
                marginLeft: `${20 * (level + 1)}px`
              }}
            >
              {this.props.children}
            </ul> :
            null
        }
        <div className="room-meta">
          {room.name}
          {
            room.descendant.length ?
              <div
                className={"arrow"}
                onClick={() => {
                  roomsStore.toggleOpen(room.identifier);
                }}
              >
                {
                  !roomsStore.isMenuOpenFor(room.identifier) ?
                    <i className="fa fa-angle-down"/> :
                    <i className="fa fa-angle-up"/>
                }
              </div>
              :
              null
          }
        </div>
      </li>
    );
  }
}
