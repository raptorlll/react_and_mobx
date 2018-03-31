import React from 'react';
import Pagination from "../helpers/Pagination";
import RoomDisplaying from "./RoomDisplaying";
import LoadingSpinner from "../helpers/LoadingSpinner";

function renderroomIerarchy(rooms, level = 0) {
  return rooms.slice().map(room => {
    return (
      <RoomDisplaying
        room={room}
        key={room.identifier}
        level={level}
      >
        {
          renderroomIerarchy(room.descendant, level + 1)
        }
      </RoomDisplaying>
    );
  });
}

const RoomList = props => {
  if (props.loading && props.rooms.length === 0) {
    return (
      <LoadingSpinner/>
    );
  }

  if (props.rooms.length === 0) {
    return (
      <div className="room-preview">
        No rooms are here...
      </div>
    );
  }

  return (
    <div>
      <div className={"rooms-list scroll-list"}>
        <ul className={"top-menu"}>
          {
            renderroomIerarchy(props.roomsIerarchy)
          }
        </ul>
      </div>
      <Pagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default RoomList;
