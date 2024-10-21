import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';

    const spyOnCreateInstance = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(spyOnCreateInstance).lastCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const axiosOnGet: jest.SpyInstance = jest.spyOn(
      axios.Axios.prototype,
      'get',
    );

    await throttledGetDataFromApi(relativePath);

    expect(axiosOnGet).lastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = {
      id: 1,
      title: 'Welcome to the node course.',
    };

    const axiosOnGet: jest.SpyInstance = jest.spyOn(
      axios.Axios.prototype,
      'get',
    );
    axiosOnGet.mockResolvedValue({ data: mockResponseData });

    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toEqual(mockResponseData);
  });
});
