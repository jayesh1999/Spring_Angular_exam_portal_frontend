import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  quiz:any;
  categories:any;
  constructor(private _route:ActivatedRoute,private _quizService:QuizService,private _category:CategoryService,private snack:MatSnackBar,private _router:Router) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid'];
    this._quizService.getQuiz(this.qId).subscribe((data)=>{
      this.quiz = data;
      console.log(data);
    },(error)=>{
      console.log(error);
    });

    this._category.categories().subscribe((data)=>{
      this.categories = data;
    },(error)=>{
    console.log("error in loading category",error)  
    })

  }

  //update form submit
  public updateData(){
   
    //validate
    if(this.quiz.title.trim() == '' || this.quiz.title == null){
      this.snack.open("Title Required !!",'',{
        duration:3000
      })
      return;
      }
    this._quizService.updateQuiz(this.quiz).subscribe((data)=>{
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
