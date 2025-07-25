// Gamification System - Points, achievements, and motivational features

class Gamification {
    constructor() {
        this.pointValues = {
            study_topic: 10,
            master_topic: 50,
            daily_streak: 25,
            weekly_goal: 100,
            challenge_win: 150,
            study_together: 30,
            first_session: 20,
            perfect_week: 200
        };
        
        this.streakMultipliers = {
            3: 1.2,   // 20% bonus after 3 days
            7: 1.5,   // 50% bonus after 1 week
            14: 2.0,  // 100% bonus after 2 weeks
            30: 2.5   // 150% bonus after 1 month
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkDailyStreaks();
        this.scheduleStreakCheck();
    }
    
    setupEventListeners() {
        // Listen for study events
        window.addEventListener('lawStudyUpdate', (event) => {
            this.handleStudyEvent(event.detail);
        });
        
        // Listen for achievement events
        window.addEventListener('achievementEarned', (event) => {
            this.showAchievementAnimation(event.detail);
        });
    }
    
    handleStudyEvent(eventDetail) {
        const { type, data } = eventDetail;
        
        switch (type) {
            case 'progress_updated':
                this.handleProgressUpdate(data);
                break;
            case 'achievement_earned':
                this.handleAchievementEarned(data);
                break;
            case 'challenge_completed':
                this.handleChallengeCompleted(data);
                break;
        }
    }
    
    async handleProgressUpdate(data) {
        const { userId, topicId, data: progressData } = data;
        
        // Award study points
        await this.awardPoints(userId, 'study_topic');
        
        // Check for mastery
        if (progressData.masteryLevel >= 4) {
            await this.awardPoints(userId, 'master_topic');
            await this.checkMasteryAchievements(userId, topicId);
        }
        
        // Update streak
        await this.updateStudyStreak(userId);
        
        // Check for other achievements
        await this.checkStudyAchievements(userId);
    }
    
    async awardPoints(userId, reason, customAmount = null) {
        const points = customAmount || this.pointValues[reason] || 0;
        const userData = tursoSync.getUserData(userId);
        
        // Apply streak multiplier
        const multiplier = this.getStreakMultiplier(userData.streak);
        const finalPoints = Math.floor(points * multiplier);
        
        // Update user points
        userData.points += finalPoints;
        
        // Show point animation if it's the current user
        if (userId === app.currentUser) {
            this.showPointsAnimation(finalPoints, reason);
        }
        
        // Save updated data
        await tursoSync.syncData();
        
        return finalPoints;
    }
    
    getStreakMultiplier(streak) {
        for (const [threshold, multiplier] of Object.entries(this.streakMultipliers).reverse()) {
            if (streak >= parseInt(threshold)) {
                return multiplier;
            }
        }
        return 1.0;
    }
    
    showPointsAnimation(points, reason) {
        const pointsElement = document.createElement('div');
        pointsElement.className = 'points-animation';
        pointsElement.textContent = `+${points} pts`;
        
        // Style the animation
        Object.assign(pointsElement.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#fbbf24',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            zIndex: '1002',
            pointerEvents: 'none',
            animation: 'pointsFloat 2s ease-out forwards'
        });
        
        // Add CSS animation if not already present
        if (!document.getElementById('points-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'points-animation-styles';
            style.textContent = `
                @keyframes pointsFloat {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    50% {
                        opacity: 1;
                        transform: translate(-50%, -60%) scale(1.2);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -80%) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(pointsElement);
        
        // Remove after animation
        setTimeout(() => {
            if (pointsElement.parentElement) {
                pointsElement.parentElement.removeChild(pointsElement);
            }
        }, 2000);
    }
    
    async updateStudyStreak(userId) {
        const userData = tursoSync.getUserData(userId);
        const today = new Date().toDateString();
        const lastStudied = userData.lastStudied ? new Date(userData.lastStudied).toDateString() : null;
        
        if (lastStudied === today) {
            // Already studied today, no streak update needed
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastStudied === yesterdayStr) {
            // Studied yesterday, continue streak
            userData.streak += 1;
            await this.awardPoints(userId, 'daily_streak');
            
            // Check streak achievements
            await this.checkStreakAchievements(userId, userData.streak);
        } else if (lastStudied && new Date(userData.lastStudied) < yesterday) {
            // Broke streak, reset to 1
            userData.streak = 1;
        } else {
            // First time studying or studying today for first time
            userData.streak = 1;
        }
        
        // Update last studied time
        userData.lastStudied = new Date().toISOString();
        
        // Show streak notification
        if (userId === app.currentUser && userData.streak > 1) {
            this.showStreakNotification(userData.streak);
        }
    }
    
    showStreakNotification(streak) {
        const streakElement = document.createElement('div');
        streakElement.className = 'streak-notification';
        streakElement.innerHTML = `
            <div class="streak-content">
                <div class="streak-icon">🔥</div>
                <div class="streak-text">
                    <div class="streak-number">${streak}</div>
                    <div class="streak-label">Day Streak!</div>
                </div>
            </div>
        `;
        
        // Style the notification
        Object.assign(streakElement.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Style the content
        const content = streakElement.querySelector('.streak-content');
        Object.assign(content.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        });
        
        const icon = streakElement.querySelector('.streak-icon');
        Object.assign(icon.style, {
            fontSize: '2rem'
        });
        
        const number = streakElement.querySelector('.streak-number');
        Object.assign(number.style, {
            fontSize: '1.5rem',
            fontWeight: 'bold'
        });
        
        const label = streakElement.querySelector('.streak-label');
        Object.assign(label.style, {
            fontSize: '0.9rem',
            opacity: '0.9'
        });
        
        document.body.appendChild(streakElement);
        
        // Animate in
        setTimeout(() => {
            streakElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            streakElement.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (streakElement.parentElement) {
                    streakElement.parentElement.removeChild(streakElement);
                }
            }, 300);
        }, 4000);
    }
    
    async checkStreakAchievements(userId, streak) {
        if (streak >= 3) {
            await tursoSync.awardAchievement(userId, 'streak_3');
        }
        if (streak >= 7) {
            await tursoSync.awardAchievement(userId, 'streak_7');
        }
        if (streak >= 14) {
            await tursoSync.awardAchievement(userId, 'streak_14');
        }
    }
    
    async checkMasteryAchievements(userId, topicId) {
        const topic = LawContentHelper.getTopicById(topicId);
        if (!topic) return;
        
        const userProgress = tursoSync.getUserProgress(userId);
        
        // Check subject mastery
        const subjectTopics = LawContentHelper.getAllTopics(topic.subject);
        const masteredTopics = subjectTopics.filter(t => {
            const progress = userProgress[t.id];
            return progress && progress.masteryLevel >= 4;
        });
        
        if (masteredTopics.length === subjectTopics.length) {
            const achievementId = `${topic.subject}_master`;
            await tursoSync.awardAchievement(userId, achievementId);
            await this.awardPoints(userId, 'subject_mastery', 200);
        }
    }
    
    async checkStudyAchievements(userId) {
        const userProgress = tursoSync.getUserProgress(userId);
        const studiedTopics = Object.keys(userProgress).length;
        
        // First topic achievement
        if (studiedTopics === 1) {
            await tursoSync.awardAchievement(userId, 'first_topic');
        }
        
        // Check time-based achievements
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 22 || hour <= 2) { // 10 PM to 2 AM
            await tursoSync.awardAchievement(userId, 'night_owl');
        }
        
        if (hour >= 5 && hour <= 7) { // 5 AM to 7 AM
            await tursoSync.awardAchievement(userId, 'early_bird');
        }
        
        const dayOfWeek = now.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
            await tursoSync.awardAchievement(userId, 'weekend_warrior');
        }
    }
    
    showAchievementAnimation(achievement) {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement-popup';
        achievementElement.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-header">
                    <div class="achievement-badge">🎖️</div>
                    <div class="achievement-title">Achievement Unlocked!</div>
                </div>
                <div class="achievement-details">
                    <div class="achievement-icon">${ACHIEVEMENTS[achievement.achievementId]?.icon || '🏆'}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${achievement.title}</div>
                        <div class="achievement-desc">${achievement.description}</div>
                        <div class="achievement-points">+${achievement.points} points</div>
                    </div>
                </div>
            </div>
        `;
        
        // Style the popup
        Object.assign(achievementElement.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0)',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            zIndex: '1003',
            maxWidth: '400px',
            textAlign: 'center',
            animation: 'achievementPop 3s ease-out forwards'
        });
        
        // Add achievement animation CSS
        if (!document.getElementById('achievement-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-animation-styles';
            style.textContent = `
                @keyframes achievementPop {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0);
                    }
                    15% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    20% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    85% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(achievementElement);
        
        // Play achievement sound (if available)
        this.playAchievementSound();
        
        // Remove after animation
        setTimeout(() => {
            if (achievementElement.parentElement) {
                achievementElement.parentElement.removeChild(achievementElement);
            }
        }, 3000);
    }
    
    playAchievementSound() {
        // Create achievement sound if Web Audio API is available
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const audioContext = new (AudioContext || webkitAudioContext)();
                
                // Create a simple achievement sound
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (error) {
                console.log('Could not play achievement sound:', error);
            }
        }
    }
    
    checkDailyStreaks() {
        // Check if user's streak should be broken due to missing yesterday
        const users = ['dylan', 'katelyn'];
        
        users.forEach(userId => {
            const userData = tursoSync.getUserData(userId);
            if (!userData.lastStudied) return;
            
            const lastStudied = new Date(userData.lastStudied);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(23, 59, 59, 999); // End of yesterday
            
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            twoDaysAgo.setHours(0, 0, 0, 0); // Start of two days ago
            
            // If last studied was before yesterday and user had a streak, break it
            if (lastStudied < twoDaysAgo && userData.streak > 0) {
                userData.streak = 0;
                console.log(`Streak broken for ${userId}`);
            }
        });
    }
    
    scheduleStreakCheck() {
        // Check streaks at midnight every day
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            this.checkDailyStreaks();
            
            // Set up daily interval
            setInterval(() => {
                this.checkDailyStreaks();
            }, 24 * 60 * 60 * 1000); // 24 hours
        }, msUntilMidnight);
    }
    
    // Calculate user level based on points
    calculateLevel(points) {
        // Level progression: 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500...
        let level = 1;
        let totalRequired = 0;
        let levelRequirement = 100;
        
        while (totalRequired + levelRequirement <= points) {
            totalRequired += levelRequirement;
            level++;
            levelRequirement += 100; // Each level requires 100 more points than the previous
        }
        
        const currentLevelProgress = points - totalRequired;
        const nextLevelRequirement = levelRequirement;
        const progressPercent = (currentLevelProgress / nextLevelRequirement) * 100;
        
        return {
            level,
            currentLevelProgress,
            nextLevelRequirement,
            progressPercent,
            totalPoints: points
        };
    }
    
    // Get user's rank compared to partner
    getUserRank(userId) {
        const dylanData = tursoSync.getUserData('dylan');
        const katelynData = tursoSync.getUserData('katelyn');
        
        const users = [
            { id: 'dylan', ...dylanData },
            { id: 'katelyn', ...katelynData }
        ];
        
        users.sort((a, b) => b.points - a.points);
        
        const userRank = users.findIndex(u => u.id === userId) + 1;
        return {
            rank: userRank,
            total: users.length,
            users: users
        };
    }
    
    // Get study statistics
    getStudyStats(userId) {
        const userProgress = tursoSync.getUserProgress(userId);
        const userData = tursoSync.getUserData(userId);
        const achievements = tursoSync.getUserAchievements(userId);
        
        const topicsStudied = Object.keys(userProgress).length;
        const topicsMastered = Object.values(userProgress).filter(p => p.masteryLevel >= 4).length;
        const totalStudyTime = Object.values(userProgress).reduce((total, p) => total + (p.timeSpent || 0), 0);
        const averageConfidence = topicsStudied > 0 ? 
            Object.values(userProgress).reduce((total, p) => total + (p.confidence || 1), 0) / topicsStudied : 0;
        
        return {
            points: userData.points,
            streak: userData.streak,
            level: this.calculateLevel(userData.points),
            topicsStudied,
            topicsMastered,
            totalStudyTime,
            averageConfidence: Math.round(averageConfidence * 100) / 100,
            achievementsEarned: achievements.length,
            rank: this.getUserRank(userId)
        };
    }
    
    // Get motivational message based on progress
    getMotivationalMessage(userId) {
        const stats = this.getStudyStats(userId);
        const partner = userId === 'dylan' ? 'katelyn' : 'dylan';
        const partnerStats = this.getStudyStats(partner);
        
        const messages = [];
        
        // Streak messages
        if (stats.streak === 0) {
            messages.push("Start your study streak today! 🔥");
        } else if (stats.streak < 3) {
            messages.push(`Great start! Keep your ${stats.streak}-day streak going! 🌟`);
        } else if (stats.streak < 7) {
            messages.push(`Amazing ${stats.streak}-day streak! You're on fire! 🔥`);
        } else {
            messages.push(`Incredible ${stats.streak}-day streak! You're unstoppable! 💪`);
        }
        
        // Competition messages
        const pointDiff = stats.points - partnerStats.points;
        if (pointDiff > 50) {
            messages.push(`You're ahead by ${pointDiff} points! Keep it up! 🏆`);
        } else if (pointDiff < -50) {
            messages.push(`You're ${Math.abs(pointDiff)} points behind. Time to catch up! 🚀`);
        } else {
            messages.push("It's a close race! Every study session counts! ⚔️");
        }
        
        // Progress messages
        if (stats.topicsMastered < 5) {
            messages.push("Master your first 5 topics to unlock special achievements! 🎯");
        } else if (stats.topicsMastered < 20) {
            messages.push(`${stats.topicsMastered} topics mastered! You're building expertise! 📚`);
        } else {
            messages.push(`${stats.topicsMastered} topics mastered! You're becoming a law expert! ⚖️`);
        }
        
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    // Clean up
    cleanup() {
        // Clean up any intervals or event listeners
    }
}

// Create global gamification instance
const gamification = new Gamification();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gamification;
}