import { AxiosRunningRequest } from './interfaces'
import { AxiosResponse } from "axios"

export type ResponseType = 'json' | 'blob'

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type GenericObject = { [key: string]: unknown }

export type HttpQueue = { [key: string]: AxiosRunningRequest }

export type ErrorResponse = {
  errors: Record<string, string>
}

export interface Identifiable {
  id: string|number,
  [key: string]: unknown
}

export type CallbackAxiosResponse = (res: AxiosResponse) => void
