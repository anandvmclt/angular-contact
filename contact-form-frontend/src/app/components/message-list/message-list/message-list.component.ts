import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios'; // Import Axios
import { Router } from '@angular/router';
import { ContactService } from '../../../services/contact.service';

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
  imports: [CommonModule],
  providers: [ContactService],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []; // Initialize as an empty array
  id: string | null = null;
  showAlert = false;
  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    axios
      .get<Message[]>('http://localhost:4000/api/contacts') // Replace with your API endpoint
      .then((response) => {
        console.log('API Data :', response.data);
        this.messages = response.data; // Update the messages array
      })
      .catch((error) => {
        console.error('Error fetching messages:', error); // Handle errors
      });
  }

  redirectToEdit(id: string) {
    this.router.navigate(['/edit/', id]);
  }

  deleteMessage(id: string) {
    this.id = id;
    this.showAlert = true;
  }
  confirm() {
    if (this.id) {
      this.contactService.deleteContact(this.id).subscribe((res) => {
        const data=this.messages.filter((item)=> item._id!==this.id)
        this.id = null;
        this.showAlert = false;
        this.messages=data
      });
    }
  }

  cancel() {
    this.id = null;
    this.showAlert = false;
  }
}
