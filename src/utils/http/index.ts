import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'
import { local } from '../storage'

function request<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axios({
      baseURL: '/api',
      url,
      ...options,
      headers: {
        ...options?.headers,
        Authorization:
          local.getItem('TOKENHEAD', '') + ' ' + local.getItem('TOKEN', '')
      }
    })
      .then((response) => parseData<T>(response))
      .then((res) => {
        if (res.code === 200) {
          resolve(res.data)
        } else {
          ElNotification({
            type: 'error',
            title: res.code + '',
            message: res?.message
          })
          reject(res.data)
        }
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data

        if (data) {
          ElNotification({
            type: 'error',
            title: data.code,
            message: data?.message
          })
        } else {
          ElNotification({
            type: 'error',
            title: err?.response?.status + '' || '请求数据错误',
            message: err?.response?.statusText || '未知错误'
          })
        }
        reject(err.response)
      })
  })
}

function getMethod<T>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return request<T>(url, { ...options, params, method: 'GET' })
}

function postMethod<T>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return request<T>(url, { ...options, data, method: 'POST' })
}

function deleteMethod<T>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return request<T>(`${url}/${params}`, { ...options, method: 'DELETE' })
}

function putMethod<T>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return request<T>(url, { ...options, data, method: 'PUT' })
}

export interface IhttpData<T> {
  code: number
  data: T
  message: string
}

function parseData<T>(response: AxiosResponse): IhttpData<T> {
  return response.data
}

export const http = {
  request,
  get: getMethod,
  post: postMethod,
  delete: deleteMethod,
  put: putMethod
}

export default http
