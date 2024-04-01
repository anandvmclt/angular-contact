import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from 'axios'; // Import Axios
import { Router } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { ContactFormComponent } from '../../contact-form/contact-form/contact-form.component';

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
  imports: [CommonModule,ContactFormComponent],
  providers: [ContactService],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []; // Initialize as an empty array
  id: string | null = null;
  editMessage:Message | null =null
  showAlert = false;
  edit = false;
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

  redirectToEdit(id: Message) {
    this.edit=true
    this.editMessage=id
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

  onEditClose(message:null|Message) {
    if(message){
      let index = this.messages.findIndex((item)=> item._id === message._id);
      if(index !== -1) {
        this.messages[index] = message;
      }
    }
    this.edit = false; 
  }
}
