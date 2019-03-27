import {Component} from '@angular/core';
import {HnHttpClient, HnHttpConfig} from 'hn-http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    HnHttpConfig.builder()
      .baseUrl('https://cnodejs.org/api/v1')
      .addInterceptor({
        request: (req) => {
          console.log('请求' + req);
        },
        response: (res) => {
          console.log('回复' + res);
        }
      });
    this.getTopics().subscribe(res => {
    });
  }

  // 主题首页
  public getTopics(): Observable<any> {
    return HnHttpClient.builder()
      .url('/topics')
      .param('page', '1')
      .get<any>();
  }
}
