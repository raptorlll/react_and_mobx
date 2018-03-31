import React from 'react';

class LogoutComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      position: {}
    };
  }

  render() {
    return (
      <ul>
        <li>
          <a>Help</a>
        </li>
        <li>
          <a>organization</a>
        </li>
        <li>
          <a>
            Locale
            <i className="fa fa-angle-down"/>
          </a>
          <ul>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
          </ul>
        </li>
        <li>
          <div>
            <a>
              string
              <img src="/img/option.png"/>
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/auth/logout">Log Out</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );
  }

}

export default LogoutComponent;