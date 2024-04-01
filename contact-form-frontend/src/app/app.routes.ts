import { Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form/contact-form.component';
import { MessageListComponent } from './components/message-list/message-list/message-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contact-form', pathMatch: 'full' },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'edit/:id', component: ContactFormComponent },
  {path: 'messages',component: MessageListComponent,},
];
