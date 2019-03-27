# hn-http

> http builder lib for Angular `HttpClient`

===============================

Thanks [NG-ZORRO/rebirth-http](https://github.com/NG-ZORRO/rebirth-http) given us the inspiration.

## Install
```bash
npm install hn-http --save
```

## How to use?

### Register `HnHttpModule`

```typescript
    import { HnHttpModule } from 'hn-http';
    
    @NgModule({
      imports: [
        BrowserModule,
        HnHttpModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ...ENV_PROVIDERS,
        ...APP_PROVIDERS
      ],
      bootstrap: [
        AppComponent
      ]
    })
    export class AppModule {
    }


```
   
### rebirth-http service

```typescript
    import {HnHttpClient} from 'hn-http';
    import { Observable } from 'rxjs/Observable';
    import { HttpClient } from '@angular/common/http';

    @Injectable()
    export class ArticleService {
      
      getArticles(pageIndex = 1,pageSize = 10): Observable<SearchResult<Article>> {
        return HnHttpClient.builder() // u can only use builder();
              .url('article')
              .param('pageIndex', pageIndex)
              .param('pageSize', pageSize)
              .get<SearchResult<Article>>();
      }
    
      getArticleByUrl(articleUrl: string): Observable<Article> {
        return  builder() 
                  .url(`article/${articleUrl}`)
                  .get<Article>();
      }
      
      createArticle( article: Article): Observable<void> {
        return  builder() 
                  .url(`article`)
                  .body(article)
                  .post<void>();
      }
      
      updateArticle( id: string,  article: Article): Observable<Article> {
        return  builder() 
                .url(`article/${id}`)
                .body(article)
                .put<Article>();
      }
      
      deleteArticleById(id: string): Observable<Article> {
        return  builder() 
                  .url(`article/${id}`)
                  .delete<Article>(); 
      }
      
      upload(formData:FormData) : Observable<any> {
        return  builder() 
                  .url('file/upload')
                  .body(formData)
                  .post<any>(); 
      }
    }
```

### Global interceptors

```typescript
    import {HnHttpConfig} from 'hn-http';
    
    @Component({
      selector: 'app',
      pipes: [],
      providers: [],
      directives: [],
      styles: [
        require('./app.scss')
      ],
      template: '<router-outlet></router-outlet>'
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
      }
    }
```   

## API Docs

### HnHttpConfig

#### Methods:
- `builder(): HnHttpConfig`: returns a new instance
- `baseUrl(baseUrl: string, excludes: RegExp[] = []): HnHttpConfig`: set the base url of HnHttp
- `addInterceptor(interceptor: HnHttpInterceptor): HnHttpConfig`: set the global interceptors of HnHttp


### HnHttpClient

#### Methods:
- `url(url: string): HnHttpClient`
- `extra(extra: string): HnHttpClient`
- `body(body: any): HnHttpClient`
- `header(key: string, value: any): HnHttpClient`
- `headers(headers: HttpHeaders | { [p: string]: string | string[] }): HnHttpClient`
- `observe(observe: HnHttpObserve): HnHttpClient`
- `params(params: HttpParams | { [p: string]: string | string[] }): HnHttpClient`
- `param(key: string, value: string | string[]): HnHttpClient`
- `reportProgress(reportProgress: boolean): HnHttpClient`
- `responseType(responseType: HnHttpResponseType): HnHttpClient`
- `withCredentials(withCredentials: boolean): HnHttpClient`
- `delete<T>(): Observable<T>`
- `get<T>(): Observable<T>`
- `post<T>(): Observable<T>`
- `method<T>(method: HnHttpMethod): Observable<T>`
- `put<T>(): Observable<T>`
