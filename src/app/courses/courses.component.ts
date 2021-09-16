import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let obs = this.http.get("http://localhost:8080/courses")
    obs.subscribe((response: any) => {
      this.courses = response._embedded.courses
      console.log(this.courses)
    })
  }

  addCourse(value: any) {
    let obs = this.http.post("http://localhost:8080/courses", value)
    obs.subscribe(() => {
      obs = this.http.get("http://localhost:8080/courses")
      obs.subscribe((response: any) => {
        this.courses = response._embedded.courses
      })
    })
  }

}
