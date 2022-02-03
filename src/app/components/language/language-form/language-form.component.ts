import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Language } from 'src/app/class/language';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss']
})
export class LanguageFormComponent implements OnInit {
  @Output() refreshLanguage = new EventEmitter();

  language!: Language;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(formData: Language) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('languages', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshLanguage.emit();
        })
    } else {
      this.firebase.createDoc('languages', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshLanguage.emit();
        })
    }
  }

  initForm(data?: Language) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      name: [data ? data.name : null, [Validators.required, Validators.maxLength(255)]],
      icone: [data ? data.icone : null, [Validators.required, Validators.maxLength(255)]],
      id: data ? data.id : null,
    });
    this.language = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
