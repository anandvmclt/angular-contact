import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../../../services/message.service';
import { Message } from '../../../services/message';
import { Router } from '@angular/router';

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
  id: string|null=null;

  constructor(private router: Router,private messagesService:MessagesService,private fb: FormBuilder, private contactService:ContactService,private route: ActivatedRoute) {
    this.contactForm = this.fb.group({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      mobile : new FormControl('', [Validators.required]),
      message : new FormControl(''),
    });
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.messagesService.getMessage(this.id).subscribe((data:Message)=>{
        this.contactForm.patchValue({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          message: data.message
        });
      })
    }
  }


  onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, mobile, message } = this.contactForm.value;
      if(this.id){
        this.contactService.updateContact(this.id,name, email, mobile, message).subscribe(response => {
          console.log('Contact updated successfully:', response);
          this.router.navigate(['messages']); 
          this.contactForm.reset(); // Reset form
        }, error => {
          console.error('Error update contact:', error);
        });
      }else{
        this.contactService.submitContact(name, email, mobile, message)
        .subscribe(response => {
          console.log('Contact submitted successfully:', response);
          // Handle successful submission (e.g., show success message)
          this.contactForm.reset(); // Reset form
        }, error => {
          console.error('Error submitting contact:', error);
          // Handle errors (e.g., show error message)
        });
      }
     
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}