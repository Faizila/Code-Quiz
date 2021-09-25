// Define Variables
var startButton = document.querySelector(".start");
var timerEl = document.querySelector(".timer");
var questionsList = document.getElementById("questionsList");
var highscores = document.querySelector(".highscores");

// Quiz questions
var questions = [
  {
    title:
      "1. In JavaScript, a loop that never ends is referred to as a(n)_______.",
    options: [
      "A. While loop",
      "B. For loop",
      "C. Infinite loop",
      "D. Recursive loop",
    ],
    answer: "D. Infinite loop",
  },
  {
    title:
      "2. A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "A. JavaScript",
      "B. Terminal/bash",
      "C. For loops",
      "D. console.log",
    ],
    answer: "D. console.log",
  },
  {
    title:
      "3. In CSS, which of the following selector matches a element based on its class attribute?",
    options: [
      "A. The Class Selector",
      "B. The Type Selector",
      "C. The Descendant Selector",
      "D. The Universal Selector",
    ],
    answer: "A. The Class Selector",
  },
  {
    title:
      "4. _______ is the process of finding errors and fixing them within a program.",
    options: ["A. Scanning", "B. Compiling", "C. Debugging", "D. Executing"],
    answer: "C. Debugging",
  },
  {
    title:
      "5. In JavaScript, string values must be enclosed within ____ when being assigned to variables.",
    options: ["A. Commas", "B. Curly brackets", "C. Quotes", "D. Parenthesis"],
    answer: "C. Quotes",
  },
];
// console.log(questions.options)

// Timer starts at 75 seconds when user clicks on start quiz button
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;

// Starts quiz questions and timer on click of "start quiz" button
startButton.addEventListener("click", function () {
  if (holdInterval <= 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timerEl.textContent = "Timer:  " + secondsLeft + " " + "seconds";
      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        finish();
      }
    }, 1000);
  }
  render(questIndex);
});
// console.log(timerEl)

// Displays questions on the page
var questIndex = 0;
var score = 0;
var olCreate = document.createElement("ol");

function render(questIndex) {
  questionsList.innerHTML = "";
  olCreate.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    // console.log(questions[0].options)
    var userQuestion = questions[questIndex].title;
    var userOptions = questions[questIndex].options;
    questionsList.textContent = userQuestion;
  }
  userOptions.forEach(function (newItem) {
    var liItem = document.createElement("li");
    liItem.textContent = newItem;
    questionsList.appendChild(olCreate);
    olCreate.appendChild(liItem);
    liItem.addEventListener("click", compare);
  });
}

// comparison user options: Correct or Wrong
function compare(event) {
  var compareAnswer = event.target;

  if (compareAnswer.matches("li")) {
    var divCreate = document.createElement("div");
    divCreate.setAttribute("id", "divCreate");
    if (compareAnswer.textContent === questions[questIndex].answer) {
      score++;
      divCreate.textContent = "Correct!";
    } else {
      score--;
      secondsLeft = secondsLeft - penalty;
      divCreate.textContent = "Wrong!";
    }
  }

  // Determines user is on which question number
  questIndex++;

  if (questIndex >= questions.length) {
    finish();
  } else {
    render(questIndex);
  }
  questionsList.appendChild(divCreate);
}

// End of Questions
function finish() {
  questionsList.innerHTML = "";
  timerEl.innerHTML = "";

  // Finish!
  var H2 = document.createElement("h2");
  H2.setAttribute("id", "H2");
  H2.textContent = "Finish!";
  questionsList.appendChild(H2);

  var P = document.createElement("p");
  P.setAttribute("id", "P");
  questionsList.appendChild(P);

  // Final score
  if (secondsLeft >= 0) {
    var remainingTime = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    P.textContent = "Your final score is: " + remainingTime;
    // add final score
    questionsList.appendChild(createP2);
  }
// Submit Initials
  var initialLabel = document.createElement("label");
  initialLabel.setAttribute("id", "createLabel");
  initialLabel.textContent = "Enter your initials: ";
  // add placeholder
  questionsList.appendChild(initialLabel);

  var textInput = document.createElement("input");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("id", "initials");
  textInput.textContent = "";
  questionsList.appendChild(textInput);

  var buttonSubmit = document.createElement("button");
  buttonSubmit.setAttribute("type", "submit");
  buttonSubmit.setAttribute("id", "submit");
  buttonSubmit.textContent = "submit";
  questionsList.appendChild(buttonSubmit);
}
