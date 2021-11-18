import { Component, OnInit } from '@angular/core';
import { UsiService } from 'src/app/utility/services/usi.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  users: any = [];
  constructor(private _userService: UsiService) {}

  ngOnInit(): void {
    // this.user.loginUser().subscribe(
    //   (data) => {
    //     this.users = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //     // Swal.fire()
    //   }
    // );

    this._userService.getAllUser().subscribe(
      (res)=>{
        console.log(res);
        this.users = res.users;
      }
    )

  }
}
