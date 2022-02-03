import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/class/project';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Project>();

  projects!: any;

  constructor(
    private firebase: FirebaseService,
    private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }
  
  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.firebase.getCollection('projects')
      .then((r) => {
        this.projects = r;
      })
  }

  edit(project: Project) {
    this.emitEdit.emit(project);
  }

  delete(project: Project) {
    this.firebase.deleteDoc('projects', project.id)
      .then((r) => {
        this.getProjects()
      })
  }
}
