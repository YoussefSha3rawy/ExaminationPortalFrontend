import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyexamsComponent } from './myexams/myexams.component';
import { AllExamsComponent } from './all-exams/all-exams.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { CoursesComponent } from './courses/courses.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    MyexamsComponent,
    AllExamsComponent,
    TakeExamComponent,
    StudentComponent,
    AdminComponent,
    AddExamComponent,
    AddQuestionsComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
