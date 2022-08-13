import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = new Array()
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.Quizzes().subscribe(
      (data: any) => {
        this.quizzes = data
        console.log(this.quizzes)
      }, (error) => {
        Swal.fire("Error !", "Error loading data")
        console.log(error)
      })
  }


  deleteQuiz(qId:number) {

    Swal.fire({
      icon:"info",
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this.quizService.deleteQuiz(qId).subscribe((data) => {
          this.quizzes = this.quizzes.filter((quiz)=>quiz.qId!=qId)
          Swal.fire("Success", "Quiz deleted", "success")
        }, (error) => {
          console.log(error)
          Swal.fire("Error", "Error in deleting Quiz", "error")
        }
        );
      };
    });
  }
}
