import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AdminComponent } from './admin/admin.component';
import { AllExamsComponent } from './all-exams/all-exams.component';
import { LoginComponent } from './login/login.component';
import { MyexamsComponent } from './myexams/myexams.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentGuard } from './student.guard';
import { StudentComponent } from './student/student.component';
import { TakeExamComponent } from './take-exam/take-exam.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: StudentComponent, canActivate: [StudentGuard], children: [
      { path: 'myExams', component: MyexamsComponent },
      { path: 'allExams', component: AllExamsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'takeExam/:id', component: TakeExamComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'allExams', component: AllExamsComponent },
      { path: 'addExam', component: AddExamComponent },
      { path:'addQuestions/:id', component: AddQuestionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
