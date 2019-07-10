import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/App.scss';
import registerServiceWorker from './registerServiceWorker';
import Router from './Router/Index';
import Store from './Store/Index';
import {StoreContext} from 'redux-react-hook';

ReactDOM.render(
  <StoreContext.Provider value={Store}>
    {Router}
  </StoreContext.Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
