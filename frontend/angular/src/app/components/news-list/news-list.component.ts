import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/_services/news.service';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:4000/news'

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

  searchText = '';
  @Input() userList: News;
  news: string [];

 

  constructor(private newsService: NewsService, private httpService: HttpClient) { }

  ngOnInit(): void {

    
    this.httpService.get(apiUrl + "/").subscribe(
      data => {
        this.news = data as string [];	 
      },
      () => {
        console.log('cant find data')
        })
        
    }   





}
