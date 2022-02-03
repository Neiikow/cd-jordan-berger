import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Skill } from 'src/app/class/skill';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Skill>();

  skills!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }

  ngOnInit() {
    this.getSkills();
  }

  getSkills() {
    this.firebase.getCollection('skills')
      .then((r) => {
        this.skills = r;
      })
  }

  edit(skill: Skill) {
    this.emitEdit.emit(skill);
  }

  delete(skill: Skill) {
    this.firebase.deleteDoc('skills', skill.id)
      .then((r) => {
        this.getSkills()
      })
  }
}
