# Where's Waldo (Photo Tagging Game)

A full-stack photo tagging game where players search for hidden characters in detailed illustrations, similar to the classic "Where's Waldo" experience. Test your observation skills and compete for the best times on the leaderboard!

## Live Demo

[Visit the live game](https://where-is-waldo-one.vercel.app/) 

## Game Features

- **Multiple Game Settings** - Choose from various illustrated scenes to explore
- **Character Discovery** - Find hidden characters like Waldo, Wizard, Wilma, and more
- **Interactive Targeting** - Click on the image to bring up a targeting box with character selection
- **Real-time Validation** - Instant feedback on whether your guess is correct
- **Timer System** - Track how long it takes you to find all characters
- **Leaderboard** - Compare your completion times with other players
- **Responsive Design** - Works seamlessly across different screen sizes (with coordinate normalization)

## Technical Details

### Frontend
- **React 19** with **Vite** for fast development and builds
- **React Router v7** for navigation
- **React Icons** for beautiful iconography
- **Custom Fonts** - Cormorant Garamond & Nunito Sans for elegant typography
- **ldrs** for lightweight loading animations
- **uuid** for generating unique identifiers

### Backend
- **Express.js** server with Node.js (ES modules)
- **PostgreSQL** with **Prisma ORM** for database management
- **Jest & Supertest** for comprehensive testing
- **CORS** enabled for secure cross-origin requests

### Testing
- **Jest** for backend unit and integration tests
- **Supertest** for API endpoint testing
- **React Testing Library** (implied for frontend components)

## API Endpoints

### Game Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/settings` | Get all available game settings/levels |
| GET | `/settings/:settingid` | Get specific game setting by ID |

### Characters

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/characters` | Get all characters across all settings |
| GET | `/characters/:settingid` | Get characters for specific game setting |

### Gameplay

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/settings/:settingid/verify/:charid` | Verify if clicked coordinates match character position |
| POST | `/settings/:settingid/leaderboard` | Submit completed game time to leaderboard |

### Leaderboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaderboard` | Get all leaderboard entries |
| GET | `/leaderboard/:settingid` | Get leaderboard for specific game setting |

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **GameSetting** - Stores image URLs, dimensions, and level metadata
- **Character** - Contains character names, coordinates (normalized X/Y positions), and relationships to game settings
- **Leaderboard** - Tracks player names, completion times, and associated game settings

## Installation Procedure

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/wheres-waldo.git
cd wheres-waldo

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies
cd client  # or your frontend directory name
npm install
cd ..

# 4. Set up environment variables
cp .env.example .env

# Edit .env with your database URL and configuration

# 5. Set up database
npx prisma migrate dev --name init
npx prisma generate

# 6. Seed the database with initial game data (optional)
npm run seed

# 7. Run development servers

# Terminal 1 - Backend (runs on port 3000 by default)
npm run dev

# Terminal 2 - Frontend (runs on port 5173 by default)
cd client
npm run dev
```

### Environment Variables (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/whereswaldo"
SECRET_KEY="your-secret-key"
PORT=3000
NODE_ENV="development"
```

## How to Play

1. **Select a Level** - Choose from available illustrated scenes
2. **Find the Characters** - Look for hidden characters in the image
3. **Click to Select** - Click on where you think a character is hidden
4. **Choose Character** - Select which character you've found from the dropdown
5. **Get Feedback** - The game tells you if you're correct or not
6. **Track Your Time** - Timer starts when the level loads and stops when all characters are found
7. **Submit Your Score** - Enter your name to appear on the leaderboard

## Technical Implementation Notes

### Coordinate Normalization
The app handles different screen sizes by normalizing click coordinates. This ensures that character positions work correctly regardless of the user's device or viewport size.

### Game Logic
- Timer starts automatically when a level is loaded
- Each character can only be found once per game session
- Visual markers appear on successfully found characters
- Targeting box disappears after each selection attempt

## Testing

```bash
# Run backend tests
npm test

# Run tests with coverage
npm run test:coverage

# Frontend tests (if configured)
cd client
npm run test
```

## Project Structure

```
wheres-waldo/
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── routes/
│   │   ├── gameRoutes.js
│   │   ├── characterRoutes.js
│   │   └── leaderboardRoutes.js
│   ├── controllers/
│   ├── middleware/
│   ├── tests/
│   └── app.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
└── package.json
```

## Deployment

The app can be deployed to various platforms:

- **Frontend**: Vercel, Netlify, or Render
- **Backend**: Render, Railway, or Heroku
- **Database**: Supabase, Railway PostgreSQL, or AWS RDS

### Example Deployment Commands

```bash
# Build frontend for production
cd client
npm run build

# Start backend in production mode
NODE_ENV=production npm start
```

## Extra Credit Features Implemented

- Multiple game settings/levels available
- Dynamic image loading from database
- Comprehensive coordinate normalization across screen sizes
- Fully responsive design

## License

This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Contact

- GitHub: [@smsarfroz](https://github.com/smsarfroz)
- LinkedIn: [linkedin.com/in/sarfroz-sheikh](https://www.linkedin.com/in/sarfroz-sheikh/)
- Email: [ssarfroz@gmail.com](mailto:ssarfroz@gmail.com)

---

*Built as a capstone project for The Odin Project - demonstrating full-stack development skills including React, Express, PostgreSQL, and complex game logic implementation.*