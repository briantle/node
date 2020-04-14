import { Component, OnInit } from '@angular/core';
import {NewsService} from 'src/app/services/news.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  id;
  title;
  description;
  publishedAt;

  constructor(private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.newsService.getById(this.id).subscribe(news => {
      this.title = news.title;
      this.description = news.description;
      this.publishedAt = news.publishedAt;
    });
  }

  onEditSubmit(){
    let news = {
        title: this.title,
        description: this.description,
        publishedAt: this.publishedAt
    }

    this.newsService.update(this.id, news);
    this.router.navigate(['/newslist']);
  }

}
