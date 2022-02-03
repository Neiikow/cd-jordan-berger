import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Language } from 'src/app/class/language';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Language>();

  languages!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }

  ngOnInit() {
    this.getLanguages();
  }

  getLanguages() {
    this.firebase.getCollection('languages')
      .then((r) => {
        this.languages = r;
      })
  }

  edit(language: Language) {
    this.emitEdit.emit(language);
  }

  delete(language: Language) {
    this.firebase.deleteDoc('languages', language.id)
      .then((r) => {
        this.getLanguages()
      })
  }
}
