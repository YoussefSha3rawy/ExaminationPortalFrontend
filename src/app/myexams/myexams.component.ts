import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myexams',
  templateUrl: './myexams.component.html',
  styleUrls: ['./myexams.component.css']
})
export class MyexamsComponent implements OnInit {

  exams: any;
  currentDate = new Date()
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let username = JSON.parse(sessionStorage.getItem("user")||"").username
    let obs = this.http.get("http://localhost:8080/studentExams/"+username)
    obs.subscribe(response=>{
      this.exams=response
    })
  }

  takeExam(examID: number){
    this.router.navigate(['takeExam',examID])
  }

  convertToDate(date: string){
    return new Date(date)
  }
  addMinutes(date: Date, minutes: number){
    let dt = new Date(date)
    dt.setMinutes(date.getMinutes()+minutes)
    return dt
  }
}
