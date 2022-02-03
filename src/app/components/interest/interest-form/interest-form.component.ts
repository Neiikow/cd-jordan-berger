import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Interest } from 'src/app/class/interest';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.scss']
})
export class InterestFormComponent implements OnInit {
  @Output() refreshInterest = new EventEmitter();

  interest!: Interest;
  edit = false;
  formData: any;
  submitted = false;

  constructor(
    private firebase: FirebaseService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(formData: Interest) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    if (this.edit) {
      this.firebase.editDoc('interests', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshInterest.emit();
        })
    } else {
      this.firebase.createDoc('interests', formData)
        .then((r) => {
          this.submitted = false;
          this.initForm();
          this.refreshInterest.emit();
        })
    }
  }

  initForm(data?: Interest) {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.formData = this.formBuilder.group({
      title: [data ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      icone: [data ? data.icone : null, [Validators.required, Validators.maxLength(100)]],
      id: data ? data.id : null,
    });
    this.interest = this.formData.value;
  }

  get f(): any { return this.formData.controls; }
}
