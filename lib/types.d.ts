import { AxiosRunningRequest } from './interfaces';
import { AxiosResponse } from "axios";
export declare type ResponseType = 'json' | 'blob';
export declare type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export declare type GenericObject = {
    [key: string]: unknown;
};
export declare type HttpQueue = {
    [key: string]: AxiosRunningRequest;
};
export declare type ErrorResponse = {
    errors: Record<string, string>;
};
export interface Identifiable {
    id: string | number;
    [key: string]: unknown;
}
export declare type CallbackAxiosResponse = (res: AxiosResponse) => void;
