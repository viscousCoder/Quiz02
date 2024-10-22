"use strict";
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;
let currentQuestionIndex = 0;
let quizAnswers = [];

window.onload = () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    showHomeSection();
  }
};

function showHomeSection() {
  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("home-section").classList.remove("hidden");
  document.getElementById("user-name").textContent = currentUser.username;
  document.getElementById("user-email").textContent = currentUser.email;
  document.getElementById("user-phone").textContent = currentUser.phone;
}

//handle error
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8 && password.length <= 15;
}

function validateUsername(username) {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(username);
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

document.getElementById("reg-phone").addEventListener("input", (event) => {
  const input = event.target;
  const isValid = /^[0-9]*$/.test(input.value);

  if (!isValid) {
    showError(input, "Phone number can only contain numbers.");
    input.classList.add("input-error");
  } else {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove();
      input.classList.remove("input-error");
    }
  }
});

document.getElementById("reg-email").addEventListener("input", (event) => {
  const input = event.target;
  console.log(input, "Thiss");
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(input.value);

  if (!isValid) {
    showError(input, "Invalid email format");
    input.classList.add("input-error");
  } else {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove();
      input.classList.remove("input-error");
    }
  }
});

document.getElementById("reg-email").addEventListener("input", (e) => {
  updateDebounceError(e);
});

//handle debounce

// Show error message below input field
function showError(input, message) {
  let errorElement = input.nextElementSibling;

  // Check if error element already exists, if not, create one
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    input.parentElement.insertBefore(errorElement, input.nextSibling);
  }

  errorElement.textContent = message;
  input.classList.add("input-error");
}

// Clear all error messages and styling
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document
    .querySelectorAll(".input-error")
    .forEach((el) => el.classList.remove("input-error"));
}

// Clear the error when input is focused jab focus
function handleInputFocus(event) {
  const input = event.target;
  const errorMessage = input.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.remove();
    input.classList.remove("input-error");
  }
}

// Login form validation
function validateLoginForm() {
  clearErrors();

  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");
  let isValid = true;

  if (email.value.trim() === "") {
    showError(email, "Email cannot be empty.");
    isValid = false;
  } else if (!validateEmail(email.value)) {
    showError(email, "Please enter a valid email.");
    isValid = false;
  }

  if (password.value.trim() === "") {
    showError(password, "Password cannot be empty.");
    isValid = false;
  } else if (!validatePassword(password.value)) {
    showError(password, "Password must be between 8 and 15 characters.");
    isValid = false;
  }

  return isValid;
}

// Registration form validation
function validateRegistrationForm() {
  clearErrors();

  const username = document.getElementById("reg-username");
  const email = document.getElementById("reg-email");
  const password = document.getElementById("reg-password");
  const phone = document.getElementById("reg-phone");
  let isValid = true;

  if (username.value.trim() === "") {
    showError(username, "Username cannot be empty.");
    isValid = false;
  } else if (!validateUsername(username.value)) {
    showError(
      username,
      "Username can only contain letters, no special characters."
    );
    isValid = false;
  }

  if (email.value.trim() === "") {
    showError(email, "Email cannot be empty.");
    isValid = false;
  } else if (!validateEmail(email.value)) {
    showError(email, "Please enter a valid email.");
    isValid = false;
  }

  if (password.value.trim() === "") {
    showError(password, "Password cannot be empty.");
    isValid = false;
  } else if (!validatePassword(password.value)) {
    showError(password, "Password must be between 8 and 15 characters.");
    isValid = false;
  }

  if (phone.value.trim() === "") {
    showError(phone, "Phone number cannot be empty.");
    isValid = false;
  } else if (!validatePhone(phone.value)) {
    showError(phone, "Phone number must be exactly 10 digits.");
    isValid = false;
  }

  return isValid;
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", handleInputFocus);
});

const questions = [
  {
    category: "Science",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2,
  },
  {
    category: "History",
    question: "Who was the first President of the United States?",
    options: [
      "Abraham Lincoln",
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
    ],
    answer: 1,
  },
  {
    category: "History",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 1,
  },
  {
    category: "History",
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    answer: 2,
  },
  {
    category: "History",
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: 2,
  },
  {
    category: "History",
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    answer: 0,
  },
  {
    category: "History",
    question: "Which is the largest ocean on Earth?",
    options: [
      "Pacific Ocean",
      "Indian Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
    ],
    answer: 0,
  },
  {
    category: "History",
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    answer: 0,
  },
  {
    category: "History",
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: 2,
  },
  {
    category: "History",
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Uranus"],
    answer: 0,
  },
  {
    category: "History",
    question: "What is the largest species of shark?",
    options: [
      "Great White Shark",
      "Whale Shark",
      "Tiger Shark",
      "Hammerhead Shark",
    ],
    answer: 1,
  },
  {
    category: "History",
    question: "Which animal is known as the King of the Jungle?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    answer: 0,
  },
];

function showTab(tab) {
  document.getElementById("login-form").style.display =
    tab === "login" ? "block" : "none";
  document.getElementById("register-form").style.display =
    tab === "register" ? "block" : "none";
  tab === "login"
    ? document.getElementById(`${tab}-tab`).classList.add("active")
    : document.getElementById(`${tab}-tab`).classList.add("active");
  tab === "login"
    ? document.getElementById(`register-tab`).classList.remove("active")
    : document.getElementById(`login-tab`).classList.remove("active");
}

function register() {
  if (validateRegistrationForm()) {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const phone = document.getElementById("reg-phone").value;

    // agar same user duabara aaye
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      showError(
        document.getElementById("reg-email"),
        "User already present with this email!"
      );

      return;
    }

    users.push({ username, email, password, phone, scores: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    // Switch to the login tab
    showTab("login");

    // Optionally clear the registration form fields
    document.getElementById("reg-username").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("reg-phone").value = "";
  }
}

function login() {
  if (validateLoginForm()) {
    // Proceed with login logic
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    currentUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      showHomeSection();
    } else {
      // showError(
      //   document.getElementById("login-password"),
      //   "Invalid username or password."
      // );
      document.getElementById("login-email").classList.add("input-error");
      // Show error message below the password input only
      showError(
        document.getElementById("login-password"),
        "Invalid username or password."
      );
    }
  }
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", handleInputFocus);
});

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("auth-section").classList.remove("hidden");
  document.getElementById("home-section").classList.add("hidden");
}

let timer;
let timeRemaining = 120;

function startQuiz() {
  currentQuestionIndex = 0;
  quizAnswers = [];
  timeRemaining = 120;
  document.getElementById("home-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeRemaining--;
    document.getElementById("timer").textContent = `Time Left: ${formatTime(
      timeRemaining
    )}`;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      // alert("Time's up! Submitting the quiz automatically.");
      submitQuiz();
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function submitQuiz() {
  clearInterval(timer);
  let correct = 0;

  let questionResults = [];

  questions.forEach((q, index) => {
    const userAnswer = quizAnswers[index];
    const correctAnswer = q.answer;

    if (userAnswer === correctAnswer) {
      correct++;
    }

    // Store the details for each question
    questionResults.push({
      question: q.text, // Assuming  karenge ki each question has a 'text' field
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
      isCorrect: userAnswer === correctAnswer,
    });
  });

  const score = correct;

  // Update the scores array
  if (!currentUser.scores) {
    currentUser.scores = [];
  }
  currentUser.scores.push(score);

  // Get the current date and time
  let currentDate = new Date();
  let submissionTime = currentDate.toLocaleTimeString();
  let submissionDate = currentDate.toLocaleDateString();
  let submissionDay = currentDate.toLocaleString("en-us", {
    weekday: "long",
  });

  let quizResult = {
    score: score,
    correctAnswers: correct,
    incorrectAnswers: questions.length - correct,
    submissionDate: submissionDate,
    submissionTime: submissionTime,
    submissionDay: submissionDay,
    questionResults: questionResults,
  };

  if (!currentUser.quizResults) {
    currentUser.quizResults = [];
  }
  currentUser.quizResults.push(quizResult);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex((user) => user.email === currentUser.email);

  if (userIndex !== -1) {
    users[userIndex] = currentUser;

    localStorage.setItem("users", JSON.stringify(users));
  }

  showResult(score, correct, questions.length - correct);

  // Switch from the quiz section to the home section after a short delay
  setTimeout(() => {
    document.getElementById("quiz-section").classList.add("hidden");
    document.getElementById("home-section").classList.remove("hidden");
  }, 400);
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-category").textContent = question.category;
  document.getElementById("question-text").textContent = question.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  question.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.textContent = option;
    div.classList.add("option");
    div.onclick = () => selectAnswer(index, div);
    if (quizAnswers[currentQuestionIndex] === index) {
      div.classList.add("selected");
    }
    optionsDiv.appendChild(div);
  });
}

function selectAnswer(index, div) {
  quizAnswers[currentQuestionIndex] = index;
  document
    .querySelectorAll(".option")
    .forEach((option) => option.classList.remove("selected"));
  div.classList.add("selected");
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function showResult(score, correct, wrong) {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `<p>Score: ${score.toFixed(2)}%</p>
        <p>Correct Answers: ${correct}</p>
        <p>Wrong Answers: ${wrong}</p>`;
  document.getElementById("modal").classList.remove("hidden");
}

function showAllSummary() {
  document.getElementById("mainContainerId").classList.remove("container");

  document.getElementById("mainContainerId").classList.add("tableContainer");

  const allSummaryTableBody = document.querySelector(".allSummaryTableBody");

  if (!users || users.length === 0) {
    allSummaryTableBody.innerHTML = `<tr><td colspan="5">No user data available</td></tr>`;
  } else {
    allSummaryTableBody.innerHTML = users
      .map(
        (user) =>
          `<tr>
                      <td>${user.username}</td>
                      <td>${user.email}</td>
                      <td>${user.phone || "N/A"}</td>
                      <td>${
                        Array.isArray(user.scores)
                          ? user.scores.join(", ")
                          : "No attempts"
                      }</td>
                      <td><button onclick="viewUserDetails('${
                        user.email
                      }')">View</button></td>
                  </tr>`
      )
      .join("");
  }

  // Hide other sections and show the All Summary section
  document.getElementById("home-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("summary-section").classList.add("hidden");
  document.getElementById("all-summary-section").classList.remove("hidden");
}

function viewUserDetails(email) {
  document.getElementById("modalId").classList.add("modalAllSum");
  const user = users.find((u) => u.email === email);
  if (user) {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
          <h3>User Details</h3>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone Number:</strong> ${user.phone || "N/A"}</p>
          <p><strong>Highest Score:</strong> ${
            Array.isArray(user.scores) && user.scores.length > 0
              ? Math.max(...user.scores)
              : "No attempts"
          }</p>
          <p><strong>All Scores:</strong> ${
            Array.isArray(user.scores) ? user.scores.join(", ") : "No attempts"
          }</p>
      `;
    document.getElementById("modal").classList.remove("hidden");
  }
}

// Function to go back to the main page
function goBackToMainPage() {
  document.getElementById("all-summary-section").classList.add("hidden");
  document.getElementById("home-section").classList.remove("hidden");
}

function showUserDetails(email) {
  const user = users.find((u) => u.email === email);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `<p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Scores: ${user.scores.join(", ") || "No attempts"}</p>`;
}

showTab("login");

//timer
function updateTimer() {
  const now = new Date();
  const day = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const options = { weekday: "long" };
  const weekDay = now.toLocaleDateString("en-US", options);

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const timerText = `${day} (${weekDay}) ${hours}:${minutes}:${seconds}`;

  document.getElementById("Maintimer").textContent = timerText;
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Initialize timer on page load
updateTimer();

function displayQuizSummary() {
  // Get the current logged-in user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("No current user is logged in.");
    return;
  }

  // Fetch all users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the current user in the list of all users
  const user = users.find(
    (u) => u.username === currentUser.username && u.email === currentUser.email
  );

  if (!user || !user.quizResults || user.quizResults.length === 0) {
    alert("No quiz results found for the current user.");
    return;
  }

  // Set up the summary section and clear any existing rows
  document.getElementById("mainContainerId").classList.add("tableContainer");
  document.getElementById("mainContainerId").classList.remove("container");
  document.getElementById("summary-section").classList.remove("hidden");

  const summaryTableBody = document.querySelector("#quiz-summary-table tbody");
  summaryTableBody.innerHTML = ""; // Clear existing rows

  document.getElementById("home-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.add("hidden");

  // Populate the table with the current user's quiz results
  user.quizResults.forEach((result, quizIndex) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.phone || "N/A"}</td>
          <td>${result.score}</td>
          <td>${((result.score / questions.length) * 100).toFixed(0)}%</td>
          <td>${result.submissionDate}</td>
          <td>
              <button class="view-button" onclick="showModal(${users.indexOf(
                user
              )}, ${quizIndex})">View</button>
          </td>`;
    summaryTableBody.appendChild(row);
  });
}

function showModal(userIndex, quizIndex) {
  console.log(userIndex, quizIndex);
  document.querySelector("#modalId").classList.add("additional");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users[userIndex];
  const quizResult = user.quizResults[quizIndex];
  console.log(quizResult);

  // Modal content
  let modalContent = `<h3>Quiz Summary for ${user.username}</h3>`;
  modalContent += `<p><strong>Score:</strong> ${quizResult.score}</p>`;
  modalContent += `<p><strong>Date:</strong> ${quizResult.submissionDate}</p>`;
  modalContent += `<p><strong>Time:</strong> ${quizResult.submissionTime}</p>`;
  modalContent += `<p><strong>Correct Answers:</strong> ${quizResult.correctAnswers}</p>`;
  modalContent += `<p><strong>Incorrect Answers:</strong> ${quizResult.incorrectAnswers}</p>`;
  modalContent += `<ul class="userSummaryList">`;

  quizResult.questionResults?.forEach((questionResult, index) => {
    const question = questions[index];
    modalContent += `<li>
        <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
        <ul>`;

    const userAttempted = questionResult.userAnswer !== undefined;

    question.options.forEach((option, optionIndex) => {
      let optionClass = "";

      if (optionIndex === questionResult.correctAnswer) {
        optionClass = "correct";
      }
      if (
        userAttempted &&
        optionIndex === questionResult.userAnswer &&
        optionIndex !== questionResult.correctAnswer
      ) {
        optionClass = "incorrect";
      }

      modalContent += `
          <li class="${optionClass}">
              ${optionIndex + 1}. ${option}
          </li>`;
    });

    // Indicate whether the question was not attempted
    // if (!userAttempted) {
    //   modalContent += `<p class="not-attempted"><em>Not attempted</em></p>`;
    // }

    const resultClass = questionResult.isCorrect ? "correct" : "incorrect";
    modalContent += `</ul>
        <p class="${resultClass}"><strong>${
      questionResult.isCorrect
        ? "Correct"
        : !userAttempted
        ? "Not attempted"
        : "Incorrect"
    }</strong></p>
      </li>`;
  });
  modalContent += `</ul>`;

  document.getElementById("modal-body").innerHTML = modalContent;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.querySelector("#modalId").classList.remove("additional");
  document.getElementById("modalId").classList.remove("modalAllSum");
}

function goBackToMainPage() {
  document.getElementById("all-summary-section").classList.add("hidden");
  document.getElementById("home-section").classList.remove("hidden");
  document.getElementById("mainContainerId").classList.add("container");

  document.getElementById("mainContainerId").classList.remove("tableContainer");

  document.getElementById("summary-section").classList.add("hidden");
  document.getElementById("home-section").classList.remove("hidden");
  //   document.getElementById("quiz-section").classList.add("hidden");
}
