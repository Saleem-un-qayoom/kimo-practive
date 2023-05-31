import HttpRequest from './HttpRequest';
type callbackType = (res: any, error?: boolean) => void;

export const HighLightsListApi = (callback: callbackType) =>
  HttpRequest('/highlights', 'get', callback);

export const HighLightsDetailsApi = (
  activity: string,
  callback: callbackType,
) => HttpRequest('/activities/' + activity, 'get', callback);

export const CategoryListApi = (callback: callbackType) =>
  HttpRequest('/categories', 'get', callback);
