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
        totalScoresOfAFrame: 0,
        additionalRolls: 0,
        additionalScores: [],
        isSpare: false,
        isStrike: false,
        totalScoresOfPlayer: 0
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
    this.getTotalScoresOfPlayer(this.currentFrame);
  }

  firstRoll() {
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

  secondRoll() {
    this.remainingRollesForFrame = 2;
    this.currentFrameIndex ++;
    this.currentScore = this.generateRandomNumber(11-this.currentScore);
    this.getTotalScoresOfFrame();
    this.addScoresForAdditionalBowls();
    if (this.frameDetailsMap[this.currentFrame].totalScoresOfAFrame === 10) { // spare
      this.frameDetailsMap[this.currentFrame].isSpare = true;
      this.frameDetailsMap[this.currentFrame].additionalRolls = 1;
      this.framesWithAdditionalRolls.push(this.currentFrame);
    }
  }

  generateRandomNumber (roll: number) {
    return  Math.floor(Math.random() * roll)
  }

  addScoresForAdditionalBowls() {
    if (this.framesWithAdditionalRolls.length > 0) {
      for(let i = 0; i < this.framesWithAdditionalRolls.length; i++) {
        let frame = this.framesWithAdditionalRolls[i]
        // console.log('frame with additional bowl - ', frame );

        if (this.frameDetailsMap[frame].additionalRolls === 0) {
          this.framesWithAdditionalRolls.slice(this.framesWithAdditionalRolls.indexOf(frame), 1);
          console.log('additional rolls is zero after removing roll', this.framesWithAdditionalRolls)
        } else if (this.frameDetailsMap[frame].additionalRolls > 0) {
          this.frameDetailsMap[frame].additionalScores.push(this.currentScore);
          this.frameDetailsMap[frame].totalScoresOfAFrame += this.currentScore;
          this.frameDetailsMap[frame].additionalRolls--;
        }
        console.log('remaing frames with additional bowls', this.framesWithAdditionalRolls)
      }
    }
  }

  getTotalScoresOfFrame() {
    this.frameDetailsMap[this.currentFrame].scores.push(this.currentScore);
    this.frameDetailsMap[this.currentFrame].totalScoresOfAFrame += this.currentScore;
  }

  getTotalScoresOfPlayer (frame: number) {
    let totalScores = 0;
    for ( let i =1 ;  i <= frame; i++) {
      totalScores += this.frameDetailsMap[i].totalScoresOfAFrame;
      this.frameDetailsMap[i].totalScoresOfPlayer = totalScores;
    }
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