import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizess:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
     

    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];
      if(this.catId == 0){
        console.log("Load all the quiz");
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizess = data;
       //   console.log(this.quizess)
        },(error)=>{
         this._snack.open("error in load quiz",'',{
           duration:3000
         })
        })
      }
      else{
        console.log("Load specific quiz"); 
       this._quiz.getActiveQuizzesofCategory(this.catId).subscribe((data)=>{
        this.quizess  = data;
       // console.log(this.quizess)
       },(error)=>{
        console.log(error)

       })
      }
    })
    
  
  }

}
