import { AxiosPromise, CancelTokenSource } from 'axios'

export interface AxiosRunningRequest {
  promise: AxiosPromise
  cancelToken: CancelTokenSource
}

export interface AxiosHeaders {
  'Content-Type': string,
  'Authorization'?: string
}
