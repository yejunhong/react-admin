import React from 'react';
import {HashRouter} from 'react-router-dom';
import { Switch, Route, RouteComponentProps } from 'react-router';
import Main from '../Views/Main';
import Login from '../Views/Login';
import Test from '../Views/Test';
import Test1 from '../Views/Test1';

interface RouterParam {
  path?: string;
  exact?: boolean;
  auth?: string;
  component: React.ReactNode;
  children?: RouterParam[];
}

const childrenR: RouterParam[] =  [
  {
    path: '/test001',
    component: Test
  },
  {
    path: '/test002',
    component: Test1
  },
];

const routes: RouterParam[] = [
  { path: '/login', component: Login },
  { component: Main, children: childrenR }
];

// 迭代路由
const SwitchRoute = React.createElement(Switch, {}, routes.map((route: RouterParam, k: number) => {
  if (route.path === undefined && route.children !== undefined) {
    const childrenRoute: React.ReactNode = route.children.map((children: RouterParam, ck: number) => {
      return React.createElement(Route, {
        key: k + ck,
        path: children.path,
        exact: true,
        render(props: RouteComponentProps): React.ReactNode {
          // 授权
          console.log(props);
          return React.createElement(children.component as any);
        }
      });
    });
    return React.createElement(route.component as any, {key: 1}, childrenRoute);
  }
  return React.createElement(Route, {
    key: k,
    path: route.path,
    exact: true,
    render(props: RouteComponentProps): React.ReactNode {
      return React.createElement(route.component as any);
    }
  });
}))

export default React.createElement(HashRouter, {}, SwitchRoute);