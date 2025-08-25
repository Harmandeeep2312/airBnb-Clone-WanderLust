# 🏡WanderLust – Full-Stack Rental Web Application

A full-stack stay rental platform inspired by Airbnb, built with Node.js, Express, MongoDB, EJS, and Bootstrap 5. The application enables users to sign up, log in, create listings, upload images, and explore properties with map integration.

# ✨ Features

✅ User Authentication & Authorization – Secure login and signup using session-based auth.
✅ Add, Edit, Delete Listings – Authenticated users can manage their rental properties.
✅ Responsive UI – Built with EJS and Bootstrap 5 for a clean and modern interface.
✅ Image Uploads with Cloudinary – Upload and store images in the cloud.
✅ Location Display with Mapbox – Interactive maps for property locations.
✅ RESTful API Architecture – Organized routes and controllers for scalability.
✅ Deployed on Render – Ready-to-use live version of the app.

## 🛠 Tech Stack

Frontend: EJS (Embedded JavaScript), Bootstrap 5

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ORM

Media Storage: Cloudinary

Maps & Location: Mapbox API

Authentication: Passport.js (Local Strategy)

Deployment: Render

Version Control: Git, GitHub

## 📂 Project Structure
``` bash
airbnb-clone/
│── public/           # Static assets (CSS, JS, images)
│── views/            # EJS templates
│── routes/           # Express routes
│── controllers/      # Business logic
│── models/           # Mongoose models
│── middleware/       # Custom middleware
│── app.js            # Main application file
│── package.json
```


## 🚀 Getting Started
1. Clone the Repository
git clone https://github.com/Harmandeeep2312/stayease.git
cd stayease

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret

4. Run the Application
npm start


Visit http://localhost:3000 in your browser.

🌐 Deployment

This app is deployed on Render. You can also deploy on:

Heroku

Vercel (for static)

AWS EC2

🖼 Screenshots

(Add screenshots of Homepage, Listing Page, Add Listing Page, Map View)
Example:

![Homepage Screenshot](screenshots/home.png)
![Map Integration](screenshots/map.png)

🔑 Key Features Implemented

Session-based authentication with Passport.js

Image upload and management using Cloudinary

Map and location services using Mapbox

CRUD functionality for listings

Flash messages and error handling

🏷 Topics

nodejs express mongodb mongoose cloudinary mapbox ejs bootstrap full-stack-app rental-platform airbnb-clone

📜 License

This project is licensed under the MIT License. # airBnb-Clone-WanderLust
