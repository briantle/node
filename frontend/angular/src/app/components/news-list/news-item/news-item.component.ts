import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/_services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  @Input() newsItem: News;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {

  }

  handleDelete()
  {
    this.newsService.delete(this.newsItem._id).subscribe()
    this.router.navigate(["/"])
  }

  handleEdit(){
    
  }

}
