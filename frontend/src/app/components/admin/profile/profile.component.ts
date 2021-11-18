import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsiService } from 'src/app/utility/services/usi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
id:any;
  user:any;
  constructor(private _route:ActivatedRoute, private login:UsiService) { }

  ngOnInit(): void {
    this.id=this._route.snapshot.params.id;
    // this.user=this.login.getCurrentUser(this.id).subscribe(
    //   (data:any)=>{
    //     console.log(data);
        
    //     this.user=data.user;
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // );

    this.user= JSON.parse(sessionStorage.getItem("currentLoggedUser"));

  }

}
