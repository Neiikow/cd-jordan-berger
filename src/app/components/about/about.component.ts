import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { About } from 'src/app/class/about';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<About>();

  about!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){};

  isAuth() { return this.authService.isAuthenticated() }
  
  ngOnInit() {
    this.getAbout();
  }

  getAbout() {
    this.firebase.getDoc('abouts')
      .then((r) => {
        this.about = r
      })
  }

  edit(about: About) {
    this.emitEdit.emit(about);
  }
}
