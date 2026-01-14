/*
- Player stats: 
  - Last scores (Array)
  - Average score 3-darts (calculated from array)
  - Total throws (can be calculated from array, array.length / 3)

- Win condition
  - Display winner
    START 
      IF scor is 0 
      AND last score is double 
      THEN display winner
    END
  - Play again button
    START
      IF winner is displayed
      AND legs/sets is over
      AND play again button is clicked
      THEN reset game
    END
  - Double out check
      START
      IF score is 0
      PROMT player to confirm last score was double
      IF not double
      REVERT score to before last throw
      NOTIFY player that last score must be double to win
    END
  - Display possible checkouts?

- Reset game (auto when player wins)
- Legs, sets (best of X)
- Add player(s) (more than 2 players, up to 6-8?
- Sound effects
- Improve UI (better layout, colors, responsiveness
- Mobile friendly
- Validate score input (0-180)
- History log (display all scores thrown in the game at end of round)

)
*/
