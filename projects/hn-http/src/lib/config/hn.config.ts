import {HnHttpInterceptor} from '../model/interceptor.model';
import {HttpRequest} from '@angular/common/http';
import {HnHttpConstants} from '../model/constants.model';

export class HnHttpConfig {

  public static builder(): HnHttpConfig {
    return new HnHttpConfig();
  }

  public baseUrl(baseUrl: string, excludes: RegExp[] = []): HnHttpConfig {
    HnHttpConstants.GLOBAL_BASE_URL = baseUrl;

    HnHttpConstants.INTERCEPTORS.push({
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

  public addInterceptor(interceptor: HnHttpInterceptor): HnHttpConfig {
    HnHttpConstants.INTERCEPTORS.push(interceptor);
    return this;
  }

  public addRequestInterceptor(reqInterceptor: (req) => any): HnHttpConfig {
    this.addInterceptor({request: reqInterceptor});
    return this;
  }

  public addResponseInterceptor(resInterceptor: (res) => any): HnHttpConfig {
    this.addInterceptor({response: resInterceptor});
    return this;
  }

}
