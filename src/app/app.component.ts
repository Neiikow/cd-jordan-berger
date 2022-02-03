import { Component, ViewChild } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { About } from './class/about';
import { Contact } from './class/contact';
import { AboutFormComponent } from './components/about/about-form/about-form.component';
import { AboutComponent } from './components/about/about.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(ContactComponent) contact!: ContactComponent;
  @ViewChild(ContactFormComponent) formContact!: ContactFormComponent;
  @ViewChild(AboutComponent) about!: AboutComponent;
  @ViewChild(AboutFormComponent) formAbout!: AboutFormComponent;

  contactHidden: boolean = true;

  constructor(private authService: AuthService) {
    const fireConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };
    initializeApp(fireConfig);
  }

  isAuth() { return this.authService.isAuthenticated() }

  refreshContact() {
    this.contact.getContact();
  }

  editContact(contact: Contact) {
    this.formContact.initForm(contact);
  }

  refreshAbout() {
    this.about.getAbout();
  }

  editAbout(about: About) {
    this.formAbout.initForm(about);
  }

  toggleContact() {
    let contact: any = document.getElementById("contact");

    if (contact.style.top != "0px") {
      contact.style.top = "0px";
      contact.style.transition = "top .5s";
      this.contactHidden = false;
    } else {
      contact.style.removeProperty("top");
      this.contactHidden = true;
    }
  }
}