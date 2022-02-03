import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Education } from 'src/app/class/education';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  @Output() refreshEducation = new EventEmitter();

  education!: Education;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(formData: Education) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('educations', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshEducation.emit();
        })
    } else {
      this.firebase.createDoc('educations', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshEducation.emit();
        })
    }
  }

  initForm(data?: Education) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      title: [data ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      company: [data ? data.company : null, [Validators.required, Validators.maxLength(255)]],
      startyear: [data ? data.startyear : null, [Validators.required, Validators.maxLength(255)]],
      endyear: [data ? data.endyear : null, [Validators.required, Validators.maxLength(255)]],
      about: [data ? data.about : null, [Validators.required, Validators.maxLength(10000)]],
      id: data ? data.id : null,
    });
    this.education = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
