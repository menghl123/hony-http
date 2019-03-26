import {HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';

export interface HnHttpInterceptor {
  request?: (option: HttpRequest<any>) => HttpRequest<any> | void;
  response?: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>) => HttpEvent<any> | void;
}
