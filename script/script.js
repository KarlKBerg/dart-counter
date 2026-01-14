const players = [];
// Choosing number of players (2-8)
let playerCount = 2;
let selectedScore = 501;

// Handle number of players button clicks
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

    // Create input fields for player names based on playerCount
    const playerNamesContainer = document.getElementById(
      "player-names-container"
    );
    for (let i = 0; i < playerCount; i++) {
      if (!document.getElementById(`player-name-${i}`)) {
        const div = document.createElement("div");
        div.classList.add("player-name-input");

        const label = document.createElement("label");
        label.textContent = `Player ${i + 1}: `;

        const input = document.createElement("input");
        input.type = "text";
        input.id = `player-name-${i}`;
        input.name = `player-name-${i}`;
        input.placeholder = `Player ${i + 1}`;
        playerNamesContainer.appendChild(div);
        div.appendChild(label);
        div.appendChild(input);
      }
    }
    // Remove extra input fields if playerCount is decreased
    const existingInputs =
      playerNamesContainer.querySelectorAll(".player-name-input");
    existingInputs.forEach((inputDiv, index) => {
      if (index >= playerCount) {
        playerNamesContainer.removeChild(inputDiv);
      }
    });
    // reset player array
    players.length = 0;
  });
});

// reset game function
const resetGame = () => {
  players.length = 0;
  playerCount = 2;
  document
    .querySelectorAll(".nr-of-players button")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelector('.nr-of-players button[data-players="2"]')
    .classList.add("active");
  document.getElementById("player-names-container").innerHTML = "";
  document.getElementById("settings").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
};

// Create users based on playerCount
const createPlayer = (playerNumber, name, startingScore) => {
  const defaultPlayer = {
    name: name || `Player ${playerNumber + 1}`,
    startingScore: startingScore,
    currentScore: startingScore,
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

// Handle starting score selection
document.querySelectorAll(".starting-score button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".starting-score button").forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    selectedScore = parseInt(btn.dataset.score);
  });
});

// Confirm settings and start game
const startGameBtn = document.getElementById("start-game-btn");
startGameBtn.addEventListener("click", startGame);
function startGame() {
  players.length = 0; // Clear previous players
  for (let i = 0; i < playerCount; i++) {
    let userName = document.getElementById(`player-name-${i}`).value.trim();
    createPlayer(i, userName, selectedScore);
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
