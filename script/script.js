const user1 = {
  name: "Karl",
  totalScore: 501,
  score: 0,
  scores: [],
  isMyTurn: true,
  throwCounter: 0,
};

const user2 = {
  name: "Guest",
  totalScore: 501,
  score: 0,
  scores: [],
  isMyTurn: false,
  throwCounter: 0,
};
score = Number(document.getElementById("score-number").value);
let calculateScore = (totalScore, score) => {
  score = Number(document.getElementById("score-number").value);
  totalScore = totalScore - score;
  return totalScore;
};

let update = () => {
  let userSelect1 = document.getElementById("user1");
  let userSelect2 = document.getElementById("user2");
  if (user1.isMyTurn) {
    user1.throwCounter++;
    user1.scores.push(user1.score);
    user1.isMyTurn = false;
    user2.isMyTurn = true;
    userSelect1.classList.remove("turn");
    userSelect2.classList.add("turn");
    document.getElementById("user1-score").textContent = user1.totalScore;
  } else if (user2.isMyTurn) {
    user2.throwCounter++;
    user2.scores.push(user2.score);
    user2.isMyTurn = false;
    user1.isMyTurn = true;
    userSelect1.classList.add("turn");
    userSelect2.classList.remove("turn");
    document.getElementById("user2-score").textContent = user2.totalScore;
  }
};

// Check turn
function submitScore() {
  if (user1.isMyTurn) {
    let userScore = Number(document.getElementById("score-number").value);
    user1.score = userScore;
    user1.totalScore = calculateScore(user1.totalScore, user1.score);
    update();
  } else if (user2.isMyTurn) {
    let userScore = Number(document.getElementById("score-number").value);
    user2.score = userScore;
    user2.totalScore = calculateScore(user2.totalScore, user2.score);
    update();
  }
}

/*
- Player stats: 
  - Last scores
  - Average score 3-darts
  - Total throws

- Win condition
  - Display winner
  - Play again button
  - Double out check
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
