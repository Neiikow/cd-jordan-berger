import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Experience } from 'src/app/class/experience';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {
  @Output() refreshExperience = new EventEmitter();

  experience!: Experience;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(formData: Experience) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('experiences', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshExperience.emit();
        })
    } else {
      this.firebase.createDoc('experiences', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshExperience.emit();
        })
    }
  }

  initForm(data?: Experience) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      function: [data ? data.function : null, [Validators.required, Validators.maxLength(255)]],
      company: [data ? data.company : null, [Validators.required, Validators.maxLength(255)]],
      startyear: [data ? data.startyear : null, [Validators.required, Validators.maxLength(255)]],
      endyear: [data ? data.endyear : null, [Validators.required, Validators.maxLength(255)]],
      about: [data ? data.about : null, [Validators.required, Validators.maxLength(10000)]],
      id: data ? data.id : null,
    });
    this.experience = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
