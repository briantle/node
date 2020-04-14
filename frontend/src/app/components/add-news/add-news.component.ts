import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  title: string = '';
	description: string = '';
	url: string = '';
	urlToImage: string = '';
  publishedAt: string = '';

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewNews() {
    const data = {
      title: this.title,
      description: this.description,
      url: this.url,
      urlToImage: this.urlToImage,
      publishedAt: this.publishedAt
    }
    console.log(data);
    this.newsService.addNews(data).subscribe(() => {
      this.router.navigate(['/signin'])
    },
    () => {
      console.log("Failed to add news")
    })

  }

}
