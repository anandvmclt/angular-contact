import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contact-form-frontend';
}
