import { notification, Modal } from 'antd';
import { Request as CreateRequet } from '../Lib/Request';
import { Cache } from '../Lib/Caches';
import {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
// import JSONBigInt from 'json-bigint';

const NewCreateRequet: any = new CreateRequet({
  baseURL: process.env.VUE_APP_API_URL, //
  // baseURL: '/MuzenBAS',
  timeout: 3000, // 请求超时时间 毫秒
  /*transformResponse: [
    (data: any) => {
      return JSONBigInt.parse(data);
    }
  ]*/
});

// 请求拦截
const Request = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers.Token = Cache.Get('token');
  return config;
};

// 响应拦截
const Response = (response: AxiosResponse): AxiosResponse => {
  if (response.data.code === 10004) {
    NewCreateRequet.Cancel();
    Modal.error({
      content: '登录授权已过期',
      onOk() {
        // 退出登录
      }
    })
  }
  return response;
};

// 请求错误操作
const Error = (err: AxiosError): void => {
  console.log(err);
  notification.open({message: '错误提示'});
};

NewCreateRequet.SetInterceptors({Request, Response, Error});
export default NewCreateRequet;
