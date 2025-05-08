//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress from session storage (if exists)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display the quiz questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionContainer = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const choiceInput = document.createElement("input");
      choiceInput.setAttribute("type", "radio");
      choiceInput.setAttribute("name", `question-${i}`);
      choiceInput.setAttribute("value", choice);

      // Restore previously selected answer
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

		
      // Save progress on selection
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceInput);
      label.appendChild(document.createTextNode(choice));
      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionContainer);
  }
}

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const correctAnswer = questions[i].answer;
    if (userAnswers[i] === correctAnswer) {
      score++;
    }
  }

  const resultText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = resultText;
  localStorage.setItem("score", score);
});

// Display score if already submitted previously
window.addEventListener("load", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }

  renderQuestions();
});
