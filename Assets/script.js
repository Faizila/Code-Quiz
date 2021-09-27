// Declare Variables
var timerEl = document.getElementById("timer");
var startBox = document.getElementById("start-box");
var startButton = document.getElementById("start-quiz");
var questionBox = document.getElementById("questions-box");
var finish = document.getElementById("finish-box");
var quizQuestionEl = document.getElementById("quiz-question");
var optionButtons = document.getElementById("option-buttons");
var correctWrong = document.getElementById("correct-wrong");
var compare = document.getElementById("compare");
var hr = document.querySelector(".hr");
var highScores = document.getElementById("highscores-box");
var displayScore = document.querySelector(".displayScore");
var scoresList = document.getElementById("scores-list");

// Quiz questions
var questionList = [
  {
    question:
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
    question:
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
    question:
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
    question:
      "4. _______ is the process of finding errors and fixing them within a program.",
    options: ["A. Scanning", "B. Compiling", "C. Debugging", "D. Executing"],
    answer: "C. Debugging",
  },
  {
    question:
      "5. In JavaScript, string values must be enclosed within ____ when being assigned to variables.",
    options: ["A. Commas", "B. Curly brackets", "C. Quotes", "D. Parenthesis"],
    answer: "C. Quotes",
  },
];

//When user clicks Start Quiz button, timer and quiz starts together
startButton.addEventListener("click", function () {
  questionBox.style.display = "block";
  startBox.style.display = "none";
  // console.log(questionList[0].question)

  startQuiz();
  startTimer();
  // console.log(questionList[0].options[0])
});

// Timer
var secondsLeft = 75;
var currentIndex = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var penalty = 10;
let timerInterval
var score = 0

function startTimer() {
   timerInterval = setInterval(function () {
    secondsLeft--;
    

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);

        questionBox.style.display = "none";
        finish.style.display = "block";
        compare.innerHTML = `You got ${correctAnswers} correct and ${wrongAnswers} wrong answers.`;
        displayScore.innerHTML = `Score: ${score + secondsLeft}`;
        secondsLeft = 0;
    }
    timerEl.textContent = "Time: " + secondsLeft + " " + "seconds";
  }, 1000);
}

// Quiz
function startQuiz() {
  // console.log(currentIndex);
  if (currentIndex === questionList.length) {
    questionBox.style.display = "none";
    finish.style.display = "block";
    
    compare.innerHTML = `You got ${correctAnswers} correct! and ${wrongAnswers} wrong!`;
    displayScore.innerHTML = `Score: ${score + secondsLeft}`;
    clearInterval(timerInterval);
    return;
  }

  optionButtons.innerHTML = "";
  for (var i = 0; i < questionList[currentIndex].options.length; i++) {
    var optbtn = document.createElement("button");
    optbtn.classList.add("bstyle");
    optbtn.classList.add("option-btns");
    optbtn.innerText = questionList[currentIndex].options[i];
    optionButtons.appendChild(optbtn);
  }
  document.querySelectorAll(".option-btns").forEach(function (each) {
    each.addEventListener("click", function (event) {
      var chosenOption = event.target.innerText;
      // console.log(chosenOption);
      // console.log(questionList[currentIndex].answer);
      if (chosenOption === questionList[currentIndex].answer) {
        // console.log("Correct!")
        correctAnswers++;
        correctWrong.textContent = "Correct!";
      } else {
        // console.log("Wrong!")
        wrongAnswers++;
        correctWrong.textContent = "Wrong!";
        secondsLeft -= 10;
        // secondsLeft = secondsLeft -10;
        // alert("wrong!")
      }
      currentIndex++;
      var lineEl = document.createElement("HR");
      hr.appendChild(lineEl);

      startQuiz();
      //timeouts the correct/wrong text and hr tag
      setTimeout(function () {
        correctWrong.textContent = "";
        hr.removeChild(lineEl);
      }, 1000);
    });
  });

  document.getElementById("quiz-question").innerHTML =
    questionList[currentIndex].question;
}

document.querySelector(".view-highscore").addEventListener("click", function () {
    finish.style.display = "none";
    questionBox.style.display = "none";
    startBox.style.display = "none";
    timerEl.style.display = "none";
    highScores.style.display = "block";

    var finalScoreLocal = JSON.parse(localStorage.getItem("initials"));
    // console.log(finalScoreLocal);

    finalScoreLocal = finalScoreLocal.sort((a, b) =>{
      return b.score - a.score
    }) 

    scoresList.innerHTML = "";
    for (let i = 0; i < finalScoreLocal.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.innerText = `${finalScoreLocal[i].initials} - ${finalScoreLocal[i].score}`;
      // console.log(highscoreEl);
      scoresList.appendChild(highscoreEl);
    }

  });

  // Local storage
  var addInitials = document.getElementById("add-initials");

addInitials.addEventListener("submit", function (event) {
  event.preventDefault();
  var initials = document.getElementById("initials").value;
 score = correctAnswers;
  // console.log(initials, score);
  var finalScoreLocal = [];
  
  if (localStorage.getItem("initials")) {
    var finalScoreLocal = JSON.parse(localStorage.getItem("initials"));
  }
  // console.log(score)
  // console.log(secondsLeft)
    finalScoreLocal.push({
      initials: initials,
      score: score + secondsLeft,
  });
  localStorage.setItem("initials", JSON.stringify(finalScoreLocal));

  finalScoreLocal = finalScoreLocal.sort((a, b) =>{
    return b.score - a.score
  }) 
    
  finish.style.display = "none";
  highScores.style.display = "block";
  document.querySelector("#scores-list").innerHTML = "";
    for (let i = 0; i < finalScoreLocal.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.innerText = `${finalScoreLocal[i].initials} - ${finalScoreLocal[i].score}`;
      // console.log(highscoreEl);
      document.querySelector("#scores-list").appendChild(highscoreEl);
    }
 });

 // Clear Highscores list
 var clearScores = document.getElementById("clear-scores");

 clearScores.addEventListener("click", function (){
  scoresList.style.display = "none";
    localStorage.clear();
});
