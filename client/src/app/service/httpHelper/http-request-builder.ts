import { ErrorCallback, HttpCallback } from './http-helper-types';
import { HttpClient, HttpHeaders } from '@angular/common/http'

export interface IHttpRequestBuilder {
    endpoint(url: string): IHttpRequestBuilder
    httpHeader(name: string, value: string): IHttpRequestBuilder
    unauthorized(): IHttpRequestBuilder
    haveJson(): IHttpRequestBuilder
    getJson(): IHttpRequestBuilder
    payload(data: any): IHttpRequestBuilder
    get<T, E>(response: HttpCallback<T>, error: ErrorCallback<E>): any
    post<T, E>(response: HttpCallback<T>, error: ErrorCallback<E>): any
    patch(): any
    delete(): any
}

interface IRequest {
    headers: Array<{ name: string, value: string }>
    url: string
    auth: boolean
}

export class HttpRequestBuilder implements IHttpRequestBuilder {
    private _baseUrl: string;
    private _http: HttpClient;
    private _endPoint: string;
    private _request: IRequest = { headers: [], url: "", auth: true };
    private _payload: any;

    constructor(baseUrl: string, endPoint: string, http: HttpClient) {
        this._baseUrl = baseUrl;
        this._http = http;
        this._endPoint = endPoint;
    }
    private Options(): HttpHeaders {
        /**
         * collect build options
         * Headers , Auth, Etc..
         * */
        var headers = new HttpHeaders();

        //Make authorization header if auth available
        if (this._request.auth) {
            // get the auth token and set it  to header
        }

        // append headers to request options
        this._request.headers.forEach(e => {
            headers = headers.append(e.name, e.value);
        });
        return headers;
    }

    payload(data: any): IHttpRequestBuilder {
        this._payload = data;
        return this;
    }
    unauthorized(): IHttpRequestBuilder {
        this._request.auth = false;
        return this;
    }
    httpHeader(name: string, value: string): IHttpRequestBuilder {
        this._request.headers.push({ name: name, value: value });
        return this;
    }
    endpoint(url: string): IHttpRequestBuilder {
        this._endPoint = url;
        return this;
    }
    haveJson(): IHttpRequestBuilder {
        this._request.headers.push({ name: "Content-Type", value: "application/json" })
        return this;
    }
    getJson(): IHttpRequestBuilder {
        this._request.headers.push({ name: "Accept", value: "application/json" })
        return this;
    }
    patch() {
        throw new Error("Method not implemented.");
    }
    delete() {
        throw new Error("Method not implemented.");
    }
    get<T, E>(response: HttpCallback<T>, error: ErrorCallback<E>) {
        this._http.get(this._baseUrl + this._endPoint, { headers: this.Options() }).subscribe((res) => {
            //map response into response model
            response(res as T);
        }, (e) => {
            //map error into error model
            error(e)
        });
    }
    post<T, E>(response: HttpCallback<T>, error: ErrorCallback<E>) {
        const subscription = this._http.post(this._baseUrl + this._endPoint, this._payload, { headers: this.Options() }).subscribe((res) => {
            //map response into response model
            response(res as T);
        }, (e) => {
            //End subscription
            subscription.unsubscribe();
            //map error into error model
            error(e)
        });
    }
}