// Modules de base
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules ajoutés
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Mes services / components
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/auth/login.component';
import { EducationComponent } from './components/education/education.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { InterestComponent } from './components/interest/interest.component';
import { LanguageComponent } from './components/language/language.component';
import { ProjectComponent } from './components/project/project.component';
import { SkillComponent } from './components/skill/skill.component';
import { AboutFormComponent } from './components/about/about-form/about-form.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ExperienceFormComponent } from './components/experience/experience-form/experience-form.component';
import { InterestFormComponent } from './components/interest/interest-form/interest-form.component';
import { LanguageFormComponent } from './components/language/language-form/language-form.component';
import { ProjectFormComponent } from './components/project/project-form/project-form.component';
import { SkillFormComponent } from './components/skill/skill-form/skill-form.component';
import { HomePageComponent } from './components/page/home-page/home-page.component';
import { EducationFormComponent } from './components/education/education-form/education-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EducationComponent,
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    InterestComponent,
    LanguageComponent,
    ProjectComponent,
    SkillComponent,
    AboutFormComponent,
    ContactFormComponent,
    ExperienceFormComponent,
    InterestFormComponent,
    LanguageFormComponent,
    ProjectFormComponent,
    SkillFormComponent,
    HomePageComponent,
    EducationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
