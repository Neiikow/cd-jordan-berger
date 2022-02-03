import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/class/contact';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Contact>();

  contact!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }

  ngOnInit() {
    this.getContact();
  }

  getContact() {
    this.firebase.getDoc('contacts')
      .then((r) => {
        this.contact = r
      })
  }

  edit(contact: Contact) {
    this.emitEdit.emit(contact);
  }
}
