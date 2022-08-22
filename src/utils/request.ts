import { extend } from 'umi-request';
import notification from './notification';
/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // credentials: 'include', // 默认请求是否带上cookie
  // 06-16
  headers: {},
});

request.interceptors.request.use(
  (url, options) => {
    return {
      url,
      options: { ...options, headers: { ...options.headers } },
    };
  },
  { global: false },
);

request.interceptors.response.use(
  async (response) => {
    // errorHandler(response);
    if (
      response.status === 401 &&
      response.url.indexOf('admin-api') !== -1 &&
      window.location.pathname !== '/'
    ) {
      window.location.href = '/';
    }
    let res: any = {};
    try {
      // try parse response to json, if response is not json object, just ignore
      res = await response.clone().json();
    } catch (err) {
      res = {};
    }
    if (res.errorData) {
      // 如果是200 且有 errorData 说明是业务报错，提示用warnning  否则是系统报错 用error
      if (response.status === 200) {
        notification.warning({
          message:
            typeof res.errorData === 'string'
              ? res.errorData
              : JSON.stringify(res.errorData),
        });
      } else {
        notification.error({
          message:
            typeof res.errorData === 'string'
              ? res.errorData
              : JSON.stringify(res.errorData),
        });
      }
    }
    return response;
  },
  { global: false },
);

type Method =
  | 'GET'
  | 'POST'
  | 'DEFAULT'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD';

export interface APIResponse<T extends any> {
  status: string;
  data: T;
  errorData?: string | null | Record<string, any>;
  subData?: any;
  code?: string;
  type?: string;
}

export default <T extends any>(
  url: string,
  options?: Parameters<typeof request>[1] & { method?: Method },
): Promise<APIResponse<T>> => {
  return request(url, options);
};
