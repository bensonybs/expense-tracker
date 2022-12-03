# Restaurant List
A list which user can save favorite restaurants.   
This is a express web app from [AlphaCamp](https://tw.alphacamp.co/).   
## Demo
![demo](/public/image/demo.gif)
You can also see the website in [Replit](https://replit.com/@bensonybs/restaurantlist).
## Features
- Create, read, update, delete restaurant information.
- Searching restaurants in name.
- User authentication: You can login with email or Facebook now. (**New Feature**)
## Getting Start
### Prerequisite
1. [Node.js](https://nodejs.org/en/), v14.16.0
2. (Optional) [nodemon](https://www.npmjs.com/package/nodemon) (2.0.20)
3. [MongoDB Atlas](https://www.mongodb.com/), sign up and get a free account
### Download
1. Clone this repo in local,   
   `git clone https://github.com/bensonybs/restaurant_list.git`
2. Open terminal in the project directory, type `npm install` to install needed packages.
3. Sign in to MongoDB Atlas and get the URI. 
   See the document of [MongoDB](https://www.mongodb.com/docs/atlas/getting-started/) for more information.
4. Save the URI to the environment variables on your computer.
    [Windows](https://docs.oracle.com/en/database/oracle/machine-learning/oml4r/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html)
5. On terminal, type `npm run seed` or `node models/seeds/restaurantSeeder.js`(without nodemon) to install seed data to your mongodb.
6. Type `npm run dev` or `node app.js` if you didn't install nodemon.
7. Go to [http://localhost:3000](http://localhost:3000) in the browser to see the website. 

## Packages
### Node.js
Watch all packages installed in package.json
### Others
- [Bootstrap](https://getbootstrap.com/), 4.3.1
- [Font Awesome](https://fontawesome.com/), 5.8.1

## Future Updates
1. [Passport Error Message(S1U34)](https://stackoverflow.com/questions/52567859/how-to-flash-a-message-from-passport-js) 