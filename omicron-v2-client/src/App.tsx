import React from 'react';
import Routes from './routes';
import {Provider} from 'react-redux';
import storeConfig from './store/storeConfig';

const store = storeConfig();
function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
