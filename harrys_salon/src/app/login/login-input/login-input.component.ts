import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginInputComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
    //password2: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  constructor() {}

  ngOnInit(): void {}

  hide = true;
  get passwordInput() { return this.form.controls.password2; } 
  onSubmit() {
    console.log(
      this.form.controls.username.value,
      this.form.controls.password.value
    );
  }
}
