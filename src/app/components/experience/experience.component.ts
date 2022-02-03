import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Experience } from 'src/app/class/experience';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Experience>();

  experiences!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }

  ngOnInit() {
    this.getExperiences();
  }

  getExperiences() {
    this.firebase.getCollection('experiences')
      .then((r:any) => {
        this.experiences = r.sort((a:Experience, b:Experience) => {
          if (a.startyear === b.startyear) return a.endyear - b.endyear
          return a.startyear - b.startyear
        })
        this.experiences.reverse()
      })
  }

  edit(experience: Experience) {
    this.emitEdit.emit(experience);
  }

  delete(experience: Experience) {
    this.firebase.deleteDoc('experiences', experience.id)
      .then((r) => {
        this.getExperiences()
      })
  }
}
