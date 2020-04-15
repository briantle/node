import { Component, OnInit } from '@angular/core';
import {NewsService} from 'src/app/_services/news.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  _id;
  title;
  description;
  publishedAt;

  constructor(private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params.id
  }

  onEditSubmit(){
    const news = {
        title: this.title,
        description: this.description,
        publishedAt: this.publishedAt
    }

    console.log("what is the id: " + this._id)

    this.newsService.update(this._id, news).subscribe();
    this.router.navigate(['/']);
  }

}
