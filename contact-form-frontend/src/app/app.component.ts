import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
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
  constructor(private router: Router) {}

  title = 'contact-form-frontend';

  isLoginPage(): boolean {
    return this.router.url === '/login'||this.router.url === '/signup' ; 
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(['/login']);

  }
}
