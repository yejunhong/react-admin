import Main from '../Views/Main';
import Login from '../Views/Login';
import Test from '../Views/Test';
import Test1 from '../Views/Test1';
const router = [
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/test1',
    exact: true,
    component: Main,
    routes: [
      {
        path: '/test1/admin',
        exact: true,
        component: Test
      }
    ]
  },
  {
    component: Main,
    routes: [
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

export default router;