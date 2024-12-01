# Quiz App

Welcome to the **Quiz App**! This is an interactive quiz platform built using **HTML**, **CSS**, and **JavaScript**. The app allows users to register, log in, and take a quiz with a 2-minute timer. After completing the quiz, users can view a summary of their performance, including their score and a breakdown of correct and wrong answers. The app also keeps track of user quiz history, so users can see their past attempts.

## Live Demo

You can view the live demo of the app on [Netlify](https://quizapps010.netlify.app/).

## Features

1. **User Registration & Login**:
   - Users can register by entering their username, email, password, and phone number.
   - Once registered, users can log in using their email and password.
2. **Quiz Start**:

   - After logging in, the user is directed to the main page where their details are displayed.
   - The user can click the **Start Quiz** button to begin the quiz, which consists of **10 questions**.
   - The quiz has a time limit of **2 minutes**. If the user doesn't complete the quiz within the time, it is automatically submitted.

3. **Quiz Summary**:

   - Once the quiz is completed, users can view a summary of their performance, including their score and the number of correct and wrong answers.
   - A **Show Summary** button opens a table displaying the user's quiz history, where they can see summaries of all their quiz attempts.

4. **Quiz History**:

   - The app tracks multiple quiz attempts for each user. Each attempt is stored in a table, and users can click an action button to view the details of a specific attempt.
   - The table includes user information and quiz performance summary (e.g., score, correct answers, wrong answers).

5. **Show All Users' Quiz Summary**:

   - The **Show Summary All** button displays the quiz performance summary of **all users** who have registered.

6. **Logout**:
   - After completing the quiz or viewing the summary, users can log out using the **Logout** button.

## Technologies Used

- **HTML**: Used for structuring the app's content and creating the registration and login pages.
- **CSS**: For styling the app, including responsive layouts and UI components.
- **JavaScript**: For implementing the core logic of the app, including user registration, login, quiz functionality, time limits, and storing data in local storage.
- **Local Storage**: User details and quiz results are saved locally in the browser for persistent sessions.

## How to Use

### 1. **Registration**

- Navigate to the **Register Page** and fill in the required details:
  - **Username**
  - **Email**
  - **Password**
  - **Phone Number**
- After submitting, your details will be saved in the local storage, and you'll be able to log in with these credentials.

### 2. **Login**

- Once registered, go to the **Login Page** and enter your **Email** and **Password** to log in.
- Upon successful login, you will be directed to the main page, where your details will be displayed, and the **Start Quiz** button will appear.

### 3. **Take the Quiz**

- Click on the **Start Quiz** button to begin the quiz.
- You will have **2 minutes** to answer **10 questions**.
- The quiz will automatically be submitted if the time limit is reached.

### 4. **Quiz Summary**

- After completing the quiz, click on **Show Summary** to view your quiz summary. The summary will include:
  - Your score
  - Correct and wrong answers
  - A record of your quiz attempts stored in a table
- Click on the **Action Button** next to any quiz attempt in the table to see detailed results of that attempt (e.g., score, correct answers, wrong answers).

### 5. **Show All Users' Summary**

- The **Show Summary All** button allows you to view quiz summaries for all registered users, displaying their quiz history.

### 6. **Logout**

- After completing the quiz or viewing the summary, you can click on the **Logout** button to log out from your account.

## Getting Started

To run the Quiz App locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/viscousCoder/Quiz02.git
   ```
