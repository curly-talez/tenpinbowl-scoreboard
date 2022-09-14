import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const frameDetailsMap = {
    1: {
      frame: 1,
      scores: [],
      totalScoresOfAFrame: 0,
      additionalRolls: 0,
      additionalScores: [],
      isSpare: false,
      isStrike: false,
      totalScoresOfPlayer: 0
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });

  it('should check newGame method', () => {
    spyOn(component, 'createFrameDetailsMap');

    component.newGame();

    expect(component.createFrameDetailsMap).toHaveBeenCalled();
    expect(component.currentFrameIndex).toEqual(0);
  });

  it('should check toggleTableView method', () => {
    component.toggleTable = false;

    component.toggleTableView();

    expect(component.toggleTable).toEqual(true);
  })

  it('should check newBowl method for a first roll', () => {
    component.currentFrame = 1;
    component.frameDetailsMap = frameDetailsMap;
    component.remainingRollesForFrame = 2;
    spyOn(component,'firstRoll');
    spyOn(component, 'secondRoll');
    spyOn(component, 'getTotalScoresOfPlayer');
    spyOn(component,'disableButton');

    component.newBall();

    expect(component.firstRoll).toHaveBeenCalled();
    expect(component.secondRoll).not.toHaveBeenCalled();
    expect(component.getTotalScoresOfPlayer).toHaveBeenCalledWith(1);
    expect(component.disableButton).toHaveBeenCalled();
  })

  it('should check newBowl method for a second roll', () => {
    component.currentFrame = 1;
    component.frameDetailsMap = frameDetailsMap;
    component.remainingRollesForFrame = 1;
    spyOn(component,'firstRoll');
    spyOn(component, 'secondRoll');
    spyOn(component, 'getTotalScoresOfPlayer');
    spyOn(component,'disableButton');

    component.newBall();

    expect(component.firstRoll).not.toHaveBeenCalled();
    expect(component.secondRoll).toHaveBeenCalled();
    expect(component.getTotalScoresOfPlayer).toHaveBeenCalledWith(1);
    expect(component.disableButton).toHaveBeenCalled();
  })

  it('should check the firstRoll(), not strike case', () => {
    component.currentScore = 5;
    spyOn(component, 'addScoresForAdditionalBowls');
    spyOn(component, 'getTotalScoresOfFrame');
    
    component.currentFrame =1;

    component.firstRoll();

    expect(component.addScoresForAdditionalBowls).toHaveBeenCalled();
    expect(component.remainingRollesForFrame).toEqual(1);
    expect(component.getTotalScoresOfFrame).toHaveBeenCalled();
  })

  it('should check the firstRoll(), strike case', () => {
    component.currentScore = 10;
    component.currentFrame =1;
    spyOn(component, 'addScoresForAdditionalBowls');
    spyOn(component, 'getTotalScoresOfFrame');

    component.firstRoll();

    expect(component.addScoresForAdditionalBowls).toHaveBeenCalled();
    expect(component.getTotalScoresOfFrame).toHaveBeenCalled();
    
  })

  it('should check the secondRoll(), not spare case', () => {
    component.currentFrameIndex = 0;
    component.remainingRollesForFrame = 0;
    component.currentScore = 2;
    component.currentFrame = 1;
    spyOn(component, 'getTotalScoresOfFrame');
    spyOn(component, 'addScoresForAdditionalBowls');

    component.secondRoll();

    expect(component.currentFrameIndex).toEqual(1);
    expect(component.remainingRollesForFrame).toEqual(2);
    expect(component.getTotalScoresOfFrame).toHaveBeenCalled();
    expect(component.addScoresForAdditionalBowls).toHaveBeenCalled();  
  })
  

  it('should check the secondRoll(), spare case', () => {
    component.currentFrameIndex = 0;
    component.remainingRollesForFrame = 0;
    component.currentScore = 5;
    component.currentFrame = 1;
    component.frameDetailsMap = {
      1: {...frameDetailsMap[1], 
        scores: [5,5],
        totalScoresOfAFrame: 10,
        additionalRolls: 1,
        isSpare: true,
        totalScoresOfPlayer: 10}
    }
    spyOn(component, 'getTotalScoresOfFrame');
    spyOn(component, 'addScoresForAdditionalBowls');

    component.secondRoll();

    expect(component.currentFrameIndex).toEqual(1);
    expect(component.remainingRollesForFrame).toEqual(2);
    expect(component.getTotalScoresOfFrame).toHaveBeenCalled();
    expect(component.addScoresForAdditionalBowls).toHaveBeenCalled();  
  })

  it ('should remove the frame from framesWithAdditionalRolls if additionalRolls = 0', () => {
    component.framesWithAdditionalRolls = [1];
    component.frameDetailsMap = frameDetailsMap;

    component.addScoresForAdditionalBowls();

    expect(component.framesWithAdditionalRolls).toEqual([]);
  })

  it ('should calculate additinal scores for all frames in framesWithAdditionalRolls', () => {
    component.currentScore = 3;
    component.frameDetailsMap[1] = {
      ... frameDetailsMap[1],
      additionalRolls: 1,
      totalScoresOfAFrame: 10,
    }
    component.framesWithAdditionalRolls = [1];

    component.addScoresForAdditionalBowls();

    expect(component.frameDetailsMap[1].additionalScores).toEqual([3]);
    expect(component.frameDetailsMap[1].additionalRolls).toEqual(0);

  })

  it('should check getTotalScoresOfFrame of the frame', () => {
    component.currentFrame = 1;
    component.currentScore = 3;
    component.frameDetailsMap = {
      ... frameDetailsMap
    }

    component.getTotalScoresOfFrame();

    expect(component.frameDetailsMap[1].scores).toEqual([3]);
    expect(component.frameDetailsMap[1].totalScoresOfAFrame).toEqual(3)
  })

});
