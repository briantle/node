import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

const apiUrl = 'http://localhost'

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  addQuery(data: any) {
    return this.http.post(apiUrl, data);
  }
}
