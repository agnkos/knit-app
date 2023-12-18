### (still working on refactoring the code and adding funcionalities)

# Knit app

## Contents

- [Deployed app](#deployed-app)
- [Sign in](#sign-in)
- [Project description](#project-description)
- [Technologies](#technologies)
- [Credits](#credits)
- [Installation](#installation)
- [Screenshots](#screenshots)

## Deployed app

<b> [Link to the deployed app](https://knit-app.netlify.app/) </b> <br>

## Sign in

To test the app you can log in with email:

        tester@email.com

and password:

        testapp123

or create a new account

## Project description:

- app for storing info about current and finished knitting projects, project queue, yarn stash
- with KnitApp you can:
  - add and delete project, edit project's info
  - add and delete project's photo
  - add items to queue and change item's position
  - add and delete stash items, edit details, add photo
  - write, edit and delete notes

## Technologies

- login with email and password (firebase authentication)
- data stored in Firebase Storage and Firestore Database
- navigation built with React Router 6 (actions, loaders)
- styled with Tailwind CSS
- built with:
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Credits

- design ispired by [ravelry.com](https://www.ravelry.com/)
- knitting icons: <a href="https://www.flaticon.com/free-icons/wool" title="wool icons">Wool icons created by Darius Dan - Flaticon</a> and <a href="https://www.flaticon.com/free-icons/knitting" title="knitting icons">Knitting icons created by iconixar - Flaticon</a>

## Installation

Clone the repo:

    git clone https://github.com/agnkos/knit-app.git

Install npm packages:

     npm install

Run the app:

    npm run dev

KnitApp is ready at port 5173:

    http://localhost:5173/

## Screenshots:

<img src='./public/Screenshot1.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot2.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot3.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot4.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'>
