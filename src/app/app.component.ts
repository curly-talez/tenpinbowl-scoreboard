import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'scoreBoard';
  frames = [1,2,3,4,5,6,7,8,9,10];

  isStrike = false;
  isSpare = false;

  currentScore = 0;
  remainingRollesForFrame = 2; 
  currentFrameIndex = 0;
  currentFrame = 0;

  frameDetailsMap: any = {};
  framesWithAdditionalRolls: number[] = []
  
  ngOnInit(): void {
    for (let i = 1;  i < this.frames.length+1; i++) {
      this.frameDetailsMap[i] = {
        frame: i,
        scores: [],
        totalScores: 0,
        additionalRolls: 0,
        isSpare: false,
        isStrike: false
      }
    }
  }

  newBall() {
    this.currentFrame = this.frames[this.currentFrameIndex];
    if (this.remainingRollesForFrame === 2) {
      this.firstRoll();
    } else {
      this.secondRoll();
    }
    console.log('New Ball ------------------', this.frameDetailsMap[this.currentFrame]),
    console.log('framesWithAdditionalRolls--------------', this.framesWithAdditionalRolls)
  }

  firstRoll() {
    this.currentScore = this.generateRandomNumber(11);
    if(this.currentScore === 10) { // strike
      this.frameDetailsMap[this.currentFrame].isStrike = true;
      this.remainingRollesForFrame = 2;
      this.currentFrameIndex++;
      this.frameDetailsMap[this.currentFrame].additionalRolls = 2;
      this.framesWithAdditionalRolls.push(this.currentFrame);
    } else { // not a strike
      this.remainingRollesForFrame--;
    }
    this.frameDetailsMap[this.currentFrame].scores.push(this.currentScore);
    this.frameDetailsMap[this.currentFrame].totalScores += this.currentScore;
  }

  secondRoll() {
    this.remainingRollesForFrame = 2;
    this.currentFrameIndex ++;
    this.currentScore = this.generateRandomNumber(11-this.currentScore);
    this.frameDetailsMap[this.currentFrame].scores.push(this.currentScore);
    this.frameDetailsMap[this.currentFrame].totalScores += this.currentScore;
    if (this.frameDetailsMap[this.currentFrame].totalScores === 10) { // spare
      this.frameDetailsMap[this.currentFrame].isSpare = true;
      this.frameDetailsMap[this.currentFrame].additionalRolls = 1;
      this.framesWithAdditionalRolls.push(this.currentFrame);
    }
  }

  generateRandomNumber (roll: number) {
    return  Math.floor(Math.random() * roll)
  }
}

/***
  1. Bowl
    cases
    1. first bawl
      - 10 points
      - < 10 points
      - 0 points
    2. Second bawl
      - 10 points
      - first and second 10 points =>  spare
      - first and second  < 10 points
      - second ball 0 points
 */