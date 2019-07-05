import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './Assets/App.scss';
import registerServiceWorker from './registerServiceWorker';

import Main from './Views/Main';
import Login from './Views/Login';
import Test from './Views/Test';
import Test1 from './Views/Test1';

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Route path="/login" component={Login} />
      <Main>
        <Switch>
          <Route exact={true} path="/" component={Test} />
          <Route exact={true} path="/test" component={Test} />
          <Route exact={true} path="/test1" component={Test1} />
          <Route path="*" component={Test} />
        </Switch>
      </Main>
    </HashRouter>
  );
};

ReactDOM.render(<Router />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

