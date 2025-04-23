import { Component, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { ILogin } from '../../core/interfaces/http';
import { AuthService } from '../../core/service/auth.service';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],

  encapsulation: ViewEncapsulation.None,

})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private authService_: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private router: Router,
  ) {
    this.initFormControls();
    this.initFormGroup();
  }

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  initFormGroup(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.SiginIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }
// Integrate API
  SiginIn(data: ILogin): void {
    this._ngxSpinnerService.show();
    this.authService_.login(data).subscribe({
      next:(respose)=>{
        if(respose._id){
          this._ngxSpinnerService.hide();
          this.show('success', "Success", "Success login" );
          // guard authentication
          localStorage.setItem('token' , respose._id)
        }
        this.router.navigate(['user']);
      },
      error:(err) => {
        this._ngxSpinnerService.hide();
        // if(err.error.error === undefined){      // if No Internet
        //   this.show('error', 'Error', err.statusText);
        // }else {
        //   this.show('error', 'Error', err.error.error);
        // }
        this.show('error', 'Error', err.error.error);

        console.log(err)
      }
        });
  }

  show(severity:string, summary:string, detail:string) {          // Tost msg login
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
