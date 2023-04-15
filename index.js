const questions = [
  {
    Question: "What is a start?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Sun", correct: true },
      { text: "Pluto", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    Question: "What is a planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Sun", correct: true },
      { text: "Pluto", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    Question: "What is a galaxy?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Sun", correct: true },
      { text: "Pluto", correct: false },
      { text: "Milky way", correct: false },
    ],
  },
  {
    Question: "What is a comet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Sun", correct: true },
      { text: "Pluto", correct: false },
      { text: "shooting start", correct: false },
    ],
  },
  {
    Question: "What is a black hole?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Sun", correct: true },
      { text: "Pluto", correct: false },
      { text: "A mass of gravity", correct: false },
    ],
  },
];

const questionsElement = document.getElementById("questions");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionsElement.innerHTML = questionNumber + ". " + currentQuestion.Question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("inCorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disable = true;
  });
  nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButtonClick();
  } else {
    startQuiz();
  }
});

function showScores() {
  resetState();
  questionsElement.innerHTML = `Your score is ${
    (score / questions.length) * 100
  }`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButtonClick() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScores();
  }
}

startQuiz();
