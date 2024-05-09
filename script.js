// Define quiz questions and answers
const quizData = [
  
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
      answer: "onclick"
    },
  
    {
      question: "HTML is considered as ______ ?",
      options: ["Programming language", "OOP language", "High level language", "Markup language"],
      answer: "Markup language"
    },
    {
      question: "Who is the main author of the HTML?",
      options: ["3Brendan Eich", "Tim Berners-Lee", "Web developer", "Google Inc"],
      answer: "Tim Berners-Lee"
    },
    {
      question: " Where is the right place to insert JavaScript code?",
      options: [" <head> section", "The two sections <head> and <body> are correct", "<body> section ", "None of the above"],
      answer: " The two sections <head> and <body> are correct"
    },
    {
      question: "How to write an IF condition in JavaScript? ",
      options: ["if a = 2 then", "if a = 2", "if a == 2 else", "if (a == 2)"],
      answer: "if (a == 2) "
    }


  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60; // Time in seconds
  let timerInterval;
  
  // Function to start the quiz
  function startQuiz() {
    const name = document.getElementById("name").value;
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    document.getElementById("login-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question").textContent =
      quizData[currentQuestion].question;
    renderOptions();
    startTimer();
  }
  
  // Function to render options for the current question
  function renderOptions() {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    const currentOptions = quizData[currentQuestion].options;
    currentOptions.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
    });
  }
  
  // Function to check the selected answer
  function checkAnswer(selectedOption) {
    const correctAnswer = quizData[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
      score++;
    }
    nextQuestion();
  }
  
  // Function to move to the next question
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      document.getElementById("question").textContent =
        quizData[currentQuestion].question;
      renderOptions();
    } else {
      clearInterval(timerInterval);
      showResult();
    }
  }
  
  // Function to start the timer
  function startTimer() {
    const timerDisplay = document.getElementById("timer");
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = "Time left: " + timeLeft + "s";
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        showResult();
      }
    }, 1000);
  }
  
  // Function to display the quiz result
  function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    const totalQuestions = quizData.length;
    const passScore = totalQuestions * 0.6; // Assuming passing score is 60%
    document.getElementById("score").textContent =
      "Your score: " + score + "/" + totalQuestions;
    document.getElementById("pass-fail").textContent =
      score >= passScore ? "Congratulations! You passed." : "Sorry, you failed.";
  }
  
  // Function to restart the quiz
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("question").textContent =
      quizData[currentQuestion].question;
    renderOptions();
    startTimer();
  }
  