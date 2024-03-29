import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
 //  providedIn: 'root' // Make service available throughout the application
export class ContactService {
  private baseUrl = 'http://localhost:4000/api/contact'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  submitContact(name: string, email: string, mobile: string, message: string): Observable<any> {
    const body = { name, email, mobile, message }; // Data to send to the API
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl, body, { headers }); // Make POST request
  }

  // Add methods for other CRUD operations as needed (get, update, delete)
}
