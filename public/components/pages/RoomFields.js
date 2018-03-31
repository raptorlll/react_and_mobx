import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

const ErrorField = props => {
  if (!props.text) {
    return null;
  }

  return (
    <div className={'field-error'}>
      {props.text}
    </div>
  );
};

@inject('roomEditorStore', 'roomsStore')
@withRouter
@observer
export default class RoomFields extends React.Component {
  changeName = e => this.props.roomEditorStore.setName(e.target.value);

  render() {
    const {inProgress, name} = this.props.roomEditorStore;
    const statusOptions = [
      {
        text: 'Enabled',
        value: 'enabled'
      },
      {
        text: 'Disabled',
        value: 'disabled'
      }
    ];

    return (
      <div className="editor-page">
        <div>
          <div className="row">
            <div className="col-xs-12">
              <form className={"edit-form"}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className={"field"}>
                      <label for="title-field">
                        Room Name
                      </label>
                      <input
                        type="text"
                        name="title-field"
                        id={'title-field'}
                        placeholder="Room Name"
                        value={name}
                        onChange={this.changeName}
                        disabled={inProgress}
                      />
                      <ErrorField text={
                        this.props.roomEditorStore.errors.name
                      }/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <div className={"field"}>
                      <label for="ancestor">
                        Ancestor Room
                      </label>
                      <select
                        id={'ancestor'}
                        name={'ancestor'}
                        onChange={(e) => {
                          this.props.roomEditorStore.setAncestor(e.target.value);
                        }}
                      >
                        <option value="0">
                          None
                        </option>
                        {
                          this.props.floatRooms.map((element) => {
                            return (
                              <option
                                selected={this.props.roomEditorStore.ancestor === element.identifier}
                                value={element.identifier}>
                                {element.name}
                              </option>
                            );
                          })
                        }
                      </select>
                      <ErrorField text={
                        this.props.roomEditorStore.errors.ancestor
                      }/>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="field">
                      <label for="status">
                        Room Status
                      </label>
                      <select
                        id={'status'}
                        name={'status'}
                        onChange={(e) => {
                          this.props.roomEditorStore.setStatus(
                            statusOptions[e.target.selectedIndex].value
                          );
                        }}
                      >
                        {
                          statusOptions.map((element) => {
                            return (
                              <option
                                selected={
                                  this.props.roomEditorStore.status === element.value
                                }
                                value={element.name}>
                                {element.text}
                              </option>
                            );
                          })
                        }
                      </select>
                      <ErrorField text={
                        this.props.roomEditorStore.errors.status
                      }/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
