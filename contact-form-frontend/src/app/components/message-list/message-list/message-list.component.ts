import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { ContactFormComponent } from '../../contact-form/contact-form/contact-form.component';
import { MessagesService } from '../../../services/message.service';

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
  imports: [CommonModule, ContactFormComponent],
  providers: [ContactService],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []; // Initialize as an empty array
  id: string | null = null;
  editMessage: Message | null = null;
  showAlert = false;
  edit = false;
  constructor(
    private messagesService: MessagesService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe((data) => {
      this.messages = data;
    },(error) => {
      console.error('Error fetching messages:', error);
    });
  }

  onEditMessage(message: Message) {
    this.edit = true;
    this.editMessage = message;
  }

  deleteMessage(id: string) {
    this.id = id;
    this.showAlert = true;
  }
  confirm() {
    if (this.id) {
      this.contactService.deleteContact(this.id).subscribe((res) => {
        const data = this.messages.filter((item) => item._id !== this.id);
        this.id = null;
        this.showAlert = false;
        this.messages = data;
      },(error) => {
        console.error('Error fetching messages:', error);
      });
    }
  }

  cancel() {
    this.id = null;
    this.showAlert = false;
  }

  onEditClose(message: null | Message) {
    if (message) {
      let index = this.messages.findIndex((item) => item._id === message._id);
      if (index !== -1) {
        this.messages[index] = message;
      }
    }
    this.edit = false;
  }
}
