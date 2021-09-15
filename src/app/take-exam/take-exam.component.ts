import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {

  exam: any
  answers = []
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let examID = this.activatedRoute.snapshot.params.id
    let obs = this.http.get("http://localhost:8080/examQuestions/" + examID)
    obs.subscribe(response => { console.log(response); this.exam = response }, error => alert(error.error))
  }

  submitAnswers(value: any) {
    let correctAnswers = 0
    let total = this.exam.length
    this.exam.forEach((question: any) => {
      if (question.questionType === 'MCQ') {
        value[question.questionNumber] === question.correctAnswer ? correctAnswers++ : correctAnswers
      }
      if (question.questionType === 'Checkboxes') {
        let correctAnswer = question.correctAnswer.split('')
        let correct = true
        if ((value[question.questionNumber + 'A'] && !correctAnswer.includes('A')) ||
          (!value[question.questionNumber + 'A'] && correctAnswer.includes('A')))
          correct = false
        if ((value[question.questionNumber + 'B'] && !correctAnswer.includes('B')) ||
          (!value[question.questionNumber + 'B'] && correctAnswer.includes('B')))
          correct = false
        if ((value[question.questionNumber + 'C'] && !correctAnswer.includes('C')) ||
          (!value[question.questionNumber + 'C'] && correctAnswer.includes('C')))
          correct = false
        if ((value[question.questionNumber + 'D'] && !correctAnswer.includes('D')) ||
          (!value[question.questionNumber + 'D'] && correctAnswer.includes('D')))
          correct = false
        if (correct)
          correctAnswers++
      }
      if (question.questionType == "Normal")
        value[question.questionNumber] === question.correctAnswer ? correctAnswers++ : correctAnswers
      if (question.questionType === 'Matching') {
        let correctAnswer = question.correctAnswer.split('-')
        if (value[question.questionNumber + 'A'] === correctAnswer[0][1] && value[question.questionNumber + 'B'] === correctAnswer[1][1]
          && value[question.questionNumber + 'C'] === correctAnswer[2][1])
          correctAnswers++
      }
    })
    let obs = this.http.get("http://localhost:8080/exams/"+ this.activatedRoute.snapshot.params.id)
    obs.subscribe(response=>{
      let stex = {
        student: JSON.parse(sessionStorage.getItem("user")||""),
        exam: response,
        result: Math.round(correctAnswers/total *100)
      }
      let obs2 = this.http.put("http://localhost:8080/studentExams",stex)
      obs2.subscribe(()=>{
        alert("You scored " + Math.round(correctAnswers/total *100)+"%")
    console.log(value)
      }, error=>alert(error.error))
    }, error=>alert(error.error))
    
  }

}
