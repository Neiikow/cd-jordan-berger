import { Component, ViewChild } from '@angular/core';
import { Education } from 'src/app/class/education';
import { Experience } from 'src/app/class/experience';
import { Interest } from 'src/app/class/interest';
import { Language } from 'src/app/class/language';
import { Project } from 'src/app/class/project';
import { Skill } from 'src/app/class/skill';
import { AuthService } from 'src/app/services/auth.service';
import { EducationFormComponent } from '../../education/education-form/education-form.component';
import { EducationComponent } from '../../education/education.component';
import { ExperienceFormComponent } from '../../experience/experience-form/experience-form.component';
import { ExperienceComponent } from '../../experience/experience.component';
import { InterestFormComponent } from '../../interest/interest-form/interest-form.component';
import { InterestComponent } from '../../interest/interest.component';
import { LanguageFormComponent } from '../../language/language-form/language-form.component';
import { LanguageComponent } from '../../language/language.component';
import { ProjectFormComponent } from '../../project/project-form/project-form.component';
import { ProjectComponent } from '../../project/project.component';
import { SkillFormComponent } from '../../skill/skill-form/skill-form.component';
import { SkillComponent } from '../../skill/skill.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild(SkillComponent) skill!: SkillComponent;
  @ViewChild(EducationComponent) education!: EducationComponent;
  @ViewChild(ExperienceComponent) experience!: ExperienceComponent;
  @ViewChild(InterestComponent) interest!: InterestComponent;
  @ViewChild(LanguageComponent) language!: LanguageComponent;
  @ViewChild(ProjectComponent) project!: ProjectComponent;

  @ViewChild(SkillFormComponent) formSkill!: SkillFormComponent;
  @ViewChild(EducationFormComponent) formEducation!: EducationFormComponent;
  @ViewChild(ExperienceFormComponent) formExperience!: ExperienceFormComponent;
  @ViewChild(InterestFormComponent) formInterest!: InterestFormComponent;
  @ViewChild(LanguageFormComponent) formLanguage!: LanguageFormComponent;
  @ViewChild(ProjectFormComponent) formProject!: ProjectFormComponent;

  constructor(private authService: AuthService){}

  isAuth() { return this.authService.isAuthenticated() }
  
  refreshSkill() {
    this.skill.getSkills();
  }

  editSkill(skill: Skill) {
    this.formSkill.initForm(skill);
  }

  refreshEducation() {
    this.education.getEducations();
  }

  editEducation(education: Education) {
    this.formEducation.initForm(education);
  }

  refreshExperience() {
    this.experience.getExperiences();
  }

  editExperience(experience: Experience) {
    this.formExperience.initForm(experience);
  }

  refreshInterest() {
    this.interest.getInterests();
  }

  editInterest(interest: Interest) {
    this.formInterest.initForm(interest);
  }

  refreshLanguage() {
    this.language.getLanguages();
  }

  editLanguage(language: Language) {
    this.formLanguage.initForm(language);
  }

  refreshProject() {
    this.project.getProjects();
  }

  editProject(project: Project) {
    this.formProject.initForm(project);
  }
}
