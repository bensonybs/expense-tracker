# Expense Tracker
A Webapp Which can track user's expense.   
This is a express web app from [AlphaCamp](https://tw.alphacamp.co/).   
## Demo
![demo](/public/image/demo.png)
You can try the webapp in [Heroku](https://whispering-eyrie-79632.herokuapp.com).
## Features
- User authentication: You can login with email or Facebook now. (**New Feature**)
- Create, read, update, delete expense record.
- Filter the record with expense category.
## Getting Start
### Prerequisite
1. [Node.js](https://nodejs.org/en/), v14.16.0
2. (Optional) [nodemon](https://www.npmjs.com/package/nodemon) (2.0.20)
3. [MongoDB Atlas](https://www.mongodb.com/), sign up and get a free account
### Download
1. Clone this repo in local,   
   `git clone https://github.com/bensonybs/expense-tracker.git`
2. Open terminal in the project directory, type `npm install` to install needed packages.
3. Sign in to MongoDB Atlas and get the URI. 
   See the document of [MongoDB](https://www.mongodb.com/docs/atlas/getting-started/) for more information.
4. Save the required value to the .env file or the environment variables on your computer.
    [Windows](https://docs.oracle.com/en/database/oracle/machine-learning/oml4r/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html)   
    Check .env.example for the list of environment variables
5. On terminal, type `npm run seed` or `node models/seeds/categorySeeder.js && node models/seeds/recordSeeder.js`(without nodemon) to install seed data to your mongodb.
6. Type `npm run dev` or `node app.js` if you didn't install nodemon.
7. Go to [http://localhost:3000](http://localhost:3000) in the browser to see the website. 

## Packages
### Node.js
Watch all packages installed in package.json
### Others
- [Bootstrap](https://getbootstrap.com/), 5.2.3
- [Font Awesome](https://fontawesome.com/), 5.8.1

## Future Updates
1. Split expense with other user, [Splitwise](https://www.splitwise.com/), [Tricount](https://www.tricount.com/)