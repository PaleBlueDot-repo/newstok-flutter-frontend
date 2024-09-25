

# NewsTok Reels Frontend

This is the frontend for a news reel platform where users can view text-based news reels with AI-generated images and music. Users can also manage their profiles. The frontend communicates with a Spring Boot backend.




## Features

- **News Reels Display**: Watch text-based news reels with AI-generated images and background music.
- **User Profile Management**: Edit and update your profile information.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Interaction with Backend**: Sends requests to the backend server for news reels and user profile data.




## How to Run

### Prerequisites
- A web browser.
- XAMPP, WAMP, or any local server (for running the project via `localhost`).
- A running Spring Boot backend server (ensure the correct API endpoints are available).

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/your-username/newstok-user-frontend.git](https://github.com/PaleBlueDot-repo/newstok-user-frontend.git)
   ```

2. **Move the Project to `htdocs`**:
   - If using XAMPP or WAMP, move the `newsreels-frontend` folder to the `htdocs` directory of your server:
     - For **XAMPP**: Copy the project folder to `C:\xampp\htdocs\`
     - For **WAMP**: Copy the project folder to `C:\wamp\www\`

3. **Start the Local Server**:
   - Start your local server (e.g., XAMPP/WAMP) from the control panel.

4. **Access the Project in Your Browser**:
   - Open your browser and navigate to:
     ```
     http://localhost/newstok-user-frontend/
     ```
   This will load the `index.html` of your project.

5. **Ensure Backend is Running**:
   - Ensure that your Spring Boot backend server is running and the API endpoints are correctly set to interact with the frontend.

## Project Demo

- **View News Reels**: 
  - On the homepage (`index.html`), users can watch AI-generated news reels with text, images, and background music.

- **User Profile Management**: 
  - Navigate to the profile page (`profile.html`) to view and edit user profile information. The data is fetched and updated via API calls to the backend.

---

This guide walks through how to set up and run the project using a local server like XAMPP/WAMP.
