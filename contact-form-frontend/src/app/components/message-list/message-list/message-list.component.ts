import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../../services/message.service';

interface Message {
  id: number;
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
  styleUrl: './message-list.component.css'
})

export class MessageListComponent implements OnInit {
  messages: Message[] = [
    { id: 1, name: 'Mark', email: 'mdo@example.com', mobile: '1234567890', message: 'This is a message' },
    { id: 2, name: 'Jacob', email: 'jacob@example.com', mobile: '9876543210', message: 'Another message' },
    { id: 3, name: 'Larry the Bird', email: 'larry@twitter.com', mobile: '1200000000', message: 'A legendary message' }
  ]; 

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messagesService.getMessages()
    .subscribe(messages => this.messages = messages);
  }
}