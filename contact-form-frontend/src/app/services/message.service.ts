import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message'; // Import the interface
import { Observable } from 'rxjs'; // Import Observable


const baseUrl = 'http://localhost:4000/api/messages'; // Replace with your actual API endpoint

@Injectable({
  providedIn: 'root' // Assuming this service is used across components
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(baseUrl); // Adjust the type based on your API response
  }
}
