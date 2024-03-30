import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios'; // Import Axios

interface Message {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
}

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []; // Initialize as an empty array

  constructor() { } // Remove unused MessagesService injection

  ngOnInit(): void {
    axios.get<Message[]>('http://localhost:4000/api/contacts') // Replace with your API endpoint
      .then(response => {
        console.log("API Data :", response.data);
        this.messages = response.data; // Update the messages array
      })
      .catch(error => {
        console.error('Error fetching messages:', error); // Handle errors
      });
  }
}
