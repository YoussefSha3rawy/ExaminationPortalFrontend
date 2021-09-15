import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = ""
  password: String = ""
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    let obs = this.http.post('http://localhost:8080/students/login', { username: this.username, password: this.password })
    obs.subscribe(response => {
      sessionStorage.setItem('type', 'student')
      sessionStorage.setItem('user', JSON.stringify(response))
      this.router.navigate(['/profile'])
    }, () => {
      obs = this.http.post('http://localhost:8080/admins/login', { username: this.username, password: this.password })
      obs.subscribe(response => {
        sessionStorage.setItem('type', 'admin')
        sessionStorage.setItem('user', JSON.stringify(response))
        this.router.navigate(['/admin/profile'])
      }, error=>alert(error.error))
    })
  }
}
