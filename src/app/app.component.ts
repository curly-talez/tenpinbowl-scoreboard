import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scoreBoard';
  frames = [1,2,3,4,5,6,7,8,9,10];

  isStrike = false;
  isSpare = false;

  currentScore = 0;
  remainingRollesForFrame = 2; 
  currentFrameIndex = 0;
  currentFrame = 0;

  newBall() {
    this.currentFrame = this.frames[this.currentFrameIndex];
    console.log('Current Frame: ', this.currentFrame);

    if (this.remainingRollesForFrame === 2) {
      this.firstRoll();
    } else {
      this.secondRoll();
    }
  }

  firstRoll() {
    this.currentScore = this.generateRandomNumber(11);
    if(this.currentScore === 10) { // strike
      this.remainingRollesForFrame = 2;
      this.currentFrameIndex++;
    } else { // not a strike
      this.remainingRollesForFrame--;
    }
    console.log('This is first roll!--------', this.currentScore);
  }

  secondRoll(secRoll?: number) {
    this.remainingRollesForFrame = 2;
    this.currentFrameIndex ++;
    this.currentScore = this.generateRandomNumber(11-this.currentScore);
    console.log('This is second roll!---------', this.currentScore);
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