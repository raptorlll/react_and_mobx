import React from 'react';
import App from "./App";
import {HashRouter} from 'react-router-dom';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import roomsStore from "../stores/roomsStore";
import roomEditorStore from "../stores/roomEditorStore";
import searchStore from "../stores/searchStore";

useStrict(true);

const stores = {
  roomsStore,
  roomEditorStore,
  searchStore
};

// For easier debugging
window._____APP_STATE_____ = stores;

export default class RootContainer extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <HashRouter>
          <App/>
        </HashRouter>
      </Provider>
    );
  }
}
