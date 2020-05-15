# Burger-Logger
An application for listing and devouring burgers!

## Description
This application uses a mySQL database to store both devoured and non-devoured burgers.  Burgers that have not been devoured can be eaten.  After burgers are devoured, their properties within the database are updated and the page is re-rendered to show the newly eaten burger as devoured.

## Installation
This application uses express, express handlebars, and mySQL.  Running "npm install" will install all the dependencies.

## Usage
If running locally, run the server.js file in node and go to localhost:8080 within the browser.  This application is also hosted on Heroku at https://burgerhomework9.herokuapp.com/