import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { Message } from '../../../services/message';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ContactService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnChanges {
  @Input() message: Message | null = null;
  @Input() edit: boolean = true; // Add edit input
  @Output() onEditClose = new EventEmitter<Message|null>();

  contactForm!: FormGroup;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      message: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      if (this.message) {
        this.contactForm.patchValue({
          name: this.message.name,
          email: this.message.email,
          mobile: this.message.mobile,
          message: this.message.message,
        });
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, mobile, message } = this.contactForm.value;
      if (this.message) {
        this.contactService
          .updateContact(this.message._id, name, email, mobile, message)
          .subscribe(
            (response) => {
              this.onEditClose.emit(response);
              this.contactForm.reset(); // Reset form
            },
            (error) => {
              console.error('Error update contact:', error);
            }
          );
      } else {
        this.contactService
          .submitContact(name, email, mobile, message)
          .subscribe(
            (response) => {
              console.log('Contact submitted successfully:', response);
              
              this.contactForm.reset(); // Reset form
            },
            (error) => {
              console.error('Error submitting contact:', error);
              // Handle errors (e.g., show error message)
            }
          );
      }
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  onEditClick() {
    this.edit = false;
    this.onEditClose.emit();
  }
}
