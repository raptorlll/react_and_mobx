import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

@inject('roomEditorStore')
@withRouter
@observer
export default class EditButtons extends React.Component {
  render() {
    return (
      <div className="room-buttons">
        <button
          disabled={!this.props.roomEditorStore.isValid}
          onClick={() => {
            this.props.roomEditorStore.submit()
          }}
        >
          Save
        </button>
        <Link
          to={`/`}>
          Cancel
        </Link>
      </div>
    );
  }
}
