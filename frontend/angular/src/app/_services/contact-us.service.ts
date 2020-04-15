import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

const apiUrl = 'http://localhost:4000/contactus'

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  addNewQuery(data: any) {
    return this.http.post(apiUrl + "/add", data);
  }
}
