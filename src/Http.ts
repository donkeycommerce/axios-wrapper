/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */

import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import { AxiosHeaders } from './interfaces'
import { ResponseType, RequestMethod, GenericObject, HttpQueue } from './types'
import qs from 'qs'

class Http {
  private static token: string;

  private static instance: Http

  private axios: AxiosInstance

  private static queue: HttpQueue = {}

  private constructor (apiURL: string) {
    this.axios = axios.create({
      baseURL: apiURL
    })
  }

  public static getInstance (apiURL?: string): Http {
    if (this.instance === undefined) {
      if (apiURL) {
        this.instance = new Http(apiURL)
      } else {
        throw new Error("Please provide an api url.")
      }
    }

    return this.instance
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static buildURLQuery (obj: any) {
    return qs.stringify(obj)
  }

  public static getToken (): string {
    return this.token
  }

  public static setToken (token: string) {
    this.token = token
  }

  public static request (
    method: RequestMethod,
    endpoint: string,
    name = 'request',
    config: AxiosRequestConfig = {},
    useToken = true,
    headers: AxiosHeaders = { 'Content-Type': 'application/json' },
    responseType: ResponseType = 'json'
  ): AxiosPromise<unknown> {
    const cancelToken = axios.CancelToken.source()
    config.cancelToken = cancelToken.token
    config.method = method
    config.responseType = responseType
    config.url = endpoint
    config.headers = headers

    if (useToken) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers.Authorization = `Bearer ${this.getToken()}`
    }

    const axiosPromise = Http.getInstance().axios.request(config)

    if (this.queue[name]) {
      this.queue[name].cancelToken.cancel()
    }

    this.queue[name] = {
      promise: axiosPromise,
      cancelToken: cancelToken
    }

    return axiosPromise
  }

  public static get (
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any = {},
    name = 'request',
    config: AxiosRequestConfig = {},
    useToken = true,
    headers: AxiosHeaders = { 'Content-Type': 'application/json' },
    responseType: ResponseType = 'json'
  ): AxiosPromise<unknown> {
    const query = this.buildURLQuery(params)

    return this.request(
      'get',
      endpoint + '?' + query,
      name,
      config,
      useToken,
      headers,
      responseType
    )
  }

  public static delete (
    endpoint: string,
    id: (string | number | string[] | number[]),
    name = 'request'
  ): AxiosPromise<unknown> {
    const config: AxiosRequestConfig = {
      params: { id: id }
    }

    return this.request('delete', endpoint, name, config)
  }

  public static post (
    endpoint: string,
    data: GenericObject = {},
    name = 'request',
    config: AxiosRequestConfig = {},
    useToken = true,
    headers: AxiosHeaders = { 'Content-Type': 'application/json' },
    responseType: ResponseType = 'json'
  ): AxiosPromise<unknown> {
    config.data = data

    return this.request(
      'post',
      endpoint,
      name,
      config,
      useToken,
      headers,
      responseType
    )
  }

  public static patch (
    endpoint: string,
    data: GenericObject = {},
    name = 'request',
    config: AxiosRequestConfig = {},
    useToken = true,
    headers: AxiosHeaders = { 'Content-Type': 'application/json' },
    responseType: ResponseType = 'json'
  ): AxiosPromise<unknown> {
    config.data = data

    return this.request(
      'patch',
      endpoint,
      name,
      config,
      useToken,
      headers,
      responseType
    )
  }

  public static put (
    endpoint: string,
    data: GenericObject = {},
    name = 'request',
    config: AxiosRequestConfig = {},
    useToken = true,
    headers: AxiosHeaders = { 'Content-Type': 'application/json' },
    responseType: ResponseType = 'json'
  ): AxiosPromise<unknown> {
    config.data = data

    return this.request(
      'put',
      endpoint,
      name,
      config,
      useToken,
      headers,
      responseType
    )
  }
}

export default Http
