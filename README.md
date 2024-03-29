### (still working on refactoring the code and adding funcionalities)

# Knit app

## Contents

- [Deployed app](#deployed-app)
- [Sign in](#sign-in)
- [Project description](#project-description)
- [Technologies](#technologies)
- [Credits](#credits)
- [Installation](#installation)
- [Maintenance](#maintenance)
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
- Forms managed and valitaded using Formik and Yup
- used react-router-typesafe for typing useLoaderData [link](https://github.com/fredericoo/react-router-typesafe)
- ESLint and Prettier for formatting and preventing code errors
- built with:
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
- Tested with:
  ![React Testing Library](https://img.shields.io/badge/Testing%20Library-E33332.svg?style=for-the-badge&logo=Testing-Library&logoColor=white)
  ![Vitest](https://img.shields.io/badge/Vitest-6E9F18.svg?style=for-the-badge&logo=Vitest&logoColor=white)
- Maintenance: 
 ![Sentry](https://img.shields.io/badge/Sentry-362D59.svg?style=for-the-badge&logo=Sentry&logoColor=white)

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

## Maintenance

I am using Sentry to log erorrs which may occur during users' interaction with deployed app.

## Screenshots:

<img src='./public/Screenshot_11.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_10.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_2.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_3.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_4.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_5.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_6.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/Screenshot_7.jpg' alt="app screenshot" title="app screenshot" style='width: 250px; margin: 10px;'> 
<img src='./public/desktop.jpg' alt="app screenshot" title="app screenshot" style='width: 400px; margin: 10px;'> 
<img src='./public/desktop2.jpg' alt="app screenshot" title="app screenshot" style='width: 400px; margin: 10px;'> 
