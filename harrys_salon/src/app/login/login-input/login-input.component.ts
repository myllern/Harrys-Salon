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
<<<<<<< HEAD
    password: new FormControl('', [Validators.required, Validators.min(3)]),
=======
    password: new FormControl(''),
    //password2: new FormControl('', [Validators.required, Validators.min(3)]),
>>>>>>> d58d6d1a41ac3e41ed84db7bb6b96e79692cbc5c
  });

  constructor() {}

  ngOnInit(): void {}
<<<<<<< HEAD

=======
  hide = true;
  get passwordInput() { return this.form.controls.password2; } 
>>>>>>> d58d6d1a41ac3e41ed84db7bb6b96e79692cbc5c
  onSubmit() {
    console.log(
      this.form.controls.username.value,
      this.form.controls.password.value
    );
  }
}
