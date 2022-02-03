import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/class/contact';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Output() refreshContact = new EventEmitter();

  contact!: Contact;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder
  ){};

  ngOnInit() {
    this.initForm()
  }

  onSubmit(formData: Contact) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('contacts', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshContact.emit();
        })
    }
  }

  initForm(data?: Contact) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      name: [data ? data.name : null, [Validators.required, Validators.maxLength(255)]],
      email: [data ? data.email : null, [Validators.required, Validators.maxLength(255)]],
      picture: [data ? data.picture : null, [Validators.required, Validators.maxLength(255)]],
      city: [data ? data.city : null, [Validators.required, Validators.maxLength(255)]],
      street: [data ? data.street : null, [Validators.required, Validators.maxLength(255)]],
      postal: [data ? data.postal : null, [Validators.required, , Validators.maxLength(5)]],
      phone: [data ? data.phone : null, [Validators.required, Validators.maxLength(14)]],
      age: [data ? data.age : null, [Validators.required, Validators.max(99)]],
      github: [data ? data.name : null, [Validators.required, Validators.maxLength(255)]],
      facebook: [data ? data.name : null, [Validators.required, Validators.maxLength(255)]],
      id: data ? data.id : null,
    });
    this.contact = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
