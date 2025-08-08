// Partnership Features - Dylan & Katelyn collaboration functions

class Partnership {
    constructor() {
        this.studyTogetherActive = false;
        this.partnerActivity = null;
        this.activityCheckInterval = null;
        
        this.init();
    }
    
    init() {
        this.startActivityMonitoring();
    }
    
    // Start monitoring partner activity
    startActivityMonitoring() {
        // Check partner activity every 30 seconds
        this.activityCheckInterval = setInterval(() => {
            this.checkPartnerActivity();
        }, 30000);
        
        // Initial check
        this.checkPartnerActivity();
    }
    
    // Check what partner is doing
    checkPartnerActivity() {
        // Wait for app to be initialized
        if (typeof app === 'undefined' || !app.currentUser) {
            return;
        }
        
        const currentUser = app.currentUser;
        const partner = currentUser === 'dylan' ? 'katelyn' : 'dylan';
        const partnerData = tursoSync.getUserData(partner);
        
        if (!partnerData || !partnerData.lastStudied) {
            this.updatePartnerStatus(partner, 'offline', 'Never studied');
            return;
        }
        
        const lastActivity = new Date(partnerData.lastStudied);
        const now = new Date();
        const diffMinutes = (now - lastActivity) / (1000 * 60);
        
        let status, activity;
        
        if (diffMinutes < 5) {
            status = 'studying';
            activity = 'Currently studying';
            this.checkStudyTogether(partner);
        } else if (diffMinutes < 60) {
            status = 'online';
            activity = `Active ${Math.floor(diffMinutes)}m ago`;
        } else if (diffMinutes < 1440) { // 24 hours
            status = 'offline';
            activity = `Last studied ${Math.floor(diffMinutes / 60)}h ago`;
        } else {
            status = 'offline';
            activity = `Last studied ${Math.floor(diffMinutes / 1440)} days ago`;
        }
        
        this.updatePartnerStatus(partner, status, activity);
    }
    
    // Update partner status in UI
    updatePartnerStatus(partner, status, activity) {
        const statusEl = document.getElementById(`${partner}-status`);
        const activityEl = document.getElementById(`${partner}-activity`);
        
        if (statusEl) {
            statusEl.textContent = status;
            statusEl.className = `status-indicator ${status}`;
        }
        
        if (activityEl) {
            activityEl.textContent = activity;
        }
        
        // Update study together button
        this.updateStudyTogetherButton(status);
    }
    
    // Update study together button based on partner status
    updateStudyTogetherButton(partnerStatus) {
        const button = document.getElementById('study-together-btn');
        if (!button) return;
        
        switch (partnerStatus) {
            case 'studying':
                button.textContent = '👥 Join Study Session';
                button.classList.remove('disabled');
                button.disabled = false;
                break;
            case 'online':
                button.textContent = '👥 Invite to Study';
                button.classList.remove('disabled');
                button.disabled = false;
                break;
            case 'offline':
                button.textContent = '👥 Partner Offline';
                button.classList.add('disabled');
                button.disabled = true;
                break;
        }
    }
    
    // Check if partner wants to study together
    checkStudyTogether(partner) {
        // This would check for study together requests in the database
        // For now, we'll just show a notification if both are studying at the same time
        const currentUser = app.currentUser;
        const currentData = tursoSync.getUserData(currentUser);
        
        if (currentData && currentData.lastStudied) {
            const currentLastStudy = new Date(currentData.lastStudied);
            const now = new Date();
            const currentDiffMinutes = (now - currentLastStudy) / (1000 * 60);
            
            // If both users studied within the last 5 minutes, suggest studying together
            if (currentDiffMinutes < 5 && !this.studyTogetherActive) {
                this.suggestStudyTogether(partner);
            }
        }
    }
    
    // Suggest studying together
    suggestStudyTogether(partner) {
        const partnerName = partner.charAt(0).toUpperCase() + partner.slice(1);
        
        // Create a study together notification
        this.showStudyTogetherNotification(
            `${partnerName} is also studying! Want to study together?`,
            () => this.startStudyTogether(partner)
        );
    }
    
    // Show study together notification
    showStudyTogetherNotification(message, callback) {
        const notification = document.createElement('div');
        notification.className = 'study-together-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                <div class="notification-actions">
                    <button class="btn-primary" onclick="this.parentElement.parentElement.parentElement.remove(); (${callback})()">
                        Yes, let's study!
                    </button>
                    <button class="btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Not now
                    </button>
                </div>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: 'white',
            border: '2px solid var(--primary-color)',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: '1001',
            maxWidth: '300px',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.parentElement.removeChild(notification);
                    }
                }, 300);
            }
        }, 10000);
    }
    
    // Start study together session
    async startStudyTogether(partner) {
        this.studyTogetherActive = true;
        const partnerName = partner.charAt(0).toUpperCase() + partner.slice(1);
        
        // Record study together session
        await this.recordStudyTogetherSession(app.currentUser, partner);
        
        // Show study together interface
        this.showStudyTogetherInterface(partnerName);
        
        // Award study buddy achievement if this is the 5th session
        await this.checkStudyBuddyAchievement();
        
        app.showNotification(`Started study session with ${partnerName}! 👥`);
    }
    
    // Record study together session
    async recordStudyTogetherSession(user1, user2) {
        const sessionId = `study_together_${Date.now()}`;
        const sessionData = {
            id: sessionId,
            user1: user1 + '_001',
            user2: user2 + '_001',
            startTime: new Date().toISOString(),
            endTime: null,
            topicsStudied: [],
            duration: 0
        };
        
        // Store in local storage for now
        const studyData = JSON.parse(localStorage.getItem('lawStudyData'));
        if (!studyData.studyTogetherSessions) {
            studyData.studyTogetherSessions = [];
        }
        studyData.studyTogetherSessions.push(sessionData);
        localStorage.setItem('lawStudyData', JSON.stringify(studyData));
    }
    
    // Show study together interface
    showStudyTogetherInterface(partnerName) {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        modalTitle.textContent = `📚 Studying with ${partnerName}`;
        modalBody.innerHTML = `
            <div class="study-together-interface">
                <div class="session-info">
                    <h3>👥 Study Together Session Active</h3>
                    <p>You and ${partnerName} are studying together!</p>
                    <div class="session-timer">
                        <span id="session-duration">00:00</span>
                    </div>
                </div>
                
                <div class="partner-activity">
                    <h4>${partnerName}'s Activity</h4>
                    <div class="activity-feed" id="partner-activity-feed">
                        <div class="activity-item">
                            <span class="activity-time">Just now</span>
                            <span class="activity-text">${partnerName} joined the session</span>
                        </div>
                    </div>
                </div>
                
                <div class="study-options">
                    <h4>Study Together Options</h4>
                    <button class="study-option-btn" onclick="partnership.startSyncedStudy('flashcards')">
                        🗂️ Sync Flashcards
                    </button>
                    <button class="study-option-btn" onclick="partnership.startCompetitiveQuiz()">
                        🏆 Competitive Quiz
                    </button>
                    <button class="study-option-btn" onclick="partnership.startCollaborativeReview()">
                        📝 Collaborative Review
                    </button>
                </div>
                
                <div class="session-actions">
                    <button class="btn-secondary" onclick="partnership.endStudyTogether()">
                        End Session
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Start session timer
        this.startSessionTimer();
    }
    
    // Start session timer
    startSessionTimer() {
        const timerEl = document.getElementById('session-duration');
        if (!timerEl) return;
        
        const startTime = new Date();
        
        this.sessionTimer = setInterval(() => {
            const now = new Date();
            const duration = Math.floor((now - startTime) / 1000);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    // Start synced study
    startSyncedStudy(mode) {
        app.showNotification(`Starting synced ${mode} session!`);
        // TODO: Implement synced study modes
    }
    
    // Start competitive quiz
    startCompetitiveQuiz() {
        app.showNotification('Starting competitive quiz!');
        // TODO: Implement competitive quiz
    }
    
    // Start collaborative review
    startCollaborativeReview() {
        app.showNotification('Starting collaborative review!');
        // TODO: Implement collaborative review
    }
    
    // End study together session
    endStudyTogether() {
        this.studyTogetherActive = false;
        
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        
        // Close modal
        const modal = document.getElementById('study-modal');
        modal?.classList.remove('active');
        
        // Record session end
        this.recordSessionEnd();
        
        app.showNotification('Study together session ended!');
    }
    
    // Record session end
    recordSessionEnd() {
        const studyData = JSON.parse(localStorage.getItem('lawStudyData'));
        if (studyData.studyTogetherSessions && studyData.studyTogetherSessions.length > 0) {
            const lastSession = studyData.studyTogetherSessions[studyData.studyTogetherSessions.length - 1];
            if (!lastSession.endTime) {
                lastSession.endTime = new Date().toISOString();
                const startTime = new Date(lastSession.startTime);
                const endTime = new Date(lastSession.endTime);
                lastSession.duration = Math.floor((endTime - startTime) / (1000 * 60)); // Duration in minutes
                
                localStorage.setItem('lawStudyData', JSON.stringify(studyData));
            }
        }
    }
    
    // Check for study buddy achievement
    async checkStudyBuddyAchievement() {
        const studyData = JSON.parse(localStorage.getItem('lawStudyData'));
        const sessions = studyData.studyTogetherSessions || [];
        const userSessions = sessions.filter(s => 
            s.user1.includes(app.currentUser) || s.user2.includes(app.currentUser)
        );
        
        if (userSessions.length >= 5) {
            await tursoSync.awardAchievement(app.currentUser, 'study_buddy');
        }
    }
    
    // Get partnership statistics
    getPartnershipStats() {
        const studyData = JSON.parse(localStorage.getItem('lawStudyData'));
        const sessions = studyData.studyTogetherSessions || [];
        
        const totalSessions = sessions.length;
        const totalDuration = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);
        const averageDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
        
        return {
            totalSessions,
            totalDuration,
            averageDuration,
            lastSession: sessions.length > 0 ? sessions[sessions.length - 1].startTime : null
        };
    }
    
    // Create study challenge between partners
    async createPartnerChallenge(type, description, targetValue, deadline) {
        const currentUser = app.currentUser;
        const partner = currentUser === 'dylan' ? 'katelyn' : 'dylan';
        
        return await tursoSync.createChallenge(currentUser, partner, type, description, targetValue, deadline);
    }
    
    // Send study encouragement to partner
    sendEncouragement(message) {
        const partner = app.currentUser === 'dylan' ? 'katelyn' : 'dylan';
        const partnerName = partner.charAt(0).toUpperCase() + partner.slice(1);
        
        // For now, just show a notification
        // In a real implementation, this would send a message through the database
        app.showNotification(`Encouragement sent to ${partnerName}!`);
        
        // Could store in database for real-time messaging
        const encouragementData = {
            from: app.currentUser,
            to: partner,
            message: message,
            timestamp: new Date().toISOString(),
            type: 'encouragement'
        };
        
        console.log('Encouragement sent:', encouragementData);
    }
    
    // Compare progress with partner
    compareProgress() {
        const currentUser = app.currentUser;
        const partner = currentUser === 'dylan' ? 'katelyn' : 'dylan';
        
        const currentProgress = tursoSync.getUserProgress(currentUser);
        const partnerProgress = tursoSync.getUserProgress(partner);
        
        const currentData = tursoSync.getUserData(currentUser);
        const partnerData = tursoSync.getUserData(partner);
        
        return {
            points: {
                current: currentData.points,
                partner: partnerData.points,
                difference: currentData.points - partnerData.points
            },
            streak: {
                current: currentData.streak,
                partner: partnerData.streak,
                difference: currentData.streak - partnerData.streak
            },
            topicsStudied: {
                current: Object.keys(currentProgress).length,
                partner: Object.keys(partnerProgress).length,
                difference: Object.keys(currentProgress).length - Object.keys(partnerProgress).length
            }
        };
    }
    
    // Cleanup when app closes
    cleanup() {
        if (this.activityCheckInterval) {
            clearInterval(this.activityCheckInterval);
        }
        
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        
        if (this.studyTogetherActive) {
            this.endStudyTogether();
        }
    }
}

// Create global partnership instance after DOM is loaded
let partnership;

// Wait for DOM to be ready and app to be initialized
function initializePartnership() {
    if (typeof app !== 'undefined' && app.currentUser) {
        partnership = new Partnership();
    } else {
        // Retry after a short delay
        setTimeout(initializePartnership, 100);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePartnership);
} else {
    initializePartnership();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Partnership;
}