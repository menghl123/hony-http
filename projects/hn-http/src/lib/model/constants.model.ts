import {HttpClient} from '@angular/common/http';
import {HnHttpInterceptor} from './interceptor.model';

export class HnHttpConstants {
  public static CLIENT: HttpClient = null;
  public static INTERCEPTORS: HnHttpInterceptor[] = [];
  public static GLOBAL_BASE_URL = '';
}
