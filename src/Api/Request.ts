import router from '../router/index';
import { Notification, MessageBox } from 'element-ui';
import { Request, InterceptorsInterface } from '@/lib/request';
import { Cache } from '@/lib/caches';
import JSONBigInt from 'json-bigint';

let newRequet: any = new Request({
  baseURL: process.env.VUE_APP_API_URL, //
  // baseURL: '/MuzenBAS',
  timeout: 3000, // 请求超时时间 毫秒
  /*transformResponse: [
    (data: any) => {
      return JSONBigInt.parse(data);
    }
  ]*/
});

class Intercept implements InterceptorsInterface {

  /**
   * 请求拦截
   * @param Request
   */
  public RequestIntercept(config: any) {
    config.headers.Token = Cache.Get('token');
    return config;
  }

  /**
   * 响应拦截
   * @param response
   */
  public ResponseIntercept(response: any) {
    if (response.data.code === 10004) {
      MessageBox({
        title: '授权提示',
        message: '登录授权已过期',
        type: 'warning',
        confirmButtonText: '重新登录',
      }).then(() => {
        // alert(1)
        newRequet.Cancel();
        router.push('/login');
      });
    }
    return response;
  }

  /**
   * 请求错误操作
   * @param err
   */
  public Error(err: any) {
    Notification({
      title: '错误提示',
      message: err,
      type: 'error',
      position: 'top-right',
      duration: 3000,
    });
  }
}
newRequet.SetInterceptors(new Intercept());
export default newRequet;
