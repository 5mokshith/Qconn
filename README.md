
## Supabase

Supabase is an open-source Firebase alternative that provides a suite of tools for building applications. Qconn uses Supabase for:

- **Authentication**: Managing user sign-up, sign-in, and session persistence.
- **Database**: Storing user data, questions, answers, and other application data.
- **Real-time**: Enabling real-time updates and synchronization across the platform.

### How Supabase is Used

- **User Authentication**: 
  - The [signUp](http://_vscodecontentref_/0) function handles user registration by creating a new user in Supabase and storing their details in the database.
  - The [signIn](http://_vscodecontentref_/1) function manages user login and session persistence.
  - The [logOut](http://_vscodecontentref_/2) function handles user logout and session termination.
  - The [isAuth](http://_vscodecontentref_/3) function checks if a user is authenticated and updates the UI accordingly.

- **Database Operations**:
  - The [getUsers](http://_vscodecontentref_/4) function fetches all users from the Supabase database.
  - The [insertUser](http://_vscodecontentref_/5) function inserts a new user into the Supabase database after registration.
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