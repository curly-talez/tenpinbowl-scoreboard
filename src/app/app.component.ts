// Angular imports
import { Component, OnInit } from '@angular/core';

// user defined service imports
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  frames: number[] = [];

  currentScore = 0;
  remainingRollesForFrame = 2; 
  currentFrameIndex = 0;
  currentFrame = 0;

  frameDetailsMap: any = {};
  framesWithAdditionalRolls: number[] = []

  toggleTable = true;
  disableBowlButton:boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.frames = this.commonService.frames;
    this.createFrameDetailsMap();
  }

  // Method for starting new game
  newGame(): void {
    this.createFrameDetailsMap();
    this.currentFrameIndex=0;
  }

  // method to toggle hide and show detailed score table
  toggleTableView(): void {
    this.toggleTable = !this.toggleTable;
  }

  // Method to set frameDetailsMap
  createFrameDetailsMap(): void {
  for (let i = 1;  i < this.frames.length+1; i++) {
    this.frameDetailsMap[i] = {
      frame: i,
      scores: [],
      totalScoresOfAFrame: 0,
      additionalRolls: 0,
      additionalScores: [],
      isSpare: false,
      isStrike: false,
      totalScoresOfPlayer: 0
    }
  }
  this.commonService.frameDetailsMap = this.frameDetailsMap;
  this.disableButton();
  }

  // Method to do new bowl
  newBall(): void {
    this.currentFrame = this.frames[this.currentFrameIndex];
    if (this.frameDetailsMap[this.currentFrame]) {
      if (this.remainingRollesForFrame === 2) {
        this.firstRoll();
      } else {
        this.secondRoll();
      }
      this.getTotalScoresOfPlayer(this.currentFrame);
      this.disableButton();
    }
  }

  firstRoll(): void{
    this.currentScore = this.generateRandomNumber(11);
    this.addScoresForAdditionalBowls();

    if(this.currentScore === 10) { // strike
      this.frameDetailsMap[this.currentFrame].isStrike = true;
      this.remainingRollesForFrame = 2;
      this.currentFrameIndex++;
      this.frameDetailsMap[this.currentFrame].additionalRolls = 2;
      this.framesWithAdditionalRolls.push(this.currentFrame);
    } else { // not a strike
      this.remainingRollesForFrame--;
    }
   this.getTotalScoresOfFrame();
  }

  secondRoll(): void {
    this.currentFrameIndex ++;
    this.remainingRollesForFrame = 2;

    this.currentScore = this.generateRandomNumber(11-this.currentScore);
    this.getTotalScoresOfFrame();
    this.addScoresForAdditionalBowls();
    if (this.frameDetailsMap[this.currentFrame].totalScoresOfAFrame === 10) { // spare
      this.frameDetailsMap[this.currentFrame].isSpare = true;
      this.frameDetailsMap[this.currentFrame].additionalRolls = 1;
      this.framesWithAdditionalRolls.push(this.currentFrame);
    }
  }

  // generate random score for each bowl
  generateRandomNumber (roll: number): number {
    return  Math.floor(Math.random() * roll)
  }

  // Add score for spare and strike
  addScoresForAdditionalBowls(): void{
    if (this.framesWithAdditionalRolls.length > 0) {
      for(let i = 0; i < this.framesWithAdditionalRolls.length; i++) {
        let frame = this.framesWithAdditionalRolls[i]
        // console.log('frame with additional bowl - ', frame );

        if (this.frameDetailsMap[frame].additionalRolls === 0) {
          this.framesWithAdditionalRolls.splice(this.framesWithAdditionalRolls.indexOf(frame), 1);
        } else if (this.frameDetailsMap[frame].additionalRolls > 0) {
          this.frameDetailsMap[frame].additionalScores.push(this.currentScore);
          this.frameDetailsMap[frame].totalScoresOfAFrame += this.currentScore;
          this.frameDetailsMap[frame].additionalRolls--;
        }
      }
    }
  }

  // Method for calculating scores for each frame
  getTotalScoresOfFrame(): void {
    this.frameDetailsMap[this.currentFrame].scores.push(this.currentScore);
    this.frameDetailsMap[this.currentFrame].totalScoresOfAFrame += this.currentScore;
  }

  // Method for calculating total scores of the player
  getTotalScoresOfPlayer (frame: number): void {
    let totalScores = 0;
    for ( let i =1 ;  i <= frame; i++) {
      totalScores += this.frameDetailsMap[i].totalScoresOfAFrame;
      this.frameDetailsMap[i].totalScoresOfPlayer = totalScores;
    }
  }

  disableButton(): void {
    if (this.frameDetailsMap[10].isSpare || this.frameDetailsMap[10].isStrike) {
      this.disableBowlButton = this.currentFrame >= 10 && this.frameDetailsMap[10].additionalRolls === 0;
    } else if (!this.frameDetailsMap[10].isStrike && !this.frameDetailsMap[10].isSpare) {
      this.disableBowlButton = this.currentFrame === 10 && this.frameDetailsMap[10].scores.length === 2;
    }
  }
}
