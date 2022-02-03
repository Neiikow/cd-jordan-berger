import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Education } from 'src/app/class/education';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Education>();

  educations!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }

  ngOnInit() {
    this.getEducations();
  }

  getEducations() {
    this.firebase.getCollection('educations')
      .then((r:any) => {
        this.educations = r.sort((a:Education, b:Education) => {
          if (a.startyear === b.startyear) return a.endyear - b.endyear
          return a.startyear - b.startyear
        })
        this.educations.reverse()
      })
  }

  edit(education: Education) {
    this.emitEdit.emit(education);
  }

  delete(education: Education) {
    this.firebase.deleteDoc('educations', education.id)
      .then((r) => {
        this.getEducations()
      })
  }
}
