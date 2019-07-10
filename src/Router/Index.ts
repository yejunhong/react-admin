import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route, RouteComponentProps } from 'react-router';
import Main from '../Views/Main';
import Login from '../Views/Login';

import AppEdition from '../Views/System/AppEdition';
import AppFeedback from '../Views/System/AppFeedback';
import AppHelp from '../Views/System/AppHelp';
import AppHotword from '../Views/System/AppHotword';
import AppRecommend from '../Views/System/AppRecommend';
import Auth from '../Views/System/Auth';
import Logs from '../Views/System/Logs';
import MessageAd from '../Views/System/MessageAd';
import MessageApp from '../Views/System/MessageApp';
import MessageCenter from '../Views/System/MessageCenter';
import MessageTemplate from '../Views/System/MessageTemplate';
import User from '../Views/System/User';
import UserRole from '../Views/System/UserRole';

interface RouterParam {
  path?: string;
  exact?: boolean;
  auth?: string;
  component: React.ReactNode;
  children?: RouterParam[];
}

const childrenR: RouterParam[] =  [

  // App设置
  { path: "/app/edition",  component: AppEdition },
  { path: "/app/hotword", component: AppHotword },
  { path: "/app/help", component: AppHelp },
  { path: "/app/feedback", component: AppFeedback },
  { path: "/app/recommend", component: AppRecommend },

  // 推送管理
  { path: "/message/app",  component: MessageApp },
  { path: "/message/ad", component: MessageAd },
  { path: "/message/template", component: MessageTemplate },
  { path: "/message/center", component: MessageCenter },

  // 系统管理
  { path: "/auth",  component: Auth },
  { path: "/user/role", component: UserRole },
  { path: "/user", component: User },
  { path: "/system/logs", component: Logs }

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

export default React.createElement(BrowserRouter, {}, SwitchRoute);