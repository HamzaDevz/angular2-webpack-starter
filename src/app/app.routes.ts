import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { QuestionComponent } from './question/question.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'question', component: QuestionComponent },
];
