const players = [];
// Choosing number of players (2-8)
let playerCount = 2;
let selectedScore = 501;
let doubleOut = true;
let legsToWin = 1;

let score = "";

// Get input from keypad
document.querySelectorAll(".keypad-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let clickedDigits = btn.innerHTML;
    score = score + clickedDigits;
    document.getElementById("score-input").value = score;
  });
});
document.getElementById("clear-btn").addEventListener("click", () => {
  score = "";
  document.getElementById("score-input").value = score;
});

// Store score for later use
document.getElementById("submit-score").addEventListener("click", () => {
  if (score === "") {
    showErrorMessage("Can't submit empty score, enter 0");
    return;
  }
  let currentScore = parseInt(score);
  if (currentScore > 180) {
    showErrorMessage("Score can't be more than 180");
    score = "";
    document.getElementById("score-input").value = score;
    return;
  } else {
    score = "";
    document.getElementById("score-input").value = score;
  }
});

// Display error and success message
function showErrorMessage(message) {
  const messageContainer = document.getElementById("display-message");
  messageContainer.innerHTML = "";

  const errorHeading = document.createElement("h2");
  errorHeading.classList.add("error");
  errorHeading.textContent = message;

  messageContainer.appendChild(errorHeading);
}

function showSuccessMessage(message) {
  const messageContainer = document.getElementById("display-message");
  messageContainer.innerHTML = "";

  const successHeading = document.createElement("h2");
  successHeading.classList.add("success");
  successHeading.textContent = message;

  messageContainer.appendChild(successHeading);
}

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
  selectedScore = 501;
  doubleOut = true;
  legsToWin = 1;
  document.getElementById("settings").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
  document
    .querySelectorAll(".nr-of-players button")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelector('.nr-of-players button[data-players="2"]')
    .classList.add("active");
  document.getElementById("player-names-container").innerHTML = "";
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

// handle double out or single out selection
document.querySelectorAll(".out-option button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".out-option button").forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    doubleOut = btn.dataset.double === "true";
  });
});

// Handle legs to win section
document.querySelectorAll(".legs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".legs button").forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    legsToWin = parseInt(btn.dataset.legs);
  });
});

// Create users based on playerCount
const createPlayer = (playerNumber, name, startingScore, doubleOut) => {
  const defaultPlayer = {
    name: name || `Player ${playerNumber + 1}`,
    startingScore: startingScore,
    currentScore: startingScore,
    throws: [],
    avg: 0,
    lastScore: 0,
    handicap: false,
    doubleOut: doubleOut,
    legsWon: 0,
    isMyTurn: playerNumber === 0 ? true : false,
    lastDartDouble: false,
  };
  players.push(defaultPlayer);
};

// Display players
function displayPlayers() {
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = "";
  players.forEach((player, index) => {
    const playerDiv = document.createElement("div");

    playerDiv.classList.add("player-card");
    playerDiv.id = `player-${index}`;
    if (player.isMyTurn) {
      playerDiv.classList.add("player-turn");
    }

    const scoreLegsDiv = document.createElement("div");
    scoreLegsDiv.classList.add("score-legs");

    const nameHeading = document.createElement("h3");
    nameHeading.textContent = player.name;

    const scoreHeading = document.createElement("h3");
    scoreHeading.id = `player-score-${index}`;
    scoreHeading.textContent = `${player.currentScore}`;

    const legsPara = document.createElement("p");
    legsPara.id = `player-legs-${index}`;
    legsPara.textContent = `${player.legsWon}`;

    playersContainer.appendChild(playerDiv);
    playerDiv.appendChild(nameHeading);
    playerDiv.appendChild(scoreLegsDiv);
    scoreLegsDiv.appendChild(scoreHeading);
    scoreLegsDiv.appendChild(legsPara);
  });
}

// Display current player stats
function displayCurrentPlayerStats() {
  const currentPlayerDiv = document.getElementById("current-player");
  currentPlayerDiv.innerHTML = "";
  const playerIsMyTurn = players.find((player) => player.isMyTurn === true);

  if (playerIsMyTurn) {
    const nameHeading = document.createElement("h3");
    nameHeading.textContent = playerIsMyTurn.name;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");

    const avgDiv = document.createElement("div");
    avgDiv.classList.add("avg");

    const lastScoreDiv = document.createElement("div");
    lastScoreDiv.classList.add("last-score");

    const dartsThrownDiv = document.createElement("div");
    dartsThrownDiv.classList.add("darts-thrown");

    const scoreDisplay = document.createElement("h3");
    scoreDisplay.classList.add("score");
    scoreDisplay.textContent = playerIsMyTurn.currentScore;

    const avgTitle = document.createElement("h4");
    avgTitle.classList.add("title");
    avgTitle.textContent = "3-dart average:";

    const avgValue = document.createElement("h4");
    avgValue.classList.add("value");
    avgValue.textContent = playerIsMyTurn.avg;

    const lastScoreTitle = document.createElement("h4");
    lastScoreTitle.classList.add("title");
    lastScoreTitle.textContent = "Last score:";

    const lastScoreValue = document.createElement("h4");
    lastScoreValue.classList.add("value");
    lastScoreValue.textContent = playerIsMyTurn.lastScore;

    const dartsThrownTitle = document.createElement("h4");
    dartsThrownTitle.classList.add("title");
    dartsThrownTitle.textContent = "Darts thrown:";

    const dartsThrownValue = document.createElement("h4");
    dartsThrownValue.classList.add("value");
    dartsThrownValue.textContent = playerIsMyTurn.throws.length;

    currentPlayerDiv.appendChild(infoDiv);
    infoDiv.appendChild(nameHeading);
    infoDiv.appendChild(scoreDisplay);
    currentPlayerDiv.appendChild(statsDiv);
    statsDiv.appendChild(avgDiv);
    avgDiv.appendChild(avgTitle);
    avgDiv.appendChild(avgValue);

    statsDiv.appendChild(lastScoreDiv);
    lastScoreDiv.appendChild(lastScoreTitle);
    lastScoreDiv.appendChild(lastScoreValue);

    statsDiv.appendChild(dartsThrownDiv);
    dartsThrownDiv.appendChild(dartsThrownTitle);
    dartsThrownDiv.appendChild(dartsThrownValue);
  }
}

// Confirm settings and start game
const startGameBtn = document.getElementById("start-game-btn");
startGameBtn.addEventListener("click", startGame);
function startGame() {
  players.length = 0; // Clear previous players
  for (let i = 0; i < playerCount; i++) {
    let userName = document.getElementById(`player-name-${i}`).value.trim();
    createPlayer(i, userName, selectedScore, doubleOut);
  }
  displayPlayers();
  displayCurrentPlayerStats();

  // Hide settings and show game interface
  document.getElementById("settings").classList.add("hidden");

  document.getElementById("game").classList.remove("hidden");
}

// Game logic

// Player presses submit
function submitTurn() {
  const playerIsMyTurn = players.find((player) => player.isMyTurn === true);
  let tempScore = parseInt(score);
  if (!playerIsMyTurn) {
    showErrorMessage("Error, It is not your turn"); // Guard to check for logic error
    return;
  } else {
    // Check if user has double out or single out
    if (playerIsMyTurn.doubleOut) {
      if (
        tempScore === playerIsMyTurn.currentScore &&
        playerIsMyTurn.lastDartDouble
      ) {
        // Player won
        showSuccessMessage(`Congratulations! ${playerIsMyTurn.name}, You won!`);
      } else if (tempScore > playerIsMyTurn.currentScore) {
        showErrorMessage("No score");
        // Update throws, update stats and move turn to next player.
      } else {
        if (playerIsMyTurn.currentScore - tempScore) {
          showErrorMessage("No score, Can't checkout 1");
          // Run playerBust()
        } else {
          // Player did not win yet, update score and stats + move to next player
        }
      }
    } else {
      if (tempScore === playerIsMyTurn.currentScore) {
        // Player won
        showSuccessMessage(`Congratulations! ${playerIsMyTurn.name}, You won!`);
      } else if (tempScore > playerIsMyTurn.currentScore === 1) {
        showErrorMessage("No score");
        // Update throws, set score === 0, update stats and move turn to next player.
      } else {
        // Player did not win yet, update score and stats + move to next player
      }
    }
  }
}

// Move current player
function nextPlayerTurn() {}

// Update score
function updateScore(score) {}

// New game/reset button eventListener
document.getElementById("new-game-btn").addEventListener("click", resetGame);

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
- Sound effects
- Mobile friendly
- Validate score input (0-180)
- History log (display all scores thrown in the game at end of round)

)
*/
