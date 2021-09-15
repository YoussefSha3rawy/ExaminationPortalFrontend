import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  courses: any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let obs = this.http.get("http://localhost:8080/courses")
    obs.subscribe((response: any) => {
      this.courses = response._embedded.courses
      console.log(this.courses)
    })
  }

  addExam(values: any) {
    console.log(values)
    let body = {
      course: this.courses.filter((course: any) => course.courseID === Number.parseInt(values.course))[0],
      allottedTime: values.allottedTime,
      examDate: new Date(Date.UTC(values.examDate.year, Number.parseInt(values.examDate.month)-1, values.examDate.day,
        values.time.hour, values.time.minute, values.time.second))
    }
    let obs = this.http.post("http://localhost:8080/exams",body)
    obs.subscribe(response=>console.log(response))
  }

}
