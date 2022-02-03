import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/class/project';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @Output() refreshProject = new EventEmitter();

  project!: Project;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(formData: Project) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('projects', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshProject.emit();
        })
    } else {
      this.firebase.createDoc('projects', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshProject.emit();
        })
    }
  }

  initForm(data?: Project) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      title: [data ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      details: [data ? data.details : null, [Validators.required, Validators.maxLength(255)]],
      picture: [data ? data.picture : null, [Validators.required, Validators.maxLength(255)]],
      category: [data ? data.category : null, [Validators.required, Validators.maxLength(255)]],
      url: [data ? data.url : null, [Validators.required, Validators.maxLength(255)]],
      id: data ? data.id : null,
    });
    this.project = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
