import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userForm!: FormGroup;
  public errorAlert?: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.noSpaceValidator]),
      email: new FormControl(null, [Validators.required, Validators.email, this.noSpaceValidator]),
      password: new FormControl(null, [Validators.required, this.noSpaceValidator])
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) this.register();
  }

  private register(): void {
    this.userService.register({
      name: this.userForm.value.name,
      email: this.userForm.value.email.trim(),
      password: this.userForm.value.password
    }).subscribe({
      error: (err) => {
        this.errorAlert='User already exists';
      },
      next: (res: boolean) => {
        res ? this.router.navigate(['/login']) : this.errorAlert='Some error occured';
      }
    });

  }

  private noSpaceValidator(control: FormControl): ValidationErrors | null {
    if (control.value && (control.value.indexOf(' ') >= 0)) return { noSpaceAllowed: true };
    return null;
  }
}
