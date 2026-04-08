# Where's Waldo - Photo Tagging Game

A fun and interactive React-based photo tagging game where players locate and click on specific characters hidden within images. Test your observation skills and compete on the leaderboard!

## Backend API

This is the **frontend** of the Where's Waldo application. The backend API handles game logic, leaderboards, and data persistence.

**Backend Repository:** [where-is-waldo-api](https://github.com/ChoforJr/where-is-waldo-api)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Backend API](#backend-api)
- [Author](#author)

## Features

- 🎮 **Interactive Gameplay**: Click on images to find hidden characters
- ⏱️ **Instant Feedback**: Get immediate confirmation when you locate characters correctly
- 🏆 **Leaderboard**: View rankings and compare your times with other players
- 📚 **Multiple Difficulty Levels**: Multiple boards to choose from and test your skills
- 🎨 **Intuitive UI**: Clean and user-friendly interface with help section
- ⚡ **Fast Performance**: Built with Vite for optimized loading and performance

## Tech Stack

**Frontend:**

- React 19.1.1
- React Router DOM 7.8.2 (for navigation and routing)
- Vite 7.1.2 (build tool)
- Lucide React (icon library)
- CSS Modules (component-scoped styling)

**Testing & Quality:**

- Vitest (unit testing)
- React Testing Library
- ESLint (code quality)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ChoforJr/where-is-waldo.git
   cd where-is-waldo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Usage

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run unit tests
- `npm run lint` - Check code quality with ESLint

### How to Play

1. Navigate to a **board** from the home page
2. An image will be displayed with hidden characters
3. **Click** on the image where you think a character is located
4. Receive instant feedback - green for correct, red for incorrect
5. Find all characters to **win** and see your completion time on the leaderboard
6. Visit the **Help** page for additional information

## Project Structure

```
src/
├── App Components/          # Main app wrapper and routing logic
├── HomePage Components/      # Home page and board selection
├── Gameplay Components/      # Core game logic and UI
├── Rankings Components/      # Leaderboard display
├── Help Components/         # Help/instructions page
├── ItemContext.jsx          # Global context for shared state
├── ErrorPage.jsx            # Error boundary component
├── routes.jsx               # Route definitions
└── main.jsx                 # Application entry point

public/
├── boards/                  # Game board images
└── characters/              # Character reference images

tests/                       # Unit and integration tests
```

## Author

**FORSAKANG CHOFOR JUNIOR**

- [GitHub](https://github.com/ChoforJr)
- [LinkedIn](https://www.linkedin.com/in/choforforsakang/)
