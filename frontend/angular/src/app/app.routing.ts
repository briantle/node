import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { AuthGuard } from './_helpers';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'addnews', component: AddNewsComponent },
    { path: 'newslist', component: NewsListComponent },
    { path: 'editnews', component: NewsEditComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);