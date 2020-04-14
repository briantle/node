import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';

const routes: Routes = [
  { path: 'addnews', component: AddNewsComponent },
  { path: 'newslist', component: NewsListComponent },
  { path: 'editnews', component: NewsEditComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AddNewsComponent,
    NewsListComponent,
    NewsEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
