import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuthGuard } from './_helpers';
import { SportsComponent } from './components/sports/sports.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';



const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'addnews', component: AddNewsComponent, canActivate: [AuthGuard] },
    { path: 'newslist', component: NewsListComponent, canActivate: [AuthGuard] },
    { path: 'editnews/:id', component: NewsEditComponent, canActivate: [AuthGuard] },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'sports', component: SportsComponent },
    { path: 'chat', component: ChatBoxComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
