# ScoreBoard

I have developed a score board for Ten Pin Ball considering Traditional Rules for scoring using Angular 13.3.11. Application is not responsive for the time being, it is designed for desktops. I can continue the enhancements in future.

Commands Used:

To start Application:

```
ng serve
```

To run unit tests:

```
ng test
```

I have created 3 component in addition to the root component, and a service for storing commonly shared data.

Components:

1. frame-details
   This component displayes the frames when the game is in progress and displays the totals scores obtained when the game has finised.
2. frame-score-details
   This component contains the Score board view.
3. score-detailed-table
   This component show the detailed view of scores obtained in each bowl, including the additional scores added to frame due to Strike or Spare obtained in the same frame.

Service:

1. common
   This service keeps the shared details like frames arry and frameDetailsMap object

Rules Cosidered for Development:

1. One point is scored for each pin knocked over.
2. Ten frames in a game, each frame has two rolls.
3. When less than 10 pins are knocked in a frame taking two rolls, totals score of the frame is calculated by adding the scores of the individual rolls made in the same frame
4. STRIKE:
   - When player knocks all pins in a single first roll of a frame, then it is a Strike.
   - Strike is marked as 'X' in the score board.
   - When there is a strike, frame receives 10 pins + bonus of pinfall on the next two rolls
   - For 10th frame's strike, 10 th frame receives two extra rolls for bonus pins
5. SPARE
   - When player knocks all pins in a second roll (taking two rolls) of a frame, then it is a Spare.
   - Spare is marked as '/' in the score board.
   - When there is a Spare, frame receives 10 pins + bonus of pinfall on the next roll
   - For 10th frame's Spare, 10th frame receives one extra rolls for bonus pins

Preview Screenshot:
![preview](/src/assets/preview.png)
