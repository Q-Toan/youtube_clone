# 📺 YouTube Clone

A fully functional YouTube clone built with React, Vite, and the YouTube Data API v3.

## ✨ Features

- Browse the most popular videos.
- Filter videos by category.
- Real-time search with suggestions.
- Watch videos with playback controls.
- View video details, including title, description, view count, and comments.
- Get recommended videos based on the current video's category and channel.

## 🚀 Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - A fast build tool and development server.
  - [React Router](https://reactrouter.com/) - For routing and navigation.
- **API:**
  - [YouTube Data API v3](https://developers.google.com/youtube/v3) - To fetch video data.
- **Styling:**
  - CSS

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/Q-Toan/youtube-clone.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd youtube-clone
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Get your YouTube API Key:**
    - Go to the [Google Developers Console](https://console.developers.google.com/).
    - Create a new project.
    - Enable the **YouTube Data API v3**.
    - Create credentials for an API key.
5.  **Add your API key:**
    - Open `src/data.js`.
    - Replace `YOUR_API_KEY` with your actual API key:
      ```javascript
      export const API_Key = "YOUR_API_KEY";
      ```

### Usage

- **To run the app in development mode:**
  ```sh
  npm run dev
  ```
- **To build the app for production:**
  ```sh
  npm run build
  ```

## ✍️ Author

*Your Name* - [Your Portfolio/GitHub Link](https://github.com/Q-Toan)

## 🙏 Acknowledgements

- [Google](https://google.com)
- [Vite](https://vitejs.dev)
- [React](https://reactjs.org)
