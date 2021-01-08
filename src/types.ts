import { AxiosRunningRequest } from './interfaces'

export type ResponseType = 'json' | 'blob'

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type GenericObject = { [key: string]: unknown }

export type HttpQueue = { [key: string]: AxiosRunningRequest }
