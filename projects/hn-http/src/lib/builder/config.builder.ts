import {HnHttpInterceptor} from '../model/interceptor.model';
import {HttpRequest} from '@angular/common/http';

export class HttpConfigBuilder {
  public static interceptors: HnHttpInterceptor[] = [];
  public static globalBaseUrl = '';

  constructor() {
  }

  public baseUrl(baseUrl: string, excludes: RegExp[] = []): HttpConfigBuilder {
    HttpConfigBuilder.globalBaseUrl = baseUrl;

    HttpConfigBuilder.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url)) {
          return request;
        }

        const excludeUrl = excludes.some(t => t.test(request.url));
        if (excludeUrl) {
          return request;
        }

        baseUrl = baseUrl.replace(/\/$/, '');
        const url = request.url.replace(/^\//, '');
        return request.clone({url: `${baseUrl}/${url}`});
      }
    });

    return this;
  }

  public addInterceptor(interceptor: HnHttpInterceptor): HttpConfigBuilder {
    HttpConfigBuilder.interceptors.push(interceptor);
    return this;
  }
}
