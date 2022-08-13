import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, readonly snack: MatSnackBar) { }

  public user = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
  onCick() {
    if (this.user.username === '' || this.user.username === null) {
      this.snack.open("Username is required!!", '',{
        duration:3000,
      });
      return;
    }

    //validate


    //  addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        //success
       // console.log(data)
        Swal.fire('Sucess  done',"UserID is" + data.id,'success')
        window.location.href="/login"
      },
      (error) => {
        //error
      this.snack.open("Something went wrong!!",'',{
        duration:3000
      })
      }
    )
  }


  //clear
  onClear(){
    Swal.fire('waiting for clear button ','')
  }
  ngOnInit(): void {
  }

}
