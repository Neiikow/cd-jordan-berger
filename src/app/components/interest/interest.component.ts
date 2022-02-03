import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Interest } from 'src/app/class/interest';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Interest>();

  interests!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }

  ngOnInit() {
    this.getInterests();
  }

  getInterests() {
    this.firebase.getCollection('interests')
      .then((r) => {
        this.interests = r;
      })
  }

  edit(interest: Interest) {
    this.emitEdit.emit(interest);
  }

  delete(interest: Interest) {
    this.firebase.deleteDoc('interests', interest.id)
      .then((r) => {
        this.getInterests()
      })
  }
}
