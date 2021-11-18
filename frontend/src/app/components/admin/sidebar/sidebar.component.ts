import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsiService } from 'src/app/utility/services/usi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private _userService: UsiService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  logout() {
    this._userService.logout().subscribe((res: any) => {
      if (res['success']) {
        sessionStorage.clear();
        this.toastr.success(res['message']);
        this._router.navigate(['/login']);
      }
    });
  }
}
