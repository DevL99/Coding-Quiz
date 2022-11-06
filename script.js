// DOM Elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questions = [
    {
      title: "Which one is a looping structure in JavaScript?",
      choices: ["All the below", "For", "While", "do-while loops"],
      answer: "All the below"
    },
    {
      title: "What are the two basic groups of data types in JavaScript?",
      choices: [
        "Primitive and attribute",
        "Primitive and reference types",
        "Reference types and attribute",
        "None of the above"
      ],
      answer: "Primitive and reference types"
    },
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "Boolean operators that can be used in JavaScript include:",
      choices: [
        "'And' Operator &&",
        "'Or' Operator ||",
        "'Not' Operator !",
        "All the above"
      ],
      answer: "All the above"
    },
    {
      title:
        "Which one of these is not among the three different types of errors in JavaScript?",
      choices: [
        "Animation time errors",
        "Load time errors",
        "Run time errors",
        "Logical Errors"
      ],
      answer: "Animation time errors"
    },
    {
      title: "What is the data type of variables in JavaScript?",
      choices: [
        "Object data types",
        "Function data type",
        "None of the above",
        "All of the above"
      ],
      answer: "Object data types"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    },
    {
      title: "What is the type of Pop up boxes available in JavaScript?:",
      choices: ["Alert", "Confirm", "Prompt", "All the above"],
      answer: "All the above"
    }
  ];

// Quiz Variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // Hide the start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Un-hides questions
  questionsEl.removeAttribute("class");

  // Start timer
  timerId = setInterval(clockTick, 1000);

  // Show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // Update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Clear out any old question choices
  choicesEl.innerHTML = "";

  // Loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // Create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // Attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // Display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // Check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Removes times
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // Display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // Right or wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;

  // Time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stop timer
  clearInterval(timerId);

  // Show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // Update time
  time--;
  timerEl.textContent = time;

  // Check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // Save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Submit initials
submitBtn.onclick = saveHighscore;

// Start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

