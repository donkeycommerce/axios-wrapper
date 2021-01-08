"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
var Http = /** @class */ (function () {
    function Http() {
        this.axios = axios_1.default.create({
            baseURL: Http.apiURL
        });
    }
    Http.getInstance = function () {
        if (this.instance === undefined) {
            this.instance = new Http();
        }
        return this.instance;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Http.buildURLQuery = function (obj) {
        return qs_1.default.stringify(obj);
    };
    Http.getToken = function () {
        return this.token;
    };
    Http.setToken = function (token) {
        this.token = token;
    };
    Http.request = function (method, endpoint, name, config, useToken, headers, responseType) {
        if (name === void 0) { name = 'request'; }
        if (config === void 0) { config = {}; }
        if (useToken === void 0) { useToken = true; }
        if (headers === void 0) { headers = { 'Content-Type': 'application/json' }; }
        if (responseType === void 0) { responseType = 'json'; }
        var cancelToken = axios_1.default.CancelToken.source();
        config.cancelToken = cancelToken.token;
        config.method = method;
        config.responseType = responseType;
        config.url = endpoint;
        config.headers = headers;
        if (useToken) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            config.headers.Authorization = "Bearer " + this.getToken();
        }
        var axiosPromise = Http.getInstance().axios.request(config);
        if (this.queue[name]) {
            this.queue[name].cancelToken.cancel();
        }
        this.queue[name] = {
            promise: axiosPromise,
            cancelToken: cancelToken
        };
        return axiosPromise;
    };
    Http.get = function (endpoint, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params, name, config, useToken, headers, responseType) {
        if (params === void 0) { params = {}; }
        if (name === void 0) { name = 'request'; }
        if (config === void 0) { config = {}; }
        if (useToken === void 0) { useToken = true; }
        if (headers === void 0) { headers = { 'Content-Type': 'application/json' }; }
        if (responseType === void 0) { responseType = 'json'; }
        var query = this.buildURLQuery(params);
        return this.request('get', endpoint + '?' + query, name, config, useToken, headers, responseType);
    };
    Http.delete = function (endpoint, id, name) {
        if (name === void 0) { name = 'request'; }
        var config = {
            params: { id: id }
        };
        return this.request('delete', endpoint, name, config);
    };
    Http.post = function (endpoint, data, name, config, useToken, headers, responseType) {
        if (data === void 0) { data = {}; }
        if (name === void 0) { name = 'request'; }
        if (config === void 0) { config = {}; }
        if (useToken === void 0) { useToken = true; }
        if (headers === void 0) { headers = { 'Content-Type': 'application/json' }; }
        if (responseType === void 0) { responseType = 'json'; }
        config.data = data;
        return this.request('post', endpoint, name, config, useToken, headers, responseType);
    };
    Http.patch = function (endpoint, data, name, config, useToken, headers, responseType) {
        if (data === void 0) { data = {}; }
        if (name === void 0) { name = 'request'; }
        if (config === void 0) { config = {}; }
        if (useToken === void 0) { useToken = true; }
        if (headers === void 0) { headers = { 'Content-Type': 'application/json' }; }
        if (responseType === void 0) { responseType = 'json'; }
        config.data = data;
        return this.request('patch', endpoint, name, config, useToken, headers, responseType);
    };
    Http.put = function (endpoint, data, name, config, useToken, headers, responseType) {
        if (data === void 0) { data = {}; }
        if (name === void 0) { name = 'request'; }
        if (config === void 0) { config = {}; }
        if (useToken === void 0) { useToken = true; }
        if (headers === void 0) { headers = { 'Content-Type': 'application/json' }; }
        if (responseType === void 0) { responseType = 'json'; }
        config.data = data;
        return this.request('put', endpoint, name, config, useToken, headers, responseType);
    };
    Http.queue = {};
    Http.apiURL = '';
    return Http;
}());
exports.default = Http;
