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

// function validatePhone(phone) {
//   const phoneRegex = /^[0-9]{10}$/;
//   return phoneRegex.test(phone);
// }

function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

document.getElementById("reg-phone").addEventListener("input", (event) => {
  const input = event.target;
  const isValid = /^[0-9]*$/.test(input.value); // Check if the input contains only numbers

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
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(input.value); // Check if the input contains only numbers

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
/*
function debounceFunction(args) {
  console.log("hii", args);
  const input = args.target;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(input.value); // Check if the input contains only numbers

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
}
const updateDebounceError = debounce(debounceFunction, 300);

function debounce(cl, delay) {
  let timer;
  return function (...args) {
    let context = this;

    console.log(context, "hum");

    clearTimeout(timer);
    timer = setTimeout(() => {
      cl.apply(context, args);
    }, delay);
  };
}
  */

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

// Clear the error when input is focused
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

// Attach focus event listeners to input fields
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
    // Proceed with registration logic
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

// Attach the input focus event to clear the error when an input is clicked
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

// function submitQuiz() {
//   clearInterval(timer);
//   let correct = 0;
//   questions.forEach((q, index) => {
//     if (quizAnswers[index] === q.answer) {
//       correct++;
//     }
//   });
//   console.log(quizAnswers, "this");
//   const score = (correct / questions.length) * 100;
//   currentUser.scores.push(score);
//   localStorage.setItem("users", JSON.stringify(users));
//   showResult(score, correct, questions.length - correct);

//   setTimeout(() => {
//     document.getElementById("quiz-section").classList.add("hidden");
//     document.getElementById("home-section").classList.remove("hidden");
//   }, 3000);
// }

// function submitQuiz() {
//   clearInterval(timer);
//   let correct = 0;

//   // Calculate the number of correct answers
//   questions.forEach((q, index) => {
//     if (quizAnswers[index] === q.answer) {
//       correct++;
//     }
//   });

//   // Calculate the score as a percentage
//   const score = (correct / questions.length) * 100;
//   currentUser.scores.push(score);

//   // Get the current date and time
//   let currentDate = new Date();
//   let submissionTime = currentDate.toLocaleTimeString(); // e.g., "10:30:15 AM"
//   let submissionDate = currentDate.toLocaleDateString(); // e.g., "10/20/2024"
//   let submissionDay = currentDate.toLocaleString("en-us", { weekday: "long" }); // e.g., "Sunday"

//   // Create an object to store the quiz result details
//   let quizResult = {
//     score: score,
//     correctAnswers: correct,
//     incorrectAnswers: questions.length - correct,
//     submissionDate: submissionDate,
//     submissionTime: submissionTime,
//     submissionDay: submissionDay,
//   };

//   // Store the updated quiz results in the user's data
//   if (!currentUser.quizResults) {
//     currentUser.quizResults = [];
//   }
//   currentUser.quizResults.push(quizResult);

//   // Update the local storage with the new user data
//   localStorage.setItem("users", JSON.stringify(users));

//   // Display the result to the user
//   showResult(score, correct, questions.length - correct);

//   // Switch from the quiz section to the home section after a short delay
//   setTimeout(() => {
//     document.getElementById("quiz-section").classList.add("hidden");
//     document.getElementById("home-section").classList.remove("hidden");
//   }, 3000);
// }

function submitQuiz() {
  clearInterval(timer);
  let correct = 0;

  // Array to store details of each question
  let questionResults = [];

  // Loop through the questions and evaluate the answers
  questions.forEach((q, index) => {
    const userAnswer = quizAnswers[index];
    const correctAnswer = q.answer;

    // Check if the user's answer is correct
    if (userAnswer === correctAnswer) {
      correct++;
    }

    // Store the details for each question
    questionResults.push({
      question: q.text, // Assuming each question has a 'text' field
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
      isCorrect: userAnswer === correctAnswer,
    });
  });

  // Calculate the score as a percentage
  const score = (correct / questions.length) * 100;
  currentUser.scores.push(score);

  // Get the current date and time
  let currentDate = new Date();
  let submissionTime = currentDate.toLocaleTimeString(); // e.g., "10:30:15 AM"
  let submissionDate = currentDate.toLocaleDateString(); // e.g., "10/20/2024"
  let submissionDay = currentDate.toLocaleString("en-us", {
    weekday: "long",
  }); // e.g., "Sunday"

  // Create an object to store the quiz result details
  let quizResult = {
    score: score,
    correctAnswers: correct,
    incorrectAnswers: questions.length - correct,
    submissionDate: submissionDate,
    submissionTime: submissionTime,
    submissionDay: submissionDay,
    questionResults: questionResults, // Store the details for each question
  };

  // Store the updated quiz results in the user's data
  if (!currentUser.quizResults) {
    currentUser.quizResults = [];
  }
  currentUser.quizResults.push(quizResult);

  // Update the local storage with the new user data
  localStorage.setItem("users", JSON.stringify(users));

  // Display the result to the user
  showResult(score, correct, questions.length - correct);

  // Switch from the quiz section to the home section after a short delay
  setTimeout(() => {
    document.getElementById("quiz-section").classList.add("hidden");
    document.getElementById("home-section").classList.remove("hidden");
  }, 3000);
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

// function showSummary() {
//   if (!currentUser.scores.length) {
//     alert("Please play the quiz first.");
//     return;
//   }
//   const highest = Math.max(...currentUser.scores);
//   const modalBody = document.getElementById("modal-body");
//   modalBody.innerHTML = `<p>Highest Score: ${highest}%</p>
//         <p>Attempts: ${currentUser.scores.length}</p>`;
//   document.getElementById("modal").classList.remove("hidden");
// }

function showAllSummary() {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML =
    `<table border="1" class="tableClass">
      <thead>
        <tr>
          <th>User</th>
          <th>Scores</th>
        </tr>
     </thead>
    <tbody>` +
    users
      .map(
        (user) =>
          `<tr onclick="showUserDetails('${user.email}')"><td>${
            user.username
          }</td>
         <td>${
           Array.isArray(user.scores) ? user.scores.join(", ") : "No attempts"
         }</td>
             </tr>
          `
      )
      .join("") +
    `</tbody></table>`;
  document.getElementById("modal").classList.remove("hidden");
}

function showUserDetails(email) {
  const user = users.find((u) => u.email === email);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `<p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Scores: ${user.scores.join(", ") || "No attempts"}</p>`;
}

function closeModal() {
  console.log("close");
  document.getElementById("modal").classList.add("hidden");
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

//   //show summar
//   // Function to show quiz summary
//   function showSummary() {
//     const summarySection = document.getElementById("summary-section");
//     const quizSummaryTable = document
//       .getElementById("quiz-summary-table")
//       .querySelector("tbody");

//     // Clear previous data in the table
//     quizSummaryTable.innerHTML = "";

//     // Fetch user data from local storage
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     // Populate the table with user data
//     users.forEach((user) => {
//       user.quizResults.forEach((result, index) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//           <td>${user.username}</td>
//           <td>${user.email}</td>
//           <td>${user.phone}</td>
//           <td>${index + 1}</td>
//           <td>${result.submissionDay}</td>
//           <td>${result.submissionTime}</td>
//           <td><button onclick="viewDetails(${user}, ${result})">View</button></td>
//         `;
//         quizSummaryTable.appendChild(row);
//       });
//     });

//     // Hide the main page and show the summary section
//     document.getElementById("home-section").classList.add("hidden");
//     summarySection.classList.remove("hidden");
//   }

//   // Function to go back to the main page
//   function goBackToMainPage() {
//     document.getElementById("summary-section").classList.add("hidden");
//     document.getElementById("home-section").classList.remove("hidden");
//   }

// Assuming `users` is the array containing user data from local storage
// function displayQuizSummary() {
//   const summarySection = document.getElementById("summary-section");
//   const tbody = document.querySelector("#quiz-summary-table tbody");

//   // Clear previous rows
//   tbody.innerHTML = "";

//   users.forEach((user) => {
//     user.quizResults.forEach((result) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//                 <td>${user.username}</td>
//                 <td>${user.email}</td>
//                 <td>${user.phone}</td>
//                 <td>${result.score}</td>
//                 <td>${result.submissionDay}</td>
//                 <td>${result.submissionTime}</td>
//                 <td><button class="view-button" onclick="showModal(${user.quizResults.indexOf(
//                   result
//                 )})">View</button></td>
//             `;
//       tbody.appendChild(row);
//     });
//   });

//   summarySection.classList.remove("hidden");
// }

// // Function to show the modal with detailed results
// function showModal(index) {
//   const modal = document.getElementById("modal");
//   const modalBody = document.getElementById("modal-body");
//   const user = users[currentUserIndex]; // Assuming currentUserIndex is defined
//   const result = user.quizResults[index];

//   let content = "<h3>Quiz Results</h3>";
//   result.questionResults.forEach((q, i) => {
//     content += `
//             <div>
//                 <strong>Question ${i + 1}:</strong> ${questions[i].question}<br>
//                 <strong>Your Answer:</strong> <span style="color:${
//                   q.isCorrect ? "green" : "red"
//                 };">${questions[i].options[q.userAnswer]}</span><br>
//                 <strong>Correct Answer:</strong> <span style="color:green;">${
//                   questions[i].options[q.correctAnswer]
//                 }</span>
//             </div>
//             <hr>
//         `;
//   });

//   modalBody.innerHTML = content;
//   modal.classList.remove("hidden");
// }

// // Function to close the modal
// // function closeModal() {
// //   const modal = document.getElementById("modal");
// //   modal.classList.add("hidden");
// // }

// // Function to go back to the main page
// function goBackToMainPage() {
//   document.getElementById("summary-section").classList.add("hidden");
//   // Logic to show the main page goes here
// }

// // Call this function to initially populate the summary table
// displayQuizSummary();

/////////////////////////////////////
// function displayQuizSummary() {
//   const users = JSON.parse(localStorage.getItem("users")) || [];
//   const summaryTableBody = document.querySelector("#quiz-summary-table tbody");
//   summaryTableBody.innerHTML = ""; // Clear existing rows

//   users.forEach((user) => {
//     user.quizResults.forEach((result) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//                 <td>${user.username}</td>
//                 <td>${user.email}</td>
//                 <td>${user.phone}</td>
//                 <td>${result.score}</td>
//                 <td>${result.submissionDay}</td>
//                 <td>${result.submissionTime}</td>
//                 <td><button class="view-button" onclick="showModal(${JSON.stringify(
//                   result
//                 )})">View</button></td>
//             `;
//       summaryTableBody.appendChild(row);
//     });
//   });

//   document.getElementById("summary-section").classList.remove("hidden");
// }

// function showModal(result) {
//   const modalBody = document.getElementById("modal-body");
//   let content = `<h3>Quiz Results</h3>`;
//   content += `<p>Score: ${result.score}</p>`;
//   content += `<p>Correct Answers: ${result.correctAnswers}</p>`;
//   content += `<p>Incorrect Answers: ${result.incorrectAnswers}</p>`;
//   content += `<h4>Question Results</h4>`;
//   content += `<ul>`;

//   result.questionResults.forEach((questionResult, index) => {
//     const question = questions[index]; // Assuming questions are in the same order
//     content += `<li>${question.question}<br>`;
//     content += `Your Answer: <span class="${
//       questionResult.isCorrect ? "correct" : "incorrect"
//     }">${question.options[questionResult.userAnswer]}</span><br>`;
//     content += `Correct Answer: <span class="correct">${
//       question.options[questionResult.correctAnswer]
//     }</span></li>`;
//   });

//   content += `</ul>`;
//   modalBody.innerHTML = content;
//   document.getElementById("modal").classList.remove("hidden");
// }

// function closeModal() {
//   document.getElementById("modal").classList.add("hidden");
// }

// function goBackToMainPage() {
//   document.getElementById("summary-section").classList.add("hidden");
//   // Add code to navigate back to the main page if needed
// }

// // Call this function to populate the summary when needed
// // displayQuizSummary(); // Uncomment this line when you want to call it

function displayQuizSummary() {
  document.getElementById("summary-section").classList.remove("hidden");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const summaryTableBody = document.querySelector("#quiz-summary-table tbody");
  summaryTableBody.innerHTML = ""; // Clear existing rows

  document.getElementById("home-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.add("hidden");

  users.forEach((user) => {
    user.quizResults.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                  <td>${user.phone}</td>
                  <td>${result.score}</td>
                  <td>${result.submissionDay}</td>
                  <td>${result.submissionTime}</td>
                  <td><button class="view-button" onclick="showModal(${
                    user.username
                  }, ${JSON.stringify(result)})">View</button></td>
              `;
      summaryTableBody.appendChild(row);
      console.log(`${user.username}, ${JSON.stringify(result)}`, "This");
    });
  });
}

function showModal(username, result) {
  console.log("close");

  document.getElementById("modal").classList.remove("hidden");
  console.log("close22");
  const modalBody = document.getElementById("modal-body");
  let content = `<h3>Quiz Results for ${username}</h3>`;
  content += `<p>Score: ${result.score}</p>`;
  content += `<p>Correct Answers: ${result.correctAnswers}</p>`;
  content += `<p>Incorrect Answers: ${result.incorrectAnswers}</p>`;
  content += `<h4>Question Results</h4>`;
  content += `<ul>`;

  result.questionResults.forEach((questionResult, index) => {
    const question = questions[index]; // Assuming questions are in the same order
    content += `<li>${question.question}<br>`;
    content += `Your Answer: <span class="${
      questionResult.isCorrect ? "correct" : "incorrect"
    }">${question.options[questionResult.userAnswer]}</span><br>`;
    content += `Correct Answer: <span class="correct">${
      question.options[questionResult.correctAnswer]
    }</span></li>`;
  });

  content += `</ul>`;
  modalBody.innerHTML = content;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function goBackToMainPage() {
  document.getElementById("summary-section").classList.add("hidden");
  document.getElementById("home-section").classList.remove("hidden");
  //   document.getElementById("quiz-section").classList.add("hidden");
  // Add code to navigate back to the main page if needed
}

// Call this function to populate the summary when needed
// displayQuizSummary(); // Uncomment this line when you want to call it
