import { Component, OnInit } from '@angular/core';
import { ANIMALS } from 'src/app/utility/MatchingGame/Animal'; 

@Component({
  selector: 'app-game-two',
  templateUrl: './game-two.component.html',
  styleUrls: ['./game-two.component.scss']
})
export class GameTwoComponent implements OnInit {
  animals = ANIMALS;

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
