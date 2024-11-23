Social Media Backend
A Node.js and MongoDB-based backend application for a basic social media platform. This API allows users to sign up, create posts, follow/unfollow other users, and view profiles and posts.

Features

User Management:
Sign up users with unique usernames and emails.
Edit user profiles with bio and profile picture.
Follow/unfollow other users.
View followers and following lists.

Post Management:
Create posts.
Fetch all posts or posts by a specific user.
Like and comment on posts.
Technologies Used
Node.js with Express.js for the backend server.
MongoDB for the database, using Mongoose for schema modeling.
Installation

Clone this repository:

git clone https://github.com/YourUsername/SocialMedia-Backend.git  
cd SocialMedia-Backend  

Install dependencies:
npm install  

Set up MongoDB:
Create a MongoDB database and get the connection URI.
Replace "MONGO_URI" in db.js with your MongoDB connection string.

Start the server:
node index.js  

The server will run on http://localhost:3000.

API Endpoints
User Routes
Sign Up

POST /user/signup
Body:
json
{  
  "username": "example",  
  "email": "example@example.com",  
  "password": "password123",  
  "profilePicture": "url-to-image",  
  "bio": "Short bio here"  
}

View Profile

GET /user/profile
Headers:
json
{  
  "username": "example",  
  "password": "password123"  
}  

Edit Profile

PUT /user/profile
Body:
json
{  
  "bio": "Updated bio",  
  "profilePicture": "new-url-to-image"  
}  

Follow a User

POST /user/profile/follow/:userId
Headers:
json
{  
  "username": "example",  
  "password": "password123"  
}  

Unfollow a User

POST /user/profile/unfollow/:userId
Headers:
json
{  
  "username": "example",  
  "password": "password123"  
}  

Post Routes
Create Post

POST /posts/post
Headers:
json
{  
  "username": "example",  
  "password": "password123"  
}  
Body:
json
{  
  "content": "This is a new post"  
}  

Get All Posts

GET /posts/post
Get Posts by User

GET /posts/post/:userId
Headers:
json
{  
  "username": "example",  
  "password": "password123"  
}  

Project Structure
SocialMedia-Backend/  
├── db/  
│   └── index.js  # Database models (User, Post)  
├── middleware/  
│   └── user.middleware.js  # Middleware for authentication  
├── routes/  
│   ├── user.route.js  # User-related routes  
│   └── post.route.js  # Post-related routes  
├── index.js  # Main application entry point  
└── README.md  # Documentation  

Future Enhancements
Add JWT-based authentication.
Implement more post interactions like likes and comments.
Improve API performance with pagination and caching.
Contribution
Fork the repository.
Create a new branch for your feature/bug fix.
Submit a pull request with a detailed explanation of your changes.
License
This project is licensed under the MIT License.

This concise, structured README should give users a clear understanding of the project and its capabilities!