# Qconn

Qconn is an innovative platform designed to connect students, teachers, and seniors to share knowledge and solve problems together. This project includes various features such as user authentication, posting questions, answering questions, and viewing user profiles.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Supabase](#supabase)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Authentication
- **Sign Up**: Users can create an account using their email and password.
- **Sign In**: Users can log in to their account to access the platform.
- **Persistent Sessions**: User sessions are persisted across browser sessions.

### Questions and Answers
- **Post Questions**: Users can post questions to the platform.
- **Answer Questions**: Users can answer questions posted by others.
- **Like Questions**: Users can like questions to show appreciation.

### User Profiles
- **View Profiles**: Users can view their profile and other users' profiles.
- **Profile Picture**: Users can upload a profile picture.
- **User Stats**: View statistics such as questions asked, questions answered, and achievement points.

### Leaderboard
- **Top Users**: View the leaderboard of top users based on their activity.
- **Search Users**: Search for users on the leaderboard.

### Responsive Design
- **Mobile Friendly**: The platform is responsive and works on various devices.
- **Dark Mode**: Users can toggle between light and dark themes.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/qconn.git
    cd qconn
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    SUPABASE_URL=your-supabase-url
    SUPABASE_KEY=your-supabase-key
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or sign in to start using the platform.
3. Explore the features such as posting questions, answering questions, and viewing user profiles.

## Project Structure
GitHub Copilot
Sure, here is the complete README file with all the details included:

qconn/ ├── additionalPages/ │ ├── about.html │ ├── contactUs.html │ ├── sign-in.html │ ├── sign-up.html │ └── termsOfService.html ├── css/ │ ├── contactUs.css │ ├── leaderBoard.css │ ├── media-qurery.css │ ├── profile.css │ ├── questions.css │ ├── sign-in.css │ ├── sign-up.css │ ├── style.css │ └── utills.css ├── images/ │ └── svg/ ├── script/ │ ├── leaderBoard.js │ ├── main.js │ ├── profile.js │ ├── questions.js │ ├── users.js │ └── utills/ │ ├── animation.js │ ├── AOS.js │ ├── navBar.js │ └── theme.js ├── index.html ├── leaderBoard.html ├── profile.html ├── questions.html ├── users.html └── templates.txt


## Supabase

Supabase is an open-source Firebase alternative that provides a suite of tools for building applications. Qconn uses Supabase for:

- **Authentication**: Managing user sign-up, sign-in, and session persistence.
- **Database**: Storing user data, questions, answers, and other application data.
- **Real-time**: Enabling real-time updates and synchronization across the platform.

### How Supabase is Used

- **User Authentication**: 
  - The `signUp` function handles user registration by creating a new user in Supabase and storing their details in the database.
  - The `signIn` function manages user login and session persistence.
  - The `logOut` function handles user logout and session termination.
  - The `isAuth` function checks if a user is authenticated and updates the UI accordingly.

- **Database Operations**:
  - The `getUsers` function fetches all users from the Supabase database.
  - The `insertUser` function inserts a new user into the Supabase database after registration.
  - The `fetchQuestions` function retrieves questions and their associated answers from the database.
  - The `updateLikes` function updates the like count for a question in the database.

To learn more about Supabase, visit the [official website](https://supabase.io/).

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.