import axios from 'axios';

type endpointType = string;
type methodType = 'get' | 'post' | 'put' | 'delete';
type callback = (data: any, error?: boolean) => void;

const baseUrl = 'https://web-dev.dev.kimo.ai/v1';

const HttpRequest = (
  endpoint: endpointType,
  method: methodType,
  callback: callback,
  data?: any,
) => {
  axios[method](baseUrl + endpoint, data, {
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  })
    .then(res => callback(res))
    .catch(() => {
      // second parameter is considered as error
      callback(null, true);
    });
};
export default HttpRequest;
