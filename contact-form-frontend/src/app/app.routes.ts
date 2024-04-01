import { Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form/contact-form.component';
import { MessageListComponent } from './components/message-list/message-list/message-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserGuard } from './guards/user.guard';
import { UserLoginGuard } from './guards/userLogin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/contact-form', pathMatch: 'full' } ,
  { path: 'contact-form', component: ContactFormComponent ,canActivate:[UserGuard]},
  { path: 'edit/:id', component: ContactFormComponent ,canActivate:[UserGuard]},
  {path: 'messages',component: MessageListComponent,canActivate:[UserGuard]},
  { path: 'login', component: LoginComponent,canActivate:[UserLoginGuard] },
  { path: 'signup', component: SignupComponent ,canActivate:[UserLoginGuard] }
];

