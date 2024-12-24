# myPost
Welcome to myPost, an intuitive blog platform for sharing thoughts and creativity through images and text. With robust support for authentication and multi-account management, myPost is designed to provide a secure and user-friendly blogging experience. Built using the modern MEAN stack (MongoDB, Express, Angular, Node.js), myPost was chosen for its ability to streamline development with JavaScript across the stack, ensuring both scalability and reliability for users.

## Features
- **User Authentication and Authorization**: Securely log in and manage multiple accounts with role-based access.
- **Post Management**: Create, edit, and delete blog posts with ease.
- **Media Uploads**: Enhance your posts with image uploads directly integrated into the platform.
- **Responsive Design**: Optimized for both mobile and desktop users.
- **Profile Customization**: Allow users to personalize their accounts for a tailored experience.
- **Robust Backend**: Powered by Node.js and Express for efficient server operations.

## Folder Structure
The project follows a clear and modular structure for ease of development and scalability:
```
myPost/
├── backend/          # Node.js + Express API
│   ├── controllers/  # Contains functions handling API logic (e.g., user and post actions)
│   ├── models/       # Defines MongoDB schemas and data structures
│   ├── routes/       # Manages Express routes for different API endpoints
│   ├── middleware/   # Includes authentication, authorization, and error handling
│   ├── config/       # Configuration files for database and environment variables
│   └── server.js     # Main entry point to start the Node.js server
├── frontend/         # Angular + TypeScript user interface
│   ├── src/          # Core source code for the Angular application
│   ├── e2e/          # End-to-end test cases for UI functionality
│   ├── angular.json  # Angular project settings and configurations
│   └── package.json  # Manages frontend dependencies
├── docs/             # Documentation and media assets for the project
├── .gitignore        # Lists files and directories to exclude from version control
└── README.md         # Overview, setup instructions, and project details
```

## Installation
Setting up myPost is simple and straightforward. It should take approximately 30-45 minutes to complete. Follow the steps below:

### Prerequisites
Ensure you have the following installed:
- Node.js (v14+ recommended)
- npm (Node Package Manager)
- MongoDB (local or hosted, e.g., MongoDB Atlas)
- Angular CLI (`npm install -g @angular/cli`)

### Step-by-Step Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/syedashar09/myPost.git
   cd myPost
   ```
2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   Start the backend server:
   ```bash
   npm start
   ```
3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ng serve
   ```
   Open your browser and navigate to `http://localhost:4200` to access the application.

## Usage
Once set up, you can:
- **Register an Account**: Create a unique account to access features.
- **Log In**: Securely access your account and manage your content.
- **Create Blog Posts**: Add new posts with both text and images.
- **Edit or Delete Posts**: Update or remove your existing posts as needed.
- **Explore Responsive Design**: Enjoy seamless access on any device.

## Contributing
We welcome contributions to myPost! To get started:
1. **Fork the Repository**: Create your copy of the project.
2. **Create a Branch**: Work on your changes in a new branch (`git checkout -b feature-name`).
3. **Make Changes**: Add your improvements or new features.
4. **Commit and Push**:
   ```bash
   git commit -m "Add feature-name"
   git push origin feature-name
   ```
5. **Open a Pull Request**: Submit your changes for review.

## License
myPost is licensed under the MIT License. For more details, refer to the `LICENSE` file included in the repository.

## Contact
For feedback, questions, or suggestions, feel free to reach out via email at syedashar09@gmail.com.

---
Thank you for exploring myPost. We hope you enjoy using the platform as much as we enjoyed building it!

