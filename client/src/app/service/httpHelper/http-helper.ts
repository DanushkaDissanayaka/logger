import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http'
import { IHttpRequestBuilder, HttpRequestBuilder } from "./http-request-builder";

/**
 * Helper class for send http client request
 */

@Injectable()
export class HttpHelper {
    constructor(private _http: HttpClient) {}
    api(endPoint: string): IHttpRequestBuilder {
        return new HttpRequestBuilder((window as any).host, endPoint, this._http);
    }
}