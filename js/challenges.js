// Challenges System - Competition features for Dylan & Katelyn

class ChallengeSystem {
    constructor() {
        this.activeChallenges = [];
        this.challengeTypes = {
            weekly_topics: {
                name: 'Weekly Topics Race',
                description: 'Who can master more topics this week?',
                icon: '🏃‍♂️',
                defaultTarget: 10,
                unit: 'topics'
            },
            study_streak: {
                name: 'Study Streak Challenge',
                description: 'Maintain the longest study streak',
                icon: '🔥',
                defaultTarget: 7,
                unit: 'days'
            },
            subject_mastery: {
                name: 'Subject Mastery Race',
                description: 'First to master an entire subject',
                icon: '🎓',
                defaultTarget: 1,
                unit: 'subject'
            },
            study_time: {
                name: 'Study Time Challenge',
                description: 'Who can study more hours this week?',
                icon: '⏰',
                defaultTarget: 300,
                unit: 'minutes'
            },
            flashcard_speed: {
                name: 'Flashcard Speed Run',
                description: 'Complete flashcards the fastest',
                icon: '⚡',
                defaultTarget: 50,
                unit: 'cards'
            },
            irac_master: {
                name: 'IRAC Mastery Challenge',
                description: 'Write the most IRAC essays',
                icon: '📝',
                defaultTarget: 10,
                unit: 'essays'
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadChallenges();
        this.setupEventListeners();
        this.startChallengeMonitoring();
    }
    
    loadChallenges() {
        this.activeChallenges = tursoSync.getChallenges();
    }
    
    setupEventListeners() {
        // Challenge type selection
        const challengeTypeSelect = document.getElementById('challenge-type');
        challengeTypeSelect?.addEventListener('change', (e) => {
            this.updateChallengeForm(e.target.value);
        });
        
        // Challenge form submission
        const challengeForm = document.getElementById('challenge-form');
        challengeForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleChallengeSubmission();
        });
    }
    
    updateChallengeForm(challengeType) {
        const descriptionField = document.getElementById('challenge-description');
        const challengeInfo = this.challengeTypes[challengeType];
        
        if (challengeInfo && descriptionField) {
            descriptionField.placeholder = challengeInfo.description;
            descriptionField.value = challengeInfo.description;
        }
    }
    
    async handleChallengeSubmission() {
        const type = document.getElementById('challenge-type')?.value;
        const description = document.getElementById('challenge-description')?.value;
        const deadline = document.getElementById('challenge-deadline')?.value;
        
        if (!type || !description || !deadline) {
            app.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        const challengeInfo = this.challengeTypes[type];
        const targetValue = challengeInfo?.defaultTarget || 1;
        
        try {
            const challenge = await this.createChallenge(type, description, targetValue, deadline);
            
            // Close modal
            document.getElementById('challenge-modal')?.classList.remove('active');
            
            // Reset form
            document.getElementById('challenge-form')?.reset();
            
            // Show success
            app.showNotification('Challenge created successfully! 🏆');
            
            // Update UI if on challenges tab
            if (app.currentTab === 'challenges') {
                app.loadChallengesTab();
            }
            
        } catch (error) {
            console.error('Failed to create challenge:', error);
            app.showNotification('Failed to create challenge', 'error');
        }
    }
    
    async createChallenge(type, description, targetValue, deadline) {
        const currentUser = app.currentUser;
        const partner = currentUser === 'dylan' ? 'katelyn' : 'dylan';
        
        const challenge = await tursoSync.createChallenge(
            currentUser, 
            partner, 
            type, 
            description, 
            targetValue, 
            deadline
        );
        
        // Add to local challenges array
        this.activeChallenges.push(challenge);
        
        // Send notification to partner
        this.notifyPartnerOfChallenge(challenge, partner);
        
        return challenge;
    }
    
    notifyPartnerOfChallenge(challenge, partner) {
        const partnerName = partner.charAt(0).toUpperCase() + partner.slice(1);
        const challengeType = this.challengeTypes[challenge.type];
        
        // In a real app, this would send a notification through the database
        // For now, we'll just log it
        console.log(`Challenge notification sent to ${partnerName}:`, {
            type: challenge.type,
            description: challenge.description,
            icon: challengeType?.icon || '🏆'
        });
    }
    
    startChallengeMonitoring() {
        // Check challenge progress every minute
        setInterval(() => {
            this.updateChallengeProgress();
            this.checkChallengeCompletions();
        }, 60000);
        
        // Initial check
        this.updateChallengeProgress();
    }
    
    updateChallengeProgress() {
        this.activeChallenges.forEach(challenge => {
            if (challenge.status === 'active') {
                const progress = this.calculateChallengeProgress(challenge);
                challenge.progress = progress;
                
                // Check if challenge should be marked as completed
                if (progress.current >= challenge.targetValue || progress.partner >= challenge.targetValue) {
                    this.completeChallenge(challenge, progress);
                }
            }
        });
    }
    
    calculateChallengeProgress(challenge) {
        const currentUser = app.currentUser;
        const partner = currentUser === 'dylan' ? 'katelyn' : 'dylan';
        
        const currentProgress = tursoSync.getUserProgress(currentUser);
        const partnerProgress = tursoSync.getUserProgress(partner);
        
        const currentData = tursoSync.getUserData(currentUser);
        const partnerData = tursoSync.getUserData(partner);
        
        let currentValue = 0;
        let partnerValue = 0;
        
        switch (challenge.type) {
            case 'weekly_topics':
                // Count topics studied this week
                currentValue = this.getWeeklyTopicsCount(currentProgress);
                partnerValue = this.getWeeklyTopicsCount(partnerProgress);
                break;
                
            case 'study_streak':
                currentValue = currentData.streak;
                partnerValue = partnerData.streak;
                break;
                
            case 'subject_mastery':
                currentValue = this.getSubjectMasteryCount(currentProgress);
                partnerValue = this.getSubjectMasteryCount(partnerProgress);
                break;
                
            case 'study_time':
                currentValue = this.getWeeklyStudyTime(currentProgress);
                partnerValue = this.getWeeklyStudyTime(partnerProgress);
                break;
                
            case 'flashcard_speed':
                currentValue = this.getFlashcardCount(currentProgress);
                partnerValue = this.getFlashcardCount(partnerProgress);
                break;
                
            case 'irac_master':
                currentValue = this.getIracCount(currentProgress);
                partnerValue = this.getIracCount(partnerProgress);
                break;
        }
        
        return {
            current: currentValue,
            partner: partnerValue,
            target: challenge.targetValue,
            currentPercent: Math.min(100, (currentValue / challenge.targetValue) * 100),
            partnerPercent: Math.min(100, (partnerValue / challenge.targetValue) * 100)
        };
    }
    
    getWeeklyTopicsCount(progress) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return Object.values(progress).filter(p => {
            if (!p.lastStudied) return false;
            return new Date(p.lastStudied) > oneWeekAgo;
        }).length;
    }
    
    getSubjectMasteryCount(progress) {
        const subjects = ['contracts', 'torts', 'criminal'];
        let masteredSubjects = 0;
        
        subjects.forEach(subject => {
            const allTopics = LawContentHelper.getAllTopics(subject);
            const masteredTopics = allTopics.filter(topic => {
                const topicProgress = progress[topic.id];
                return topicProgress && topicProgress.masteryLevel >= 4;
            });
            
            if (masteredTopics.length === allTopics.length) {
                masteredSubjects++;
            }
        });
        
        return masteredSubjects;
    }
    
    getWeeklyStudyTime(progress) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return Object.values(progress).reduce((total, p) => {
            if (!p.lastStudied || new Date(p.lastStudied) <= oneWeekAgo) return total;
            return total + (p.timeSpent || 0);
        }, 0);
    }
    
    getFlashcardCount(progress) {
        // This would track flashcard sessions
        // For now, use study count as proxy
        return Object.values(progress).reduce((total, p) => total + (p.studyCount || 0), 0);
    }
    
    getIracCount(progress) {
        // This would track IRAC essays written
        // For now, return 0 as placeholder
        return 0;
    }
    
    async completeChallenge(challenge, progress) {
        // Determine winner
        let winnerId;
        if (progress.current > progress.partner) {
            winnerId = app.currentUser + '_001';
        } else if (progress.partner > progress.current) {
            const partner = app.currentUser === 'dylan' ? 'katelyn' : 'dylan';
            winnerId = partner + '_001';
        } else {
            winnerId = null; // Tie
        }
        
        // Update challenge status
        challenge.status = 'completed';
        challenge.winnerId = winnerId;
        challenge.completedAt = new Date().toISOString();
        
        // Award points to winner
        if (winnerId) {
            const winnerUserId = winnerId.replace('_001', '');
            await this.awardChallengePoints(winnerUserId, challenge);
        }
        
        // Show completion notification
        this.showChallengeCompletion(challenge, winnerId, progress);
        
        // Sync updated challenge
        await tursoSync.syncData();
    }
    
    async awardChallengePoints(userId, challenge) {
        const challengeInfo = this.challengeTypes[challenge.type];
        const basePoints = 100;
        let bonusPoints = 0;
        
        // Bonus points based on challenge type
        switch (challenge.type) {
            case 'subject_mastery':
                bonusPoints = 200;
                break;
            case 'study_streak':
                bonusPoints = challenge.targetValue * 10;
                break;
            case 'weekly_topics':
                bonusPoints = challenge.targetValue * 5;
                break;
            default:
                bonusPoints = 50;
        }
        
        const totalPoints = basePoints + bonusPoints;
        
        // Update user points
        const userData = tursoSync.getUserData(userId);
        userData.points += totalPoints;
        
        // Award achievement for winning challenges
        const userChallenges = this.activeChallenges.filter(c => 
            c.status === 'completed' && c.winnerId === userId + '_001'
        );
        
        if (userChallenges.length >= 3) {
            await tursoSync.awardAchievement(userId, 'challenge_champion');
        }
    }
    
    showChallengeCompletion(challenge, winnerId, progress) {
        const challengeInfo = this.challengeTypes[challenge.type];
        let message;
        
        if (!winnerId) {
            message = `🤝 Challenge "${challenge.description}" ended in a tie!`;
        } else {
            const winnerName = winnerId.includes('dylan') ? 'Dylan' : 'Katelyn';
            const currentUser = app.currentUser;
            const isWinner = winnerId.includes(currentUser);
            
            if (isWinner) {
                message = `🏆 You won the challenge "${challenge.description}"!`;
            } else {
                message = `${winnerName} won the challenge "${challenge.description}"`;
            }
        }
        
        // Show detailed completion modal
        this.showChallengeCompletionModal(challenge, winnerId, progress, message);
        
        // Also show notification
        app.showNotification(message);
    }
    
    showChallengeCompletionModal(challenge, winnerId, progress, message) {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        const challengeInfo = this.challengeTypes[challenge.type];
        const winnerName = winnerId ? (winnerId.includes('dylan') ? 'Dylan' : 'Katelyn') : 'Tie';
        
        modalTitle.textContent = 'Challenge Complete! 🏆';
        modalBody.innerHTML = `
            <div class="challenge-completion">
                <div class="completion-header">
                    <div class="challenge-icon">${challengeInfo?.icon || '🏆'}</div>
                    <h3>${challenge.description}</h3>
                    <p class="completion-message">${message}</p>
                </div>
                
                <div class="final-scores">
                    <h4>Final Scores</h4>
                    <div class="score-comparison">
                        <div class="score-item ${winnerId?.includes('dylan') ? 'winner' : ''}">
                            <div class="score-avatar dylan">D</div>
                            <div class="score-details">
                                <span class="score-name">Dylan</span>
                                <span class="score-value">${progress.current} ${challengeInfo?.unit || 'points'}</span>
                            </div>
                        </div>
                        
                        <div class="vs-separator">VS</div>
                        
                        <div class="score-item ${winnerId?.includes('katelyn') ? 'winner' : ''}">
                            <div class="score-avatar katelyn">K</div>
                            <div class="score-details">
                                <span class="score-name">Katelyn</span>
                                <span class="score-value">${progress.partner} ${challengeInfo?.unit || 'points'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="challenge-stats">
                    <h4>Challenge Details</h4>
                    <div class="stat-grid">
                        <div class="stat">
                            <span class="stat-label">Target</span>
                            <span class="stat-value">${challenge.targetValue} ${challengeInfo?.unit || 'points'}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Duration</span>
                            <span class="stat-value">${this.getChallengeDuration(challenge)}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Winner</span>
                            <span class="stat-value">${winnerName}</span>
                        </div>
                    </div>
                </div>
                
                <div class="completion-actions">
                    <button class="btn-primary" onclick="challenges.createRematchChallenge('${challenge.id}')">
                        🔄 Create Rematch
                    </button>
                    <button class="btn-secondary" onclick="app.closeStudyModal()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
    
    getChallengeDuration(challenge) {
        const start = new Date(challenge.createdAt);
        const end = new Date(challenge.completedAt || new Date());
        const durationMs = end - start;
        const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            return 'Less than 1 hour';
        }
    }
    
    async createRematchChallenge(originalChallengeId) {
        const originalChallenge = this.activeChallenges.find(c => c.id === originalChallengeId);
        if (!originalChallenge) return;
        
        // Create new challenge with same parameters
        const newDeadline = new Date();
        newDeadline.setDate(newDeadline.getDate() + 7); // 1 week from now
        
        await this.createChallenge(
            originalChallenge.type,
            `Rematch: ${originalChallenge.description}`,
            originalChallenge.targetValue,
            newDeadline.toISOString().split('T')[0]
        );
        
        app.showNotification('Rematch challenge created! 🔄');
        app.closeStudyModal();
    }
    
    checkChallengeCompletions() {
        // Check for expired challenges
        const now = new Date();
        
        this.activeChallenges.forEach(challenge => {
            if (challenge.status === 'active') {
                const deadline = new Date(challenge.deadline);
                
                if (now > deadline) {
                    // Challenge expired
                    const progress = this.calculateChallengeProgress(challenge);
                    this.completeChallengeByTimeout(challenge, progress);
                }
            }
        });
    }
    
    async completeChallengeByTimeout(challenge, progress) {
        // Similar to completeChallenge but for timeout
        let winnerId;
        if (progress.current > progress.partner) {
            winnerId = app.currentUser + '_001';
        } else if (progress.partner > progress.current) {
            const partner = app.currentUser === 'dylan' ? 'katelyn' : 'dylan';
            winnerId = partner + '_001';
        } else {
            winnerId = null; // Tie
        }
        
        challenge.status = 'expired';
        challenge.winnerId = winnerId;
        challenge.completedAt = new Date().toISOString();
        
        if (winnerId) {
            const winnerUserId = winnerId.replace('_001', '');
            await this.awardChallengePoints(winnerUserId, challenge);
        }
        
        // Show timeout notification
        const message = winnerId ? 
            `⏰ Challenge "${challenge.description}" expired. ${winnerId.includes(app.currentUser) ? 'You' : 'Your partner'} won!` :
            `⏰ Challenge "${challenge.description}" expired in a tie!`;
        
        app.showNotification(message);
        
        await tursoSync.syncData();
    }
    
    // Get challenge statistics
    getChallengeStats() {
        const completedChallenges = this.activeChallenges.filter(c => c.status === 'completed' || c.status === 'expired');
        const wonChallenges = completedChallenges.filter(c => c.winnerId?.includes(app.currentUser));
        
        return {
            total: this.activeChallenges.length,
            active: this.activeChallenges.filter(c => c.status === 'active').length,
            completed: completedChallenges.length,
            won: wonChallenges.length,
            winRate: completedChallenges.length > 0 ? Math.round((wonChallenges.length / completedChallenges.length) * 100) : 0
        };
    }
    
    // Get leaderboard data
    getLeaderboard() {
        const dylanData = tursoSync.getUserData('dylan');
        const katelynData = tursoSync.getUserData('katelyn');
        
        const dylanChallenges = this.activeChallenges.filter(c => c.winnerId?.includes('dylan')).length;
        const katelynChallenges = this.activeChallenges.filter(c => c.winnerId?.includes('katelyn')).length;
        
        const leaderboard = [
            {
                rank: 1,
                name: 'Dylan',
                id: 'dylan',
                points: dylanData.points,
                streak: dylanData.streak,
                challengesWon: dylanChallenges
            },
            {
                rank: 2,
                name: 'Katelyn',
                id: 'katelyn',
                points: katelynData.points,
                streak: katelynData.streak,
                challengesWon: katelynChallenges
            }
        ];
        
        // Sort by points
        leaderboard.sort((a, b) => b.points - a.points);
        
        // Update ranks
        leaderboard.forEach((entry, index) => {
            entry.rank = index + 1;
        });
        
        return leaderboard;
    }
    
    // Cleanup
    cleanup() {
        // Clean up any intervals or listeners
    }
}

// Create global challenges instance
const challenges = new ChallengeSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChallengeSystem;
}