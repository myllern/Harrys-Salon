import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-input',
  templateUrl: './register-input.component.html',
  styleUrls: ['./register-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterInputComponent implements OnInit {
  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
  hide = true;
  get passwordInput() {
    return this.form.controls.password2;
  }
  onSubmit() {
    console.log(
      this.form.controls.firstname.value,
      this.form.controls.lastname.value,
      this.form.controls.username.value,
      this.form.controls.password.value
    );
  }
}
