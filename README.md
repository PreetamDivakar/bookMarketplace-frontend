# Book Barter Platform - Frontend Angular Application

This is a frontend application developed in Angular, Book Exchange Platform - A platform for the users to exchange the books they have and wish to have.

# Features

## User Authentication
* Secure user registration with email and password.
* Encrypted password storage for enhanced security.
* Password recovery functionality for resetting forgotten passwords.
* User login/logout functionality.

## Book Listing
* Add, edit, and delete books in the user’s profile.
* Provide detailed book information such as title, author, genre, condition, and availability.
* Display user’s book listings and allow others to browse and request listed books.
* Paginated requests based on user choice of limit per page to handle large datasets.

## Book Search
* Search books by title, author, genre or condition.
* View detailed information about books from search results.
* Pagination or incremental loading for smooth browsing of large datasets.


# Technologies Used
* Angular: Framework for building the single-page application.
* TypeScript: Programming language for building scalable and maintainable code.
* HTML5 & SCSS: For structuring and styling the application.
* RxJS: Reactive programming library for handling asynchronous data streams.
* Angular Router: For client-side routing and navigation.

# Steps to run locally

## Clone the Repository
* Run `git clone https://github.com/your-username/book-exchange-frontend.git`

## Change the directory to book-exchange-platform
* Run `cd book-exchange-frontend`

## Install Dependencies
`npm install`

## Run the Development Server
`npm run start`

## Open the Application in the Browser
`http://localhost: 4200`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
