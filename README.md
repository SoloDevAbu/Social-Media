# Umedia Project

## Overview
This project is designed to manage media content efficiently. It includes backend logic for handling data and frontend functionality for user interaction.

## Backend Logic

### 1. User Authentication
- **Registration**: Users can register with their email and password.
- **Login**: Users can log in using their registered email and password.
- **JWT Tokens**: JSON Web Tokens are used for session management.

### 2. Media Management
- **Upload Media**: Users can upload media files (images, videos).
- **Edit Media**: Users can edit media details (title, description).
- **Delete Media**: Users can delete their media files.
- **Fetch Media**: Users can fetch media files with pagination.

### 3. User Profile
- **View Profile**: Users can view their profile information.
- **Edit Profile**: Users can update their profile details.

## Frontend Functionality

### 1. User Interface
- **Responsive Design**: The UI is responsive and works on various devices.
- **Navigation**: Easy navigation through different sections (Home, Profile, Media).

### 2. Media Gallery
- **Display Media**: Media files are displayed in a gallery format.
- **Search Media**: Users can search for media files.
- **Filter Media**: Users can filter media by type (image, video).

### 3. User Actions
- **Upload Media**: Users can upload media files through a form.
- **Edit Media**: Users can edit media details directly from the gallery.
- **Delete Media**: Users can delete media files with a confirmation prompt.

### 4. Profile Management
- **View Profile**: Users can view their profile information.
- **Edit Profile**: Users can update their profile details through a form.

## Technologies Used
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Redux, Bootstrap
- **Authentication**: JWT, bcrypt

## Setup Instructions
1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/umedia.git
    ```
2. **Install dependencies**:
    ```bash
    cd umedia
    npm install
    ```
3. **Run the backend server**:
    ```bash
    npm run server
    ```
4. **Run the frontend server**:
    ```bash
    npm start
    ```

## Contributing
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature-branch`)
- Open a Pull Request

## License
This project is licensed under the MIT License.
