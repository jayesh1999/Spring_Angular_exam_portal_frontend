import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions = new Array();

  constructor(private _route:ActivatedRoute,private _questions:QuestionService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId  = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questions.getQuestionsofQuiz(this.qId).subscribe((data:any)=>{
      console.log(data)
      this.questions=data;
    },(error)=>{
      console.log(error);
    })
    console.log(this.qId);
    console.log(this.qTitle);
  }

  public deleteQuestion(questionId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:"Are you sure you want to delete this question?",
    }).then((result)=>{
      if(result.isConfirmed){
       this._questions.deleteQuestion(questionId).subscribe(
        (data)=>{
        this._snack.open("Question Deleted",'',{
          duration:3000,
        });
        this.questions= this.questions.filter((q)=>q.questionId != questionId)
       },
       (error)=>{
         this._snack.open("Error in deleting question","",{
           duration:3000,
         });     
     

        console.log(error)

       }
     
      )}
    })
    
  }
}
