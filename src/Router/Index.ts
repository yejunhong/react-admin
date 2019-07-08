import * as React from 'react';
import { Router, Switch, Route } from 'react-router';
import Main from '../Views/Main';
import Login from '../Views/Login';
import Test from '../Views/Test';
import Test1 from '../Views/Test1';

interface RouterParam {
  path?: string;
  exact?: boolean;
  auth?: string;
  component?: React.ReactNode;
  children?: RouterParam[];
}

const routes: RouterParam[] = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/test1',
    exact: true,
    component: Main,
    children: [
      {
        path: '/test1/admin',
        exact: true,
        component: Test,
      }
    ]
  },
  {
    component: Main,
    children: [
      {
        path: '/',
        exact: true,
        component: Test
      },
      {
        path: '/test',
        component: Test
      },
      {
        path: '*',
        component: Test1
      }
    ]
  }
];
/*
const Router: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Main>
          <Route exact={true} path="/" component={Test} />
          <Route exact={true} path="/test" component={Test} />
          <Route exact={true} path="/test1" component={Test1} />
          <Route path="*" component={Test} />
        </Main>
      </Switch>
    </HashRouter>
  );
};*/
export default React.createElement(Switch, {}, routes.map((route: RouterParam, k: number) => {
  React.createElement(Route, {
    render(): React.ReactNode {
      return route.component;
    }
  });
  return 1;
}));;