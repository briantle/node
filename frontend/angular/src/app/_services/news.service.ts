import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

const apiUrl = 'http://localhost:4000/news'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<News[]> {
    return this.http.get<News[]>(apiUrl);
}

getById(id: any): Observable<News> {
  return this.http.get<News>(apiUrl + '/newslist' + id);
}

update(id, news) {
  return this.http.put(apiUrl + '/' + id, news);
}


addNews(data: any) {
  return this.http.post(apiUrl + "/add", data);
}

delete(id: any) {
    return this.http.delete(apiUrl + "/" + id);
}
}
