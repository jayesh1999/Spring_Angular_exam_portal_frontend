import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId: any;
  questions: any;

  marksGot = 0;
  correctAnswers = 0
  attempted = 0

  backendAnswer:any
  isSubmit=false;

  timer:any

  constructor(private _route: ActivatedRoute, private locationSt: LocationStrategy, private _question: QuestionService, private _snack: MatSnackBar) { }


  ngOnInit(): void {
    this.preventBackButton()
    this.qId = this._route.snapshot.params["qid"]
    //console.log(this.qId);
    this.loadQuestions();

  }
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }
  loadQuestions() {
    this._question.getQuestionsofQuizForTest(this.qId).subscribe((data) => {
      this.questions = data;
      this.timer = this.questions.length *2 * 60
    
      //console.log(this.questions)
      this.startTimer();
    }, (error) => {
      Swal.fire("Error", "Error in loading quiz", "error")
    })
  }

  submit(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e)=>{

      if(e.isConfirmed){
        this.evalQuiz()
      }
    })
  }

  startTimer(){
  let t =   window.setInterval(()=>{
      //code
      if(this.timer <=0){
        this.evalQuiz();
      
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm  = Math.floor(this.timer/60)
    let ss = this.timer-mm*60
    return `${mm} min: ${ss} sec`
  }

  evalQuiz(){
      //calculation
       this.isSubmit= true
      this._question.evalQuiz(this.questions).subscribe((data)=>{
       // console.log(data)
        this.backendAnswer = data;
        this.attempted = this.backendAnswer.attempted;
        this.correctAnswers = this.backendAnswer.correctAnswers;
        this.marksGot=  parseFloat(Number(this.backendAnswer.marksGot).toFixed(2));
      },(error)=>{
        console.log(error)
      })
       //call to server to check questions


      // this.questions.forEach((q:any)=>{

      //   if(q.givenAnswer == q.answer){
      //     this.correctAnswers++
      //     let marksSingle  = this.questions[0].quiz.maxMarks/this.questions.length;
      //     this.marksGot += marksSingle;
        
      //   }

      //   if(q.givenAnswer.trim() != ""){
      //     this.attempted++;

      //   }
      // })
      // console.log("correct Answer:"+this.correctAnswers);
      // console.log("marks Got",this.marksGot);
      // console.log("attempted",this.attempted)
  }

  printpage(){
    window.print()
  }
}
