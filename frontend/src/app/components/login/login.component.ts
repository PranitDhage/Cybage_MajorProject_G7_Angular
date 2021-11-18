import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsiService } from 'src/app/utility/services/usi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
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
    this.userService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (res.success) {
          sessionStorage.setItem('currentLoggedUser', JSON.stringify(res.user));
          this.toastr.success(
            'Wel Come ' + res.user.username + ' to Bestify Your Time'
          );
          if (res.user.role === 'admin') {
            this.router.navigate(['/admin-dash']);
          }
          if (res.user.role === 'user') {
            this.router.navigate(['/user-dashboard']);
          }
        } else {
          console.log(res);
        }
      },
      (err) => {
        this.toastr.error('Invalid Username Or Password..!');
      }
    );
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
