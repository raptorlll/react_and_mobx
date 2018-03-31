import React from 'react';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      position: {}
    };
  }

  render() {
    return (
      <div className={"ic menu-data"} style={{height: '66px'}}>
        <div className={"c30"}>
          <img src="/logo.png" className="logo-brand"/>
        </div>
        <div className="c70">
          Header
        </div>
      </div>
    );
  }
}

export default HeaderComponent;