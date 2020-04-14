import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//fake backend
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddNewsComponent,
    NewsListComponent,
    NewsEditComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
