import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { AxiosHeaders } from './interfaces';
import { ResponseType, RequestMethod, GenericObject } from './types';
declare class Http {
    private static token;
    private static instance;
    private axios;
    private static queue;
    static apiURL: string;
    private constructor();
    static getInstance(): Http;
    static buildURLQuery(obj: any): string;
    static getToken(): string;
    static setToken(token: string): void;
    static request(method: RequestMethod, endpoint: string, name?: string, config?: AxiosRequestConfig, useToken?: boolean, headers?: AxiosHeaders, responseType?: ResponseType): AxiosPromise<unknown>;
    static get(endpoint: string, params?: any, name?: string, config?: AxiosRequestConfig, useToken?: boolean, headers?: AxiosHeaders, responseType?: ResponseType): AxiosPromise<unknown>;
    static delete(endpoint: string, id: (string | number | string[] | number[]), name?: string): AxiosPromise<unknown>;
    static post(endpoint: string, data?: GenericObject, name?: string, config?: AxiosRequestConfig, useToken?: boolean, headers?: AxiosHeaders, responseType?: ResponseType): AxiosPromise<unknown>;
    static patch(endpoint: string, data?: GenericObject, name?: string, config?: AxiosRequestConfig, useToken?: boolean, headers?: AxiosHeaders, responseType?: ResponseType): AxiosPromise<unknown>;
    static put(endpoint: string, data?: GenericObject, name?: string, config?: AxiosRequestConfig, useToken?: boolean, headers?: AxiosHeaders, responseType?: ResponseType): AxiosPromise<unknown>;
}
export default Http;
