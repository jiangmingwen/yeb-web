import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'

function request<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    axios({
      url,
      ...options
    })
      .then(parseData)
      .then((res) => {
        if (res.code === 200) {
          resolve(res.data as T)
        } else {
          ElNotification({
            type: 'error',
            title: res.code,
            message: res?.message
          })
          reject(res.data)
        }
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data || {}
        ElNotification({
          type: 'error',
          title: data.code,
          message: data?.message
        })
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

function parseData(response: AxiosResponse) {
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
