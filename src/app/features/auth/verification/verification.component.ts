import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  submit = false;
  verificationFormGroup: FormGroup;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.verificationFormGroup = this.fb.group({
      otp: ['', [Validators.required]],
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
