import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as Parse from 'parse';
import {Router} from '@angular/router';

@Component({
  selector: 'f4erp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      email: [],
      password: [],
    });
  }

  ngOnInit() {
  }

  async signIn() {
    this.isLoading = true;
    const formValue = this.formGroup.value;
    const authenticated = await Parse.User.logIn(formValue.email, formValue.password).catch(e => {
      this.isLoading = false;
      alert('Error while login');
      throw e;
    });
    this.router.navigateByUrl('/dashboard');
  }

}
