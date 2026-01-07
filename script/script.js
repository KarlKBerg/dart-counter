const user1 = {
  name: "Karl",
  totalScore: 501,
  score: 100,
  scores: [],
  isMyTurn: true,
  throwCounter: 0,
};

const user2 = {
  name: "Guest",
  totalScore: 501,
  score: 0,
  scores: [],
  isMyTurn: true,
  throwCounter: 0,
};

let calculateScore = (totalScore, score) => {
  totalScore = totalScore - score;
  return totalScore;
};
