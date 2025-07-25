# Dylan & Katelyn's Law Study Tool

A collaborative study application for law school exam preparation with real-time progress tracking, gamification, and competitive challenges.

## Features

### 📚 Study Content
- **Contracts**: Formation, defenses, breach, remedies with mnemonics
- **Torts**: Intentional torts, negligence, defamation with structured elements  
- **Criminal Law**: Formation, homicide, inchoate crimes, defenses

### 👥 Collaborative Features
- Real-time progress sharing between Dylan and Katelyn
- Study together sessions with live activity tracking
- Partner status indicators (online, studying, offline)
- Shared challenges and competitions

### 🎮 Gamification
- Points system with streak multipliers
- Achievement badges for milestones
- Study streak tracking with fire emoji progression
- Leaderboard competition between study partners

### 🏆 Challenge System
- Weekly topic races
- Study streak challenges  
- Subject mastery competitions
- Study time challenges
- Automatic progress tracking and winner determination

### 📊 Progress Tracking  
- Topic mastery levels (0-5 scale)
- Study time tracking
- Weekly goal completion
- Visual progress bars and calendars
- Confidence levels for spaced repetition

## Getting Started

### Option 1: Local Storage Only (Immediate Use)
1. Open `index.html` in a web browser
2. The app will work locally with browser storage
3. Progress is saved locally but not shared between users

### Option 2: Turso Database (Full Collaboration)
1. Sign up for a free Turso account at [turso.tech](https://turso.tech)
2. Create a new database
3. Get your database URL and auth token
4. Configure in the app settings (feature to be added)
5. Both Dylan and Katelyn can share real-time progress

## File Structure

```
├── index.html              # Main dashboard
├── css/
│   ├── main.css            # Core styling
│   ├── partnership.css     # Collaborative features
│   └── gamification.css    # Points, badges, achievements
├── js/
│   ├── app.js              # Main application logic
│   ├── law-content.js      # Study content and data
│   ├── turso-sync.js       # Database synchronization
│   ├── partnership.js      # Collaboration features
│   ├── challenges.js       # Challenge system
│   └── gamification.js     # Points and achievements
└── README.md
```

## Study Schedule Integration

The app includes Dylan's 2-week intensive study plan:

**Week 1**: Torts focus (Intentional torts, Negligence, Defamation)
**Week 2**: Contracts & Criminal Law (Formation, Defenses, Homicide)

Daily goals are tracked with point rewards and progress visualization.

## Law Content Structure

All content is organized by:
- **Subject** (Contracts, Torts, Criminal)
- **Categories** (Formation, Defenses, etc.)
- **Topics** with rules, elements, and mnemonics
- **Difficulty levels** (1-3 scale)
- **Mastery tracking** (0-5 scale)

## Achievement System

Unlock badges for:
- Study streaks (3, 7, 14 days)
- Subject mastery (complete all topics)
- Time-based studying (early bird, night owl)
- Collaboration (study buddy sessions)
- Challenge victories

## Technology Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Database**: Turso SQLite (optional, with local storage fallback)
- **Styling**: CSS custom properties with responsive design
- **Real-time**: WebSocket-like updates via database polling

## Development Notes

This app is designed for law school exam preparation with:
- Mobile-first responsive design
- Offline functionality with local storage
- Real-time collaboration when database is configured
- Gamification to maintain motivation during intensive study

## Contributing

Built specifically for Dylan and Katelyn's law school journey. The content and features are tailored to their study schedule and needs.

---

**Good luck with your law school exams! 📚⚖️🎓**