import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  signInForm: FormGroup;
  submit = false;
  constructor(public fb: FormBuilder,
              public router: Router,
              private http: HttpClient) {
    this.signInForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
    });
  }

  ngOnInit() {}
  loginSubmit(){
    this.submit = true;
    if(this.signInForm.valid){
      this.http.get(`https://dev.atramehr.ir/api/v1/auth/checkAuth/`+this.signInForm.get('mobile')?.value+`/1`)
        .subscribe((data: any) => {
          localStorage.setItem('mobile', this.signInForm.get('mobile')?.value);
          console.log(data)
          if(data.data.isNewUser){
            this.router.navigateByUrl('/auth/verification');
          }  else {
            this.router.navigateByUrl('/auth/static-login');
          }
          // handle the data
        });
    }
 }
}
