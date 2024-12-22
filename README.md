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