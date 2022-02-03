import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/class/skill';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  @Output() refreshSkill = new EventEmitter();

  skill!: Skill;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(formData: Skill) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('skills', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshSkill.emit();
        })
    } else {
      this.firebase.createDoc('skills', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshSkill.emit();
        })
    }
  }

  initForm(data?: Skill) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      title: [data ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      icone: [data ? data.icone : null, [Validators.required, Validators.maxLength(255)]],
      details: [data ? data.details : null, [Validators.required, Validators.maxLength(10000)]],
      id: data ? data.id : null,
    });
    this.skill = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
