import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable()
 //  providedIn: 'root' // Make service available throughout the application
export class ContactService {
  private baseUrl = 'http://localhost:4000/api/contact/'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  submitContact(name: string, email: string, mobile: string, message: string): Observable<Message> {
    const body = { name, email, mobile, message }; // Data to send to the API
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Message>(this.baseUrl, body, { headers }); // Make POST request
  }

  updateContact(id: string,  name: string, email: string, mobile: string, message: string): Observable<Message> {
    const body = { name, email, mobile, message }; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Message>(this.baseUrl+id, body, { headers }); // Make put request
  }
  deleteContact(id: string): Observable<any> {
    return this.http.delete(this.baseUrl+id); 
  }
}
