import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HnHttpConstants} from '../model/constants.model';
import {HnHttpMethod, HnHttpObserve, HnHttpResponseType} from '../model/enums.model';
import {Observable} from 'rxjs';

export const builder = (): HnHttpClient => new HnHttpClient();

@Injectable({
  providedIn: 'root'
})
export class HnHttpClient {
  private hnHttpMethod: HnHttpMethod;
  private httpUrl: string;
  private httpExtra: string;

  public options: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: HnHttpObserve;
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: HnHttpResponseType;
    withCredentials?: boolean;
  } = {} as any;

  public static builder(): HnHttpClient {
    return new HnHttpClient();
  }

  public constructor() {
  }

  url(url: string): HnHttpClient {
    this.httpUrl = url;
    return this;
  }

  extra(extra: string): HnHttpClient {
    this.httpExtra = extra;
    return this;
  }

  body(body: any): HnHttpClient {
    this.options.body = body;
    return this;
  }

  header(key: string, value: any): HnHttpClient {
    (this.options.headers as HttpHeaders).set(key, value);
    return this;
  }

  headers(headers: HttpHeaders | { [p: string]: string | string[] }): HnHttpClient {
    this.options.headers = headers;
    return this;
  }

  observe(observe: HnHttpObserve): HnHttpClient {
    this.options.observe = observe;
    return this;
  }

  params(params: HttpParams | { [p: string]: string | string[] }): HnHttpClient {
    this.options.params = params;
    return this;
  }

  param(key: string, value: string | string[]): HnHttpClient {
    this.options.params = this.options.params || {};
    this.options.params[key] = value;
    return this;
  }

  reportProgress(reportProgress: boolean): HnHttpClient {
    this.options.reportProgress = reportProgress;
    return this;
  }

  responseType(responseType: HnHttpResponseType): HnHttpClient {
    this.options.responseType = responseType;
    return this;
  }

  withCredentials(withCredentials: boolean): HnHttpClient {
    this.options.withCredentials = withCredentials;
    return this;
  }

  delete<T>(): Observable<T> {
    return this.method(HnHttpMethod.DELETED);
  }

  get<T>(): Observable<T> {
    return this.method(HnHttpMethod.GET);
  }

  method<T>(method: HnHttpMethod): Observable<T> {
    this.hnHttpMethod = method;
    if (!HnHttpConstants.CLIENT) {
      throw new Error('etHttpClient is not init');
    }
    if (!this.hnHttpMethod) {
      throw new Error('etHttpClient should request with method');
    }

    if (!this.httpUrl) {
      throw new Error('etHttpClient should request with url');
    }

    if (this.httpExtra) {
      this.options.params = this.options.params || {};
    }

    return HnHttpConstants.CLIENT.request<T>(this.hnHttpMethod, this.httpUrl, this.options as any) as any;
  }

  post<T>(): Observable<T> {
    return this.method(HnHttpMethod.POST);
  }

  put<T>(): Observable<T> {
    return this.method(HnHttpMethod.PUT);
  }


}
