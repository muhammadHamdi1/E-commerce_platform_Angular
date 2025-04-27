import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { IRegister } from '../../core/interfaces/http';
import { AuthService } from '../../core/service/auth.service';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserDataService } from '../../core/service/user-data.service';
import { response } from 'express';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  rePassword!: FormControl;
  registrationForm!: FormGroup;

  constructor(
    private authService_: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private _userData: UserDataService,
  ) {
    this.initFormControls();
    this.initFormGroup();
  }

  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.rePassword = new FormControl('', [
      Validators.required,
      this.passwordMatch(this.password),
    ]);
  }

  initFormGroup(): void {
    this.registrationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
    });
  }

  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== rePass.value || rePass.value === '') {
        return { passNotMatch: true };
      } else return null;
    };
  }

  submit() {
    // console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      this.SiginUp(this.registrationForm.value);
    } else {      //  validate error 'input form'
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }

// Integrate API
  SiginUp(data: IRegister): void {
    this._ngxSpinnerService.show();
    this.authService_.register(data).subscribe({
      next:(respose)=>{
        if(respose._id){
          this._ngxSpinnerService.hide();
          this.show('success', "Success", "Success register" );
          // Navigate direct to 'user'
          const {email, password}= data;
          this.authService_.login({email, password}).subscribe((next)=> {
          localStorage.setItem('token', respose._id);

          this.router.navigate(['home']);
          this._userData.userName.next (respose.name);
          localStorage.setItem('username' ,respose.name);
          })
          }
        },
      error:(err) => {
        // if (err.error.error ===  undefined)  {
        //   err.error.error = "User already exists!!";
        //   this.show("error", "Error", err.error.error);
        // } else {
        //   this.show("error", "Error", err.error.error);
        // }
        this._ngxSpinnerService.hide();
        this.show("error", "Error", err.error.error);
        console.log(err)
      }
        });
  }

// registerAPI(data: IRegister): void {
//   this.authService_.register(data).subscribe((data)=> console.log(data));
// }

show(severity:string, summary:string, detail:string) {
  this._messageService.add({
    severity: severity,
    summary: summary,
    detail: detail,
  });
}





// Integrate API
  // SiginUp(data: IRegister): void {

  //   this.authService_.register(data).subscribe({
  //     next:(respose)=>{
  //       console.log(respose);
  //       // this.show()
  //     },
  //     error:(err) => {
  //       this.show('error', 'Error', err.error.error )
  //       console.log(err.error.error);

  //     }
  //       });
  // }
  // Tost msg registration

//   show() {
//     this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
// }


}
