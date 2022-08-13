import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: "",
    password: ""
  }
  constructor(private snack: MatSnackBar, private login: LoginService,private router: Router) { }

  formSubmit() {
    console.log("login button submit");
    if (this.loginData.username.trim() === '' || this.loginData.username.trim() === null) {
      this.snack.open("Username is required!!", '', {
        duration: 3000,
      });
      return;
    }
    if (this.loginData.password.trim() === '' || this.loginData.password.trim() === null) {
      this.snack.open("password is required!!", '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe((data: any) => {
      console.log("Suceess !!");
     // console.log(data);

      //login
      this.login.loginUser(data.token);

      this.login.getCurrentUser().subscribe((user:any)=>{
        this.login.setUser(user);
      //  console.log(user)

        //redirect  ...ADMIN: admin dashboard
        if(this.login.getUserRole() == "NORMAL"){
         this.router.navigate(['user-dashboard/0']);
         this.login.loginStatusSubject.next(true)

        // window.location.href="/user-dashboard"
        }

        //redirect  ... NORMAL: normal dashboard 
        else if(this.login.getUserRole() == "Admin"){
           this.router.navigate(['admin']);
           this.login.loginStatusSubject.next(true)

          // window.location.href="/admin"
        }
        else{
          this.login.logout();
        }
      })
    },
      (error) => {
        console.log("Error !!")
        //console.log(error)
        this.snack.open("Username and password is not match !!",'',{
          duration:3000,
        })
      }
  );


}

public clear(){
  this.loginData.username='',
  this.loginData.password=''

}
ngOnInit(): void {
}

}
