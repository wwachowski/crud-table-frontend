import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/data/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userForm!: FormGroup;
  private name?: string;
  private password?: string;

  constructor() { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.name),
      password: new FormControl(this.password)
    });
  }

  public onSubmit() {
    
  }
}
