import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userForm!: FormGroup;
  public errorAlert?: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) this.login();
  }

  private login() {
    this.userService.login({
      email: this.userForm.value.email.trim(),
      password: this.userForm.value.password
    }).subscribe({
      error: (err) => {
        this.errorAlert = 'Oops! Wrong credentials or account blocked';
      },
      next: (res: any) => {
        if (res) {
          this.cookies.set('accessToken', res.accessToken);
          this.cookies.set('refreshToken', res.refreshToken);
          localStorage.setItem('email', this.userForm.value.email);
          this.router.navigate(['/home']);
        } else this.errorAlert = 'Oops! Something went wrong...';
      }
    });
  }
}
