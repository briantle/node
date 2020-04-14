import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/_services/news.service';
import { HttpClient } from '@angular/common/http';

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

    this.httpService.get('').subscribe(
      data => {
        this.news = data as string [];	 
      },
      () => {
        console.log('cant find data')
        })
      }   


  handleDelete() {
    this.newsService.delete(this.userList.id)
      .subscribe(
        () => {
          console.log('News Deleted!')
          })

        }


}
