import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  baseUrl = 'http://localhost/s5_api/';

  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  get(query: string) {
    return this.http.get(this.baseUrl + query);
  }

  post(query: string, arr: any) {
    return this.http.post(this.baseUrl + query, arr);
  }

  put(query: string, arr: any) {
    return this.http.put(this.baseUrl + query, arr);
  }

}
