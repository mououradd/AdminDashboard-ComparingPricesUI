import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router,ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  StrongPasswordRegx: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
  EmailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  messageError: string = '';
  loginForm: FormGroup;

  constructor(private authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    const navigation = this._router.getCurrentNavigation();
    let email =this.authService.Email;
    let password = this.authService.Password;

    if (navigation?.extras.state) {
      const state = navigation.extras.state as { email: string; password: string };
      email = state.email;
      password = state.password;
    }

    this.loginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, [Validators.required])
    });
    console.log(email,password)
  }

  handleForm() {
    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response.message === "Success") {
            localStorage.setItem('UserToken', response.token);
            this._router.navigate(['/home']);
            this.authService.GetUserData();
          }
        },
        error: (err) => {
          this.messageError = err.error;
        }
      });
    }
  }
}
