// Turso Database Connection and Sync
// Handles real-time collaboration between Dylan and Katelyn

class TursoSync {
    constructor() {
        this.dbUrl = null; // Will be set when user configures Turso
        this.authToken = null;
        this.isConnected = false;
        this.currentUser = 'dylan'; // Default user
        this.syncInterval = null;
        this.lastSync = null;
        
        // Initialize local storage fallback
        this.initLocalStorage();
        
        // Check for existing Turso configuration
        this.loadConfiguration();
    }
    
    // Initialize local storage for offline functionality
    initLocalStorage() {
        const defaultData = {
            users: {
                dylan: { id: 'dylan_001', name: 'Dylan', points: 0, streak: 0, lastStudied: null },
                katelyn: { id: 'katelyn_001', name: 'Katelyn', points: 0, streak: 0, lastStudied: null }
            },
            progress: {},
            achievements: { dylan: [], katelyn: [] },
            challenges: [],
            sessions: []
        };
        
        if (!localStorage.getItem('lawStudyData')) {
            localStorage.setItem('lawStudyData', JSON.stringify(defaultData));
        }
    }
    
    // Load Turso configuration from local storage
    loadConfiguration() {
        const config = localStorage.getItem('tursoConfig');
        if (config) {
            const { dbUrl, authToken } = JSON.parse(config);
            this.dbUrl = dbUrl;
            this.authToken = authToken;
            this.connect();
        }
    }
    
    // Configure Turso connection
    async configure(dbUrl, authToken) {
        this.dbUrl = dbUrl;
        this.authToken = authToken;
        
        // Store configuration
        localStorage.setItem('tursoConfig', JSON.stringify({ dbUrl, authToken }));
        
        // Test connection
        return this.connect();
    }
    
    // Connect to Turso database
    async connect() {
        if (!this.dbUrl || !this.authToken) {
            console.log('Turso not configured, using local storage only');
            return false;
        }
        
        try {
            // Test connection with a simple query
            const response = await this.executeQuery('SELECT 1 as test');
            if (response) {
                this.isConnected = true;
                console.log('Connected to Turso database');
                this.startSync();
                return true;
            }
        } catch (error) {
            console.error('Failed to connect to Turso:', error);
            this.isConnected = false;
        }
        
        return false;
    }
    
    // Execute SQL query on Turso
    async executeQuery(sql, params = []) {
        if (!this.isConnected) {
            return null;
        }
        
        try {
            const response = await fetch(this.dbUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    statements: [{
                        q: sql,
                        params: params
                    }]
                })
            });
            
            const data = await response.json();
            return data.results?.[0];
        } catch (error) {
            console.error('Query execution failed:', error);
            return null;
        }
    }
    
    // Initialize database schema
    async initializeSchema() {
        const schema = `
            -- Users table
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE,
                points INTEGER DEFAULT 0,
                streak INTEGER DEFAULT 0,
                last_studied DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Study progress
            CREATE TABLE IF NOT EXISTS user_progress (
                id TEXT PRIMARY KEY,
                user_id TEXT REFERENCES users(id),
                topic_id TEXT NOT NULL,
                mastery_level INTEGER DEFAULT 0,
                study_count INTEGER DEFAULT 0,
                last_studied DATETIME,
                confidence INTEGER DEFAULT 1,
                time_spent_minutes INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Achievements
            CREATE TABLE IF NOT EXISTS achievements (
                id TEXT PRIMARY KEY,
                user_id TEXT REFERENCES users(id),
                achievement_id TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                points INTEGER DEFAULT 0,
                earned_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Challenges
            CREATE TABLE IF NOT EXISTS challenges (
                id TEXT PRIMARY KEY,
                challenger_id TEXT REFERENCES users(id),
                challenged_id TEXT REFERENCES users(id),
                challenge_type TEXT NOT NULL,
                description TEXT,
                target_value INTEGER,
                deadline DATE,
                status TEXT DEFAULT 'active',
                winner_id TEXT REFERENCES users(id),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Study sessions
            CREATE TABLE IF NOT EXISTS study_sessions (
                id TEXT PRIMARY KEY,
                user_id TEXT REFERENCES users(id),
                topics_studied TEXT,
                duration_minutes INTEGER,
                correct_answers INTEGER,
                total_questions INTEGER,
                session_date DATE DEFAULT CURRENT_DATE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            -- Insert default users
            INSERT OR IGNORE INTO users (id, name, email) VALUES 
                ('dylan_001', 'Dylan', 'dylan@elk.com'),
                ('katelyn_001', 'Katelyn', 'katelyn@studypartner.com');
        `;
        
        const statements = schema.split(';').filter(s => s.trim());
        for (const statement of statements) {
            if (statement.trim()) {
                await this.executeQuery(statement.trim());
            }
        }
    }
    
    // Start real-time sync
    startSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        
        // Sync every 30 seconds
        this.syncInterval = setInterval(() => {
            this.syncData();
        }, 30000);
        
        // Initial sync
        this.syncData();
    }
    
    // Sync data between local storage and Turso
    async syncData() {
        if (!this.isConnected) return;
        
        try {
            // Sync user data
            await this.syncUsers();
            
            // Sync progress
            await this.syncProgress();
            
            // Sync achievements
            await this.syncAchievements();
            
            // Sync challenges
            await this.syncChallenges();
            
            this.lastSync = new Date();
            this.broadcastUpdate('sync_complete', { timestamp: this.lastSync });
            
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }
    
    // Sync user data
    async syncUsers() {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        
        for (const [userId, userData] of Object.entries(localData.users)) {
            await this.executeQuery(`
                INSERT OR REPLACE INTO users (id, name, points, streak, last_studied)
                VALUES (?, ?, ?, ?, ?)
            `, [userData.id, userData.name, userData.points, userData.streak, userData.lastStudied]);
        }
        
        // Fetch latest data from server
        const result = await this.executeQuery('SELECT * FROM users');
        if (result?.rows) {
            result.rows.forEach(row => {
                const userId = row[0] === 'dylan_001' ? 'dylan' : 'katelyn';
                localData.users[userId] = {
                    id: row[0],
                    name: row[1],
                    points: row[3] || 0,
                    streak: row[4] || 0,
                    lastStudied: row[5]
                };
            });
            
            localStorage.setItem('lawStudyData', JSON.stringify(localData));
        }
    }
    
    // Sync progress data
    async syncProgress() {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        
        // Upload local changes
        for (const [key, progress] of Object.entries(localData.progress)) {
            const [userId, topicId] = key.split(':');
            await this.executeQuery(`
                INSERT OR REPLACE INTO user_progress 
                (id, user_id, topic_id, mastery_level, study_count, last_studied, confidence, time_spent_minutes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [key, userId, topicId, progress.masteryLevel, progress.studyCount, 
                progress.lastStudied, progress.confidence, progress.timeSpent]);
        }
        
        // Fetch latest from server
        const result = await this.executeQuery('SELECT * FROM user_progress');
        if (result?.rows) {
            result.rows.forEach(row => {
                localData.progress[row[0]] = {
                    userId: row[1],
                    topicId: row[2],
                    masteryLevel: row[3],
                    studyCount: row[4],
                    lastStudied: row[5],
                    confidence: row[6],
                    timeSpent: row[7]
                };
            });
            
            localStorage.setItem('lawStudyData', JSON.stringify(localData));
        }
    }
    
    // Sync achievements
    async syncAchievements() {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        
        for (const [userId, achievements] of Object.entries(localData.achievements)) {
            for (const achievement of achievements) {
                await this.executeQuery(`
                    INSERT OR IGNORE INTO achievements 
                    (id, user_id, achievement_id, title, description, points, earned_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `, [achievement.id, userId + '_001', achievement.achievementId, 
                    achievement.title, achievement.description, achievement.points, achievement.earnedAt]);
            }
        }
        
        // Fetch from server
        const result = await this.executeQuery('SELECT * FROM achievements');
        if (result?.rows) {
            localData.achievements = { dylan: [], katelyn: [] };
            result.rows.forEach(row => {
                const userId = row[1] === 'dylan_001' ? 'dylan' : 'katelyn';
                localData.achievements[userId].push({
                    id: row[0],
                    achievementId: row[2],
                    title: row[3],
                    description: row[4],
                    points: row[5],
                    earnedAt: row[6]
                });
            });
            
            localStorage.setItem('lawStudyData', JSON.stringify(localData));
        }
    }
    
    // Sync challenges
    async syncChallenges() {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        
        for (const challenge of localData.challenges) {
            await this.executeQuery(`
                INSERT OR REPLACE INTO challenges 
                (id, challenger_id, challenged_id, challenge_type, description, target_value, deadline, status, winner_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [challenge.id, challenge.challengerId, challenge.challengedId, challenge.type,
                challenge.description, challenge.targetValue, challenge.deadline, challenge.status, challenge.winnerId]);
        }
        
        // Fetch from server
        const result = await this.executeQuery('SELECT * FROM challenges');
        if (result?.rows) {
            localData.challenges = result.rows.map(row => ({
                id: row[0],
                challengerId: row[1],
                challengedId: row[2],
                type: row[3],
                description: row[4],
                targetValue: row[5],
                deadline: row[6],
                status: row[7],
                winnerId: row[8],
                createdAt: row[9]
            }));
            
            localStorage.setItem('lawStudyData', JSON.stringify(localData));
        }
    }
    
    // Update user progress
    async updateProgress(userId, topicId, data) {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        const key = `${userId}_001:${topicId}`;
        
        localData.progress[key] = {
            ...localData.progress[key],
            ...data,
            lastStudied: new Date().toISOString()
        };
        
        // Update user stats
        if (data.masteryLevel === 5) {
            localData.users[userId].points += 50; // Mastery bonus
        } else {
            localData.users[userId].points += 10; // Study points
        }
        
        localStorage.setItem('lawStudyData', JSON.stringify(localData));
        
        // Broadcast update
        this.broadcastUpdate('progress_updated', { userId, topicId, data });
        
        // Sync immediately for real-time collaboration
        if (this.isConnected) {
            await this.syncData();
        }
    }
    
    // Award achievement
    async awardAchievement(userId, achievementId) {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        const achievement = ACHIEVEMENTS[achievementId];
        
        if (!achievement) return;
        
        // Check if already earned
        const existing = localData.achievements[userId].find(a => a.achievementId === achievementId);
        if (existing) return;
        
        const newAchievement = {
            id: `${userId}_${achievementId}_${Date.now()}`,
            achievementId: achievementId,
            title: achievement.title,
            description: achievement.description,
            points: achievement.points,
            earnedAt: new Date().toISOString()
        };
        
        localData.achievements[userId].push(newAchievement);
        localData.users[userId].points += achievement.points;
        
        localStorage.setItem('lawStudyData', JSON.stringify(localData));
        
        // Broadcast achievement
        this.broadcastUpdate('achievement_earned', { userId, achievement: newAchievement });
        
        // Sync immediately
        if (this.isConnected) {
            await this.syncData();
        }
    }
    
    // Create challenge
    async createChallenge(challengerId, challengedId, type, description, targetValue, deadline) {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        
        const challenge = {
            id: `challenge_${Date.now()}`,
            challengerId: challengerId + '_001',
            challengedId: challengedId + '_001',
            type: type,
            description: description,
            targetValue: targetValue,
            deadline: deadline,
            status: 'active',
            winnerId: null,
            createdAt: new Date().toISOString()
        };
        
        localData.challenges.push(challenge);
        localStorage.setItem('lawStudyData', JSON.stringify(localData));
        
        // Broadcast challenge
        this.broadcastUpdate('challenge_created', { challenge });
        
        // Sync immediately
        if (this.isConnected) {
            await this.syncData();
        }
        
        return challenge;
    }
    
    // Get data methods
    getUserData(userId) {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        return localData.users[userId];
    }
    
    getUserProgress(userId) {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        const userKey = userId + '_001';
        const progress = {};
        
        Object.entries(localData.progress).forEach(([key, data]) => {
            if (key.startsWith(userKey + ':')) {
                const topicId = key.split(':')[1];
                progress[topicId] = data;
            }
        });
        
        return progress;
    }
    
    getUserAchievements(userId) {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        return localData.achievements[userId] || [];
    }
    
    getChallenges() {
        const localData = JSON.parse(localStorage.getItem('lawStudyData'));
        return localData.challenges || [];
    }
    
    // Broadcast updates for real-time UI updates
    broadcastUpdate(type, data) {
        window.dispatchEvent(new CustomEvent('lawStudyUpdate', {
            detail: { type, data }
        }));
    }
    
    // Set current user
    setCurrentUser(userId) {
        this.currentUser = userId;
        this.broadcastUpdate('user_changed', { userId });
    }
    
    // Get connection status
    getStatus() {
        return {
            isConnected: this.isConnected,
            lastSync: this.lastSync,
            currentUser: this.currentUser
        };
    }
    
    // Disconnect
    disconnect() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
        this.isConnected = false;
    }
}

// Create global instance
const tursoSync = new TursoSync();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TursoSync;
}