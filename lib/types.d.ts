import { AxiosRunningRequest } from './interfaces';
export declare type ResponseType = 'json' | 'blob';
export declare type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export declare type GenericObject = {
    [key: string]: unknown;
};
export declare type HttpQueue = {
    [key: string]: AxiosRunningRequest;
};
