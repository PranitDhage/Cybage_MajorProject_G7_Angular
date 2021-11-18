import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsiService } from 'src/app/utility/services/usi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  regForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UsiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  formSubmit() {
    console.log(this.regForm.value);
    this.userService.registerUser(this.regForm.value).subscribe(
      (res) => {
        this.toastr.success('signed up successfully');
        this.regForm.reset();
        if (res.success) {
          this.router.navigate(['login']);
        } else {
          console.log(res);
        }
      },
      (err) => [this.toastr.error('Something went wrong')]
    );
  }

  get username() {
    return this.regForm.get('username');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }
}
