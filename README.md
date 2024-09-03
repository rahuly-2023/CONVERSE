# CONVERSE

## Description

This is a real-time chat application built with Node.js, Express, and Socket.IO. The application features user authentication, real-time messaging, user online/offline status, and chat deletion. MongoDB is used for data storage, and EJS is used for templating.

## Features

- **User Authentication**: Secure login and user session management.
- **Real-Time Messaging**: Users can chat in real-time with each other using WebSockets.
- **User Online/Offline Status**: Tracks and displays user online/offline status.
- **Chat History**: Load old chat messages between users.
- **Delete Messages**: Users can delete their messages which will be reflected in real-time.
- **File Upload**: Upload user profile images usinh multer.

## Getting Started

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/try/download/community)
- **Git**: [Download and install Git](https://git-scm.com/downloads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repository.git
2. **Navigate to the project directory:**
   ```bash
   cd converse
3. **Install dependencies:**
   ```bash
   npm install
4. **Create a .env file in the root directory with the following content:**
   ```env
   DB_PASSWORD=your_mongodb_password
   SESSION_SECRET=your_session_secret
5. **Start the application**
   ```bash
   npm start


## File Structure

The project is organized as follows:

- `app.js`: Main server file. Sets up Express, Socket.IO, and MongoDB connection.
- `views/`: EJS templates forrendering the UI.
- `routes/`: Express route handlers.
- `models/`: Mongoose models for MongoDB.
- `controllers/`: Business logic for handling user interactions.
- `public/`: Static files including images and client-side scripts.
- `middlewares/`: Custom middleware for authentication and other purposes.


### Configuration

- **Server Configuration**: The server listens on port 10000 by default. Change the port in app.js if needed.
- **Database Configuration**: The MongoDB connection string is configured using environment variables. Ensure that the DB_PASSWORD is correctly set in the .env file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and write clear commit messages.
