// Define Variables
var startButton = document.getElementById("startbutton");
var timer = document.getElementById("timer");
var questionList = document.getElementById("questionList");
var result = document.getElementById("result");
var highscore = document.getElementById("highscore");
var box = document.querySelector(".container1");

// Quiz questions
var myQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["A. Hyper Trainer Marking Language", "B. Hyper Text Marketing Language", "C. Hyper Text Markup Language", "D. Hyper Text Markup Leveler"],
        answer: "C. Hyper Text Markup Language"
    },
    {
        title: "In JavaScript, a loop that never ends is referred to as a(n)_______.",
        options: ["A. While loop", "B. For loop", "C. Infinite loop", "D. Recursive loop"],
        answer: "C. Infinite loop"
    },
    {
        title: "In CSS, which of the following selector matches a element based on its class attribute?",
        options: ["A. The Class Selector", "B. The Type Selector","C. The Descendant Selector", "D. The Universal Selector"],
        answer: "A. The Class Selector"
    },
    {
        title: "_______ is the process of finding errors and fixing them within a program.",
        options: ["A. Scanning", "B. Compiling", "C. Debugging", "D. Executing"],
        answer: "C. Debugging"
    },
    {
        title: "In JavaScript, string values must be enclosed within ____ when being assigned to variables.",
        options: ["A. Commas", "B. Curly brackets", "C. Quotes", "D. Parenthesis"],
        answer: "C. Quotes"
    },
  
  ];

// Event listner added to start quiz button  
startButton.addEventListener("click", function() {
    startTimer();
    startQuiz();
}); 

// Start Quiz
function startQuiz() {
    box.setAttribute("style", "display: block;");
    populateQuestion();
}

var value = timer.textContent;
var secondsLeft = 100;

var timerVariable = setTimeout(function(){
}, 10000);

// Start timer
function startTimer() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = value + secondsLeft;
  
      if(secondsLeft === 0 || finish) {
        clearInterval(timerInterval);
        // afterQuiz();
      }
  
    }, 1000);
  }




