import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=new Array()

  quizData={
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:"false",
    category:{
     "cid":""
    },
  };
  constructor(private _cat:CategoryService , private _quiz:QuizService,private snack:MatSnackBar) { }

  ngOnInit(): void {

    this._cat.categories().subscribe((data:any)=>{
      this.categories = data
      console.log(this.categories)
    },(error)=>{
      Swal.fire("Error !!","Error in getting categories")
      console.log(error)
    })
  }

  addQuiz(){
    if(this.quizData.title.trim() == "" || this.quizData.title == null){
      this.snack.open("Title required !! ",'',{
        duration:3000,
      } )
      return;
    }

    //validation  

    //call server
    this._quiz.addQuizzes(this.quizData).subscribe((data:any)=>{
      Swal.fire('Success','quiz is added','success')
      this. quizData={
        title:"",
        description:"",
        maxMarks:"",
        numberOfQuestions:"",
        active:"true",
        category:{
          cid:"",
        }
      }
    },(error)=>{
      Swal.fire('Error !!','Error while adding quiz','error')
      console.log(error)

    })

  }

}
