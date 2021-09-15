import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  questions: any
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let examID = this.activatedRoute.snapshot.params.id
    let obs = this.http.get("http://localhost:8080/examQuestions/" + examID)
    obs.subscribe(response => { console.log(response); this.questions = response }, error => alert(error.error))
  }

  addQuestion(value: any) {
    let question: any = {
      question: value.question,
      questionType: value.questionType,
      questionNumber: this.questions.length + 1
    }
    if (value.questionType === 'Normal') {
      question.correctAnswer = value.correctAnswer
    }
    if (value.questionType === 'MCQ') {
      question.correctAnswer = value.correctAnswer
      question.optionA = value.optionA
      question.optionB = value.optionB
      question.optionC = value.optionC
      question.optionD = value.optionD
    }
    if (value.questionType === 'Checkboxes') {
      question.optionA = value.optionA
      question.optionB = value.optionB
      question.optionC = value.optionC
      question.optionD = value.optionD
      question.correctAnswer = ''
      question.correctAnswer = value['CB-A'] ? question.correctAnswer + 'A' : question.correctAnswer
      question.correctAnswer = value['CB-B'] ? question.correctAnswer + 'B' : question.correctAnswer
      question.correctAnswer = value['CB-C'] ? question.correctAnswer + 'C' : question.correctAnswer
      question.correctAnswer = value['CB-D'] ? question.correctAnswer + 'D' : question.correctAnswer
    }
    if(value.questionType==='Matching'){
      question.optionA = value.optionA
      question.optionB = value.optionB
      question.optionC = value.optionC
      let matches: any = ['D','E','F'].sort( () => .5 - Math.random() )
      question.correctAnswer = 'A'+matches[0]+'-B'+matches[1]+'-C'+matches[2]
      question['option'+matches[0]] = value.AMatch
      question['option'+matches[1]] = value.BMatch
      question['option'+matches[2]] = value.CMatch
    }

    let obs = this.http.get('http://localhost:8080/exams/'+this.activatedRoute.snapshot.params.id)
    obs.subscribe(response=>{
      question.exam = response
      console.log(question)
      obs = this.http.post('http://localhost:8080/examQuestions',question)
      obs.subscribe(response=>this.questions=response)
    })
  }

}
