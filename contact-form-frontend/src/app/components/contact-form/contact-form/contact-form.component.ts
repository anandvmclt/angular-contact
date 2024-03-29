import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,],
  providers: [ContactService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent implements OnInit {
  
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private contactService:ContactService) {
    this.contactForm = this.fb.group({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      mobile : new FormControl('', [Validators.required]),
      message : new FormControl(''),

    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, mobile, message } = this.contactForm.value;
      this.contactService.submitContact(name, email, mobile, message)
        .subscribe(response => {
          console.log('Contact submitted successfully:', response);
          // Handle successful submission (e.g., show success message)
          this.contactForm.reset(); // Reset form
        }, error => {
          console.error('Error submitting contact:', error);
          // Handle errors (e.g., show error message)
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {}
}