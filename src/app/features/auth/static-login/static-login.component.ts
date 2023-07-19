import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastController} from "@ionic/angular";


@Component({
  selector: 'app-static-login',
  templateUrl: './static-login.component.html',
  styleUrls: ['./static-login.component.scss'],
})
export class StaticLoginComponent  implements OnInit {
  staticFormGroup: FormGroup;
  submit = false

  constructor(public fb: FormBuilder,
              public router: Router,
              public toastController: ToastController,
              private http: HttpClient) {
    this.staticFormGroup = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  loginStaticSubmit() {
    this.submit = true;

    if (this.staticFormGroup.valid) {
      const postData = { password: this.staticFormGroup.get('password')?.value, username: localStorage.getItem('mobile')};
      this.http.post(`https://dev.atramehr.ir/api/v1/auth/static-login`, postData)
        .subscribe((data: any) => {
          console.log(data)

        });
    }
  }
}
verificationSubmit() {
  this.submit = true;
  if (this.verificationFormGroup.valid) {
    const postData = {
      otp: this.verificationFormGroup.get('otp')?.value,
      username: localStorage.getItem('mobile'),
      type: 1,
    };
    this.http
      .post(`https://dev.atramehr.ir/api/v1/auth/code-verification`, postData)
      .subscribe(
        (data:any) => {
          if (data.status === 200) {
            this.router.navigateByUrl('/auth/register');
          } else {
            this.presentToast( data.message, 'danger');
          }
        },
        (error) => {
          this.presentToast(error.error.message, 'danger');
        }
      );
  }
}
}
