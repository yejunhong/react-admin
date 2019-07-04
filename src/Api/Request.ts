import { notification, Modal } from 'antd';
import { Request, InterceptorsInterface } from '../Lib/Request';
import { Cache } from '../Lib/Caches';
// import JSONBigInt from 'json-bigint';

const newRequet: any = new Request({
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
      Modal.error({
        content: '登录授权已过期',
        onOk: () => {
          newRequet.Cancel();
          // 退出登录
        }
      })
    }
    return response;
  }

  /**
   * 请求错误操作
   * @param err
   */
  public Error(err: any) {
    notification.open({
      message: '错误提示',
    });
  }
}
newRequet.SetInterceptors(new Intercept());
export default newRequet;
