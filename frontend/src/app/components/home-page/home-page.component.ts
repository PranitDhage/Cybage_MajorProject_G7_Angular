import { Component, ElementRef, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { UsiService } from 'src/app/utility/services/usi.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  visible1: boolean = true;
  visible: boolean = false; 
  visible2:boolean=false;
  currentUser: any;
  currentLoggedUserObj: any;
  role: string;
  @ViewChild("navbar") firstChild: ElementRef;

oTop:any;
  constructor(private _userService: UsiService,
    private toastr: ToastrService,
    private _router: Router) {
   }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); 
    this.currentLoggedUserObj = JSON.parse(
      sessionStorage.getItem('currentLoggedUser')
    );
    this.role = this.currentLoggedUserObj.role;
    this.currentUser=this.currentLoggedUserObj.username;
}

ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
}

scroll = (event: any): void => {
  if(window.scrollY>986){
    this.visible=true;
    this.visible1=false;
  }else{this.visible=false
    this.visible1=true;}
};
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
