import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HnInterceptors} from '../interceptor/hn.intercetor';
import {HnHttpConstants} from '../model/constants.model';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HnInterceptors,
      multi: true,
    }]
})
export class HnHttpModule {

  constructor(private httpClient: HttpClient) {
    HnHttpConstants.CLIENT = this.httpClient;
  }
}
