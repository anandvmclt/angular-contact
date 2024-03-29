import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent implements OnInit {
  
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      mobile : new FormControl('', [Validators.required]),
      message : new FormControl(''),

    });
  }

  onSubmit(){
    if (this.contactForm.valid){
      console.log(this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {}
}