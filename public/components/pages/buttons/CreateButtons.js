import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

@inject('roomEditorStore')
@withRouter
@observer
export default class CreateButtons extends React.Component {
  render() {
    return (
      <div className="room-buttons">
        <button
          disabled={!this.props.roomEditorStore.isValid}
          onClick={(e) => {
            e.stopPropagation();
            this.props.roomEditorStore.submit()
          }}
        >
          Create
        </button>
        <Link
          to={`/`}>
          Cancel
        </Link>
      </div>
    );
  }
}
