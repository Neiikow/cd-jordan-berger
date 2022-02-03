import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { About } from 'src/app/class/about';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.scss']
})
export class AboutFormComponent implements OnInit {
  @Output() refreshAbout = new EventEmitter();

  about!: About;
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

  onSubmit(formData: About) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('abouts', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshAbout.emit();
        })
    }
  }

  initForm(data?: About) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      picture: [data ? data.picture : null, [Validators.required, Validators.maxLength(255)]],
      content: [data ? data.content : null, [Validators.required, Validators.maxLength(10000)]],
      id: data ? data.id : null,
    });
    this.about = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
