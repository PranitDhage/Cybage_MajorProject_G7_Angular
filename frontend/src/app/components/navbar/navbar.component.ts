import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsiService } from 'src/app/utility/services/usi.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  currentLoggedUserObj: any;
  role: string;

  constructor(
    private _userService: UsiService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.currentLoggedUserObj = JSON.parse(
      sessionStorage.getItem('currentLoggedUser')
    );

    this.currentUser = this.currentLoggedUserObj.username;
    this.role = this.currentLoggedUserObj.role;
  }

  loggedIn() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentLoggedUser'));
    return currentUser;
  }

  onLogout() {
    this._userService.logout().subscribe((res: any) => {
      if (res['success']) {
        sessionStorage.clear();
        this.toastr.success(res['message']);
        this._router.navigate(['/login']);
      }
    });
  }
}
