import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quiz:any;

  constructor(private _router:Router ,private _route:ActivatedRoute, private _quiz:QuizService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid']
  
    this._quiz.getQuiz(this.qId).subscribe((data)=>{
      this.quiz = data;
    //  console.log(this.quiz);
    },(error)=>{
      this.snack.open("Error loading the quiz","",{
        duration:3000
      })
    })
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't start`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.quiz.qId])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
