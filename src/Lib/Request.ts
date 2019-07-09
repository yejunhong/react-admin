import {AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import axios from 'axios';
import qs from 'qs';

// 用于取消所有请求
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

interface Interceptors { // 拦截器
  Request(config: AxiosRequestConfig): AxiosRequestConfig;
  Response(config: AxiosResponse): AxiosResponse;
  Error(err: AxiosError): void;
}

class Request {

  public RequestObject: AxiosInstance;
  public Interceptors!: Interceptors;

  /**
   * 实例一个请求
   */
  public constructor(param: AxiosRequestConfig) {
    this.RequestObject = axios.create(param);
  }

  public SetInterceptors(interceptors: Interceptors) {
    this.Interceptors = interceptors;
  }

  /**
   *
   * 设置请求拦截器
   */
  public SetRequestInterceptors() {
    // 添加请求拦截器
    this.RequestObject.interceptors.request.use((config: any) => {
      // 在发送请求之前做某事
      config.cancelToken = source.token;
      return this.Interceptors.Request(config);
    }, (error: any) => {
      // 请求错误时做些事
      this.Interceptors.Error(error);
    });
  }

  /**
   *
   * 设置请求响应拦截器
   */
  public SetResponseInterceptors() {
    // 添加响应拦截器
    this.RequestObject.interceptors.response.use((response: any) => {
      // 对响应数据做些事
      return this.Interceptors.Response(response);
    }, (error: any) => {
      // 请求错误时做些事
      this.Interceptors.Error(error);
    });
    return this;
  }

  /**
   *
   * get请求
   * @param url 请求的url
   * @param param 请求的参数
   *
   */
  public async Get(url: string, param?: any): Promise<any> {
    const res = await this.RequestObject.get(url, {params: param});
    return res.data;
  }

  /**
   *
   * post请求
   * @param url 请求的url
   * @param param 请求的参数
   * @param body 是否通过body传输内容
   *
   */
  public async Post(url: string, param?: any, body: boolean = true): Promise<any> {
    let content = param;
    if (body === false) {
      content = qs.stringify(param);
    }
    const res = await this.RequestObject.post(url, content);
    return res.data;
  }

  /**
   * 取消所有请求
   */
  public Cancel() {
    source.cancel();
  }

}

export {
  Request,
  Interceptors,
};
