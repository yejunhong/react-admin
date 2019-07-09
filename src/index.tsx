import * as ReactDOM from 'react-dom';
import './Assets/App.scss';
import registerServiceWorker from './registerServiceWorker';

import Router from './Router/Index';

ReactDOM.render(Router,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

