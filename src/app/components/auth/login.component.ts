import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  submitted = false;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService){};

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.formData = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(formData: FormGroup) {
    this.loginError = false;
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    this.authService.login(formData.value.email , formData.value.password)
      .then((r) => {
        this.submitted = false;
        this.initForm();
      })
      .catch((e) => {
        this.loginError = true
      })
  }

  logout() {
    this.authService.logout()
  }

  get f(): any { return this.formData.controls; }
}
