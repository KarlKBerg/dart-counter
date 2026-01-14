const players = [];
// Choosing number of players (2-8)
let playerCount = 2;

document.querySelectorAll(".nr-of-players button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".nr-of-players button").forEach((b) => {
      b.classList.remove("active");
    });
    // Add active class to clicked button
    btn.classList.add("active");
    // Set playerCount based on button clicked
    playerCount = parseInt(btn.dataset.players);
  });
});

// Create users based on playerCount
const createPlayer = (playerNumber) => {
  const defaultPlayer = {
    name: `Player ${playerNumber + 1}`,
    startingScore: 501,
    currentScore: 501,
    throws: [],
    avg: 0,
    lastScore: 0,
    handicap: false,
    doubleOut: true,
    legsWon: 0,
    isMyTurn: playerNumber === 0 ? true : false,
  };
  players.push(defaultPlayer);
};

// Confirm settings and start game
const startGameBtn = document.getElementById("start-game-btn");
startGameBtn.addEventListener("click", startGame);
function startGame() {
  // Add logic for creating players based on user input
  // get playerCount from user input
  for (let i = 0; i < playerCount; i++) {
    createPlayer(i);
  }
  console.log(players);
  console.log(playerCount);

  // Hide settings and show game interface
  document.getElementById("settings").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
}

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
