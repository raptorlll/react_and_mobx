import React from 'react';
import {inject, observer} from "mobx-react/index";

@inject('roomsStore', 'searchStore')
@observer
class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTagInputKeyDown = ev => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9)
          ev.preventDefault();

        this.props.searchStore.addHistory(this.props.searchStore.text);
        this.props.roomsStore.loadRoomsSearch();
        break;

      default:
        break;
    }
  };

  render() {
    let containerClasses = ['search-field'];

    if (this.props.searchStore.isFocused) {
      containerClasses.push('enabled');
    }

    return (
      <div className={"ic colorful"}
           onClick={(e) => {
             this.props.searchStore.setFocused(true);
           }}
      >
        <div
          className={containerClasses.join(' ')}
        >
          <input type="hidden" name="search_type" id="search_type"/>
          <input type="hidden" name="organization_value" id="organization_value"/>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={(e) => {
              this.props.searchStore.setText(e.target.value);
            }}
            onKeyDown={this.handleTagInputKeyDown}
          />
          <a onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.props.searchStore.setFocused(false);
            }}
          >
          </a>
          <button
            className="btn"
            disabled={!this.props.searchStore.isFocused}
            onClick={(e) => {
              this.props.roomsStore.loadRoomsSearch();
            }}
          >
            Go
          </button>
        </div>
        {
          this.props.searchStore.isFocused ?
            <div className={"full-width"}>
              <div className="filter-block row" id="filtering-block">
                {
                  ['enabled', 'disabled', 'all'].map((name) => {
                    return (
                      <label>
                        <span>{name}</span>
                        <input
                          type="radio"
                          onChange={(e) => {
                            this.props.searchStore.setRadioButtonEnabled(e.target.checked ? name : 'all')
                          }}
                          name="enabled"
                          value={name}
                          checked={this.props.searchStore.isRadioButtonEnabled(name)}
                        />
                      </label>
                    );
                  })
                }
              </div>
            </div> :
            null
        }
      </div>
    );
  }
}

export default SearchComponent;