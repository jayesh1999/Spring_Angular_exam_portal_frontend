import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  questionId:any;
  question:any
  qTitle:any
  constructor(private _route:ActivatedRoute,private _questionService:QuestionService, private _router:Router,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.questionId = this._route.snapshot.params['questionId'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questionService.getSingleQuestion(this.questionId).subscribe((data:any)=>{
      this.question = data;
      console.log(data);
    },(error)=>{
      console.log(error);
    });

  }

  //update question

   public updateData(){

   console.log(this.question)
    //validate
    if(this.question.content.trim() == '' || this.question.content == null){
      this.snack.open("Content Required !!",'',{
        duration:3000
      })
      return;
      }
    this._questionService.updateQuestion(this.question).subscribe((data)=>{
      Swal.fire("Success !!","quiz updated",'success')
      .then((e)=>{
        this._router.navigate(["/admin/quizzes"])
      })
    },(error)=>{
      Swal.fire("Error !!", "Error in updating quiz","error")
      console.log(error)
    })
  }

}
