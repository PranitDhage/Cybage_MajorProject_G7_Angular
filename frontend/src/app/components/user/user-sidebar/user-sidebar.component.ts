import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsiService } from 'src/app/utility/services/usi.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss'],
})
export class UserSidebarComponent implements OnInit {
  categories: any;
  constructor(
    private _userService: UsiService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  logout() {
    this._userService.logout().subscribe((res: any) => {
      if (res['success']) {
        sessionStorage.removeItem('username');
        this.toastr.success(res['message']);
        this._router.navigate(['/login']);
      }
    });
  }
}
