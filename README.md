# Email Builder API

A backend API for generating and managing email templates. This API supports uploading images, storing template configurations, and generating dynamic email content. It serves as the backend for an email builder app that integrates with both frontend and third-party services.

## Features
- Generate dynamic email templates.
- Upload and manage images (for email content).
- Store and retrieve email template configurations.
- Support for email template versioning.
- Secure authentication and access control.
- API endpoints to interact with templates and image resources.

## Technologies Used
- Node.js
- Express.js
- MongoDB (or any other database)
- Multer (for handling file uploads)
- JWT (for secure authentication)
- dotenv (for environment variables)

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd email-builder-api
```

### 2. Install Dependencies
Make sure you have Node.js and npm installed. Then, install the necessary dependencies:
```bash
npm install
```

### 3. Create Environment Variables
Create a .env file in the root of the project and add the necessary environment variables. Example:

```bash
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/email-builder
UPLOADS_DIR=uploads
```

### 4. Start the Server
Once the environment variables are set, you can start the development server:

```bash
npm run devstart
```

### 5. Build for Production
For production, you can run:

```bash
npm run build
npm start
```

This will build the app and run the server in production mode.

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure your code follows the coding standards and includes appropriate tests.
