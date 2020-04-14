import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

const apiUrl = 'http://localhost'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<News[]> {
    return this.http.get<News[]>(apiUrl);
}

getById(id: number): Observable<News> {
  return this.http.get<News>(apiUrl + '/newslist' + id);
}

update(id, news) {
  return this.http.put(apiUrl + '/newslist' + id, news);
}


addNews(data: any) {
  return this.http.post(apiUrl, data);
}

delete(id: number) {
    return this.http.delete(apiUrl + '/newslist' + id);
}
}
