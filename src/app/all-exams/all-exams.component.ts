import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.css']
})
export class AllExamsComponent implements OnInit {

  currentDate: Date;
  exams: any;
  type: any;
  constructor(private http: HttpClient, private router: Router) {
    this.currentDate= new Date()
    this.type= sessionStorage.getItem("type")||""
   }

  ngOnInit(): void {
    let obs = this.http.get("http://localhost:8080/exams")
    obs.subscribe(response=>{
      this.exams=response
    })
  }

  register(exam:any){
    let stex = {
      student: JSON.parse(sessionStorage.getItem("user")||""),
      exam: exam,
      result:0
    }
    let obs = this.http.post('http://localhost:8080/studentExams',stex)
    obs.subscribe(response=>alert("Success"),error=>alert(error.error))
  }

  addQuestions(exam:any){
    this.router.navigate(['admin','addQuestions',exam.examID])
  }

  convertToDate(date: string){
    return new Date(date)
  }

}
