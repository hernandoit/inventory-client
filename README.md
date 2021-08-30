[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Express-Api-Inventory

The backend of our inventory management system using `express` as an API. Includes authentication and common middlewares.

## Setup Steps
1. Fork and clone this repository into your projects location 
   - `git clone git@github.com:<your github account name here>/express-api-inventory.git`
2. Create a new branch, and name it after your project. 
3. Checkout to your newly created branch.
   - `git checkout -b <your projects name here>`
4. Install dependencies in your branch by running in the terminal  
   - `npm install`.

## Tasks

This project uses `npm` as a task runner. This is more
conventional for modern Express apps, and it's handy because we'll definitely
use `npm` anyway. These are the commands available:

| Command                | Effect                                                                                                      |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm start`       | Starts a development server.                                                                                         |
| `npm test`             | Runs automated tests.                                                                                       |
| `npm run deploy` | Pushes up to the gh-pages front end location and deploys our changes to the deployment website. |



## Planning
The main responsibility of the inventory management system is to be able to track the inventory levels of various items that your business needs in stock. You must keep track of the quantity of each item in stock, as well its price.

## User Stories

## MVP
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create an inventory item.
- As a signed in user, I would like to update my inventory items.
- As a signed in user, I would like to delete my inventory items.
- As a signed in user, I would like to see all items.
- As a signed in user, I would like to see the quantity and price of each item.
- As a signed in user, I want to be able to update or create inventory without having to know what my current inventory levels are.
    - If the product exists in the inventory, the app should make a PATCH request to update the existing item. If I don't have enough product (when reducing product counts) the app should not allow the update.
    - If the product does not exists in the inventory, the app should make a POST request to create the new item.

## Reach Goal(s)
- Develop a barcode generator or QR code generator that creates a unique image that contains the unique identifier for each item in your inventory
- Automatic refill notifications: when an item gets to a low quantity, alert the user via email that they need to order more
- Enhanced authentication: Restrict user signups to emails of a certain domain, that of the company that is running the inventory management system. Make sure to verify email addresses. Use multi factor authentication during the sign up or sign in process.


## Technologies Used
- GitHub
- Axios
- React.js
- Bootstrap 5

## Images

## Wire Frame
![wireframe]()
