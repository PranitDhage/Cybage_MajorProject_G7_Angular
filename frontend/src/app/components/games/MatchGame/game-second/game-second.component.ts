import { Component, OnInit } from '@angular/core';
import { Superhero } from 'src/app/utility/MatchingGame/Superhero'; 

@Component({
  selector: 'app-game-second',
  templateUrl: './game-second.component.html',
  styleUrls: ['./game-second.component.scss']
})
export class GameSecondComponent implements OnInit {

  heros = Superhero;

  leftpartSelectedId:number = -1;
  rightpartSelectedId:number = -1;

  constructor() { }

  ngOnInit() { }
  
  onLeftpartSelected(id:any):void{
	  this.leftpartSelectedId = id;
  }
  
  onRightpartSelected(id:any):void{
	  this.rightpartSelectedId = id;
  }
  
  onLeftpartUnselected():void{
	  this.leftpartSelectedId = -1;
  }
  
  onRightpartUnselected():void{
	  this.rightpartSelectedId = -1;
  }

}
