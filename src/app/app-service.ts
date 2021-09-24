import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostData } from './app-model';

@Injectable()
export class SignUpService {

  private baseUrl = 'https://614dd48fe3cf1f001712d39c.mockapi.io';

  constructor(private http: HttpClient) {}

  sendInfo(data: IPostData) {
    let formData: any = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    const resource = data.email.startsWith('j') ? 'fail' : 'submit';

    return this.http.post(`${this.baseUrl}/${resource}`, formData, {headers});
  }
}
