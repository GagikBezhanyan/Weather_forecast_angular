import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class RequestService {

  constructor(public http: HttpClient) { }

  getData(url: string): Observable<any> {
    let header = new HttpHeaders({'Accept-language': 'en'})
    return this.http.get(url, {headers: header});
  }

}
