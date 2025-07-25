// Main Application Logic for Dylan & Katelyn's Law Study Tool

class LawStudyApp {
    constructor() {
        this.currentUser = 'dylan';
        this.currentTab = 'subjects';
        this.studyModal = null;
        this.challengeModal = null;
        
        // Initialize app
        this.init();
    }
    
    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        // Initialize UI elements
        this.initializeElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize data
        this.loadUserData();
        
        // Set default tab to tree view
        this.switchTab('tree');
        
        // Update UI
        this.updateDashboard();
        
        // Start listening for updates
        this.listenForUpdates();
        
        console.log('Law Study App initialized');
    }
    
    initializeElements() {
        // User buttons
        this.dylanBtn = document.getElementById('dylan-btn');
        this.katelynBtn = document.getElementById('katelyn-btn');
        
        // Quick action buttons
        this.startStudyBtn = document.getElementById('start-study-btn');
        this.challengeBtn = document.getElementById('challenge-btn');
        this.studyTogetherBtn = document.getElementById('study-together-btn');
        
        // Tab buttons
        this.tabButtons = document.querySelectorAll('[data-tab]');
        this.tabContents = document.querySelectorAll('[id$="-tab"]');
        
        // Modals
        this.studyModal = document.getElementById('study-modal');
        this.challengeModal = document.getElementById('challenge-modal');
        
        // User stats elements
        this.dylanPoints = document.getElementById('dylan-points');
        this.dylanStreak = document.getElementById('dylan-streak');
        this.dylanStatus = document.getElementById('dylan-status');
        this.dylanActivity = document.getElementById('dylan-activity');
        
        this.katelynPoints = document.getElementById('katelyn-points');
        this.katelynStreak = document.getElementById('katelyn-streak');
        this.katelynStatus = document.getElementById('katelyn-status');
        this.katelynActivity = document.getElementById('katelyn-activity');
    }
    
    setupEventListeners() {
        // User switching
        this.dylanBtn?.addEventListener('click', () => this.switchUser('dylan'));
        this.katelynBtn?.addEventListener('click', () => this.switchUser('katelyn'));
        
        // Quick actions
        this.startStudyBtn?.addEventListener('click', () => this.startStudySession());
        this.challengeBtn?.addEventListener('click', () => this.openChallengeModal());
        this.studyTogetherBtn?.addEventListener('click', () => this.initiateStudyTogether());
        
        // Tab navigation
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });
        
        // Subject study buttons
        document.querySelectorAll('[data-subject]').forEach(btn => {
            if (btn.tagName === 'BUTTON') {
                btn.addEventListener('click', (e) => {
                    const subject = e.target.dataset.subject;
                    this.openStudyModal(subject);
                });
            }
        });
        
        // Modal close buttons
        document.getElementById('close-study-modal')?.addEventListener('click', (e) => {
            const modal = document.getElementById('study-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
        
        // Challenge form
        const challengeForm = document.getElementById('challenge-form');
        challengeForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createChallenge();
        });
        
        // Close modals on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.remove('active');
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    switchUser(userId) {
        this.currentUser = userId;
        tursoSync.setCurrentUser(userId);
        
        // Update UI
        this.dylanBtn?.classList.toggle('active', userId === 'dylan');
        this.katelynBtn?.classList.toggle('active', userId === 'katelyn');
        
        // Reload data for new user
        this.loadUserData();
        this.updateDashboard();
    }
    
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons - law book spines
        this.tabButtons.forEach(btn => {
            if (btn.dataset.tab === tabName) {
                btn.classList.add('bg-law-navy', 'shadow-lg');
                btn.classList.remove('hover:shadow-lg');
            } else {
                btn.classList.remove('bg-law-navy', 'shadow-lg');
                btn.classList.add('hover:shadow-lg');
            }
        });
        
        // Update tab content
        this.tabContents.forEach(content => {
            if (content.id === `${tabName}-tab`) {
                content.classList.remove('hidden');
                content.classList.add('block');
            } else {
                content.classList.add('hidden');
                content.classList.remove('block');
            }
        });
        
        // Load tab-specific data
        this.loadTabContent(tabName);
    }
    
    loadUserData() {
        // Get current user data
        const userData = tursoSync.getUserData(this.currentUser);
        const progress = tursoSync.getUserProgress(this.currentUser);
        const achievements = tursoSync.getUserAchievements(this.currentUser);
        
        this.userData = userData;
        this.userProgress = progress;
        this.userAchievements = achievements;
    }
    
    updateDashboard() {
        // Update both users' stats
        this.updateUserStats();
        
        // Update subject progress
        this.updateSubjectProgress();
        
        // Update other dashboard elements
        this.updateQuickActions();
    }
    
    updateUserStats() {
        const dylanData = tursoSync.getUserData('dylan');
        const katelynData = tursoSync.getUserData('katelyn');
        
        // Dylan stats
        if (this.dylanPoints) this.dylanPoints.textContent = dylanData.points;
        if (this.dylanStreak) this.dylanStreak.textContent = dylanData.streak;
        if (this.dylanStatus) {
            this.dylanStatus.textContent = this.getUserStatus('dylan');
            this.dylanStatus.className = `status-indicator ${this.getUserStatus('dylan')}`;
        }
        if (this.dylanActivity) {
            this.dylanActivity.textContent = this.formatLastActivity(dylanData.lastStudied);
        }
        
        // Katelyn stats
        if (this.katelynPoints) this.katelynPoints.textContent = katelynData.points;
        if (this.katelynStreak) this.katelynStreak.textContent = katelynData.streak;
        if (this.katelynStatus) {
            this.katelynStatus.textContent = this.getUserStatus('katelyn');
            this.katelynStatus.className = `status-indicator ${this.getUserStatus('katelyn')}`;
        }
        if (this.katelynActivity) {
            this.katelynActivity.textContent = this.formatLastActivity(katelynData.lastStudied);
        }
    }
    
    updateSubjectProgress() {
        ['contracts', 'torts', 'criminal'].forEach(subject => {
            const subjectData = LAW_CONTENT[subject];
            const allTopics = LawContentHelper.getAllTopics(subject);
            
            // Calculate mastery
            let masteredCount = 0;
            allTopics.forEach(topic => {
                const progress = this.userProgress[topic.id];
                if (progress && progress.masteryLevel >= 4) {
                    masteredCount++;
                }
            });
            
            const totalCount = allTopics.length;
            const percentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;
            
            // Update UI elements
            const masteredEl = document.getElementById(`${subject}-mastered`);
            const totalEl = document.getElementById(`${subject}-total`);
            const progressBar = document.querySelector(`[data-subject="${subject}"] .progress-fill`);
            const progressText = document.querySelector(`[data-subject="${subject}"] .progress-text`);
            
            if (masteredEl) masteredEl.textContent = masteredCount;
            if (totalEl) totalEl.textContent = totalCount;
            if (progressBar) progressBar.style.width = `${percentage}%`;
            if (progressText) progressText.textContent = `${percentage}% Complete`;
        });
    }
    
    updateQuickActions() {
        // Update study together button based on partner status
        const partnerStatus = this.getUserStatus(this.currentUser === 'dylan' ? 'katelyn' : 'dylan');
        if (this.studyTogetherBtn) {
            this.studyTogetherBtn.disabled = partnerStatus === 'offline';
            this.studyTogetherBtn.textContent = partnerStatus === 'studying' ? 
                '👥 Join Study Session' : '👥 Study Together';
        }
    }
    
    getUserStatus(userId) {
        const userData = tursoSync.getUserData(userId);
        if (!userData.lastStudied) return 'offline';
        
        const lastStudied = new Date(userData.lastStudied);
        const now = new Date();
        const diffMinutes = (now - lastStudied) / (1000 * 60);
        
        if (diffMinutes < 5) return 'studying';
        if (diffMinutes < 60) return 'online';
        return 'offline';
    }
    
    formatLastActivity(lastStudied) {
        if (!lastStudied) return 'Never';
        
        const date = new Date(lastStudied);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays} days ago`;
    }
    
    startStudySession() {
        // Mark user as studying
        const userData = tursoSync.getUserData(this.currentUser);
        userData.lastStudied = new Date().toISOString();
        
        // Show subject selection or open first incomplete topic
        this.openStudyModal();
    }
    
    openStudyModal(subject = null) {
        if (!this.studyModal) return;
        
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (subject) {
            modalTitle.textContent = `Study ${LAW_CONTENT[subject].name}`;
            modalBody.innerHTML = this.generateStudyContent(subject);
        } else {
            modalTitle.textContent = 'Choose Study Mode';
            modalBody.innerHTML = this.generateStudyModeSelection();
        }
        
        this.studyModal.classList.remove('hidden');
        this.studyModal.classList.add('flex');
    }
    
    generateStudyContent(subject) {
        const subjectData = LAW_CONTENT[subject];
        const topics = LawContentHelper.getAllTopics(subject);
        
        let html = `
            <div class="study-content">
                <div class="subject-info">
                    <h3>${subjectData.emoji} ${subjectData.name}</h3>
                    <p><strong>Mnemonic:</strong> ${subjectData.mnemonic}</p>
                </div>
                <div class="study-modes">
                    <button class="study-mode-btn" onclick="app.startFlashcards('${subject}')">
                        🗂️ Flashcards
                    </button>
                    <button class="study-mode-btn" onclick="app.startChecklistDrill('${subject}')">
                        ✅ Checklist Drill
                    </button>
                    <button class="study-mode-btn" onclick="app.startIracPractice('${subject}')">
                        📝 IRAC Practice
                    </button>
                </div>
                <div class="topic-list">
                    <h4>Topics to Study:</h4>
        `;
        
        topics.slice(0, 10).forEach(topic => {
            const progress = this.userProgress[topic.id] || { masteryLevel: 0 };
            const masteryClass = progress.masteryLevel >= 4 ? 'mastered' : 
                                progress.masteryLevel >= 2 ? 'learning' : 'new';
            
            html += `
                <div class="topic-item ${masteryClass}" onclick="app.studyTopic('${topic.id}')">
                    <span class="topic-title">${topic.title}</span>
                    <span class="mastery-indicator">${this.getMasteryIcon(progress.masteryLevel)}</span>
                </div>
            `;
        });
        
        html += `</div></div>`;
        return html;
    }
    
    generateStudyModeSelection() {
        return `
            <div class="study-mode-selection">
                <h3>Choose Your Study Focus</h3>
                <div class="subject-grid">
                    <button class="subject-study-btn" onclick="app.openStudyModal('contracts')">
                        📋 Study Contracts
                    </button>
                    <button class="subject-study-btn" onclick="app.openStudyModal('torts')">
                        ⚖️ Study Torts
                    </button>
                    <button class="subject-study-btn" onclick="app.openStudyModal('criminal')">
                        🚔 Study Criminal Law
                    </button>
                </div>
                <div class="quick-study">
                    <h4>Quick Study Options</h4>
                    <button class="quick-study-btn" onclick="app.startRandomReview()">
                        🎲 Random Topic Review
                    </button>
                    <button class="quick-study-btn" onclick="app.startWeakAreas()">
                        🎯 Focus on Weak Areas
                    </button>
                </div>
            </div>
        `;
    }
    
    getMasteryIcon(level) {
        const icons = ['❌', '🔴', '🟡', '🟢', '✅', '⭐'];
        return icons[level] || '❌';
    }
    
    async studyTopic(topicId) {
        const topic = LawContentHelper.getTopicById(topicId);
        if (!topic) return;
        
        // Update progress
        const currentProgress = this.userProgress[topicId] || {
            masteryLevel: 0,
            studyCount: 0,
            confidence: 1,
            timeSpent: 0
        };
        
        const updatedProgress = {
            ...currentProgress,
            studyCount: currentProgress.studyCount + 1,
            timeSpent: currentProgress.timeSpent + 10, // Assume 10 minutes
            masteryLevel: Math.min(currentProgress.masteryLevel + 1, 5)
        };
        
        // Save progress
        await tursoSync.updateProgress(this.currentUser, topicId, updatedProgress);
        
        // Check for achievements
        this.checkAchievements();
        
        // Show study result
        this.showStudyResult(topic, updatedProgress);
        
        // Update UI
        this.loadUserData();
        this.updateDashboard();
    }
    
    showStudyResult(topic, progress) {
        const modalBody = document.getElementById('study-modal-body');
        
        modalBody.innerHTML = `
            <div class="study-result">
                <h3>✅ Great Job!</h3>
                <p>You studied: <strong>${topic.title}</strong></p>
                <div class="progress-update">
                    <p>Mastery Level: ${progress.masteryLevel}/5 ${this.getMasteryIcon(progress.masteryLevel)}</p>
                    <p>Study Count: ${progress.studyCount}</p>
                    <p>Time Spent: ${progress.timeSpent} minutes</p>
                </div>
                <div class="topic-content">
                    <h4>Rule:</h4>
                    <p>${topic.rule}</p>
                    <h4>Elements:</h4>
                    <ul>
                        ${topic.elements.map(element => `<li>${element}</li>`).join('')}
                    </ul>
                    ${topic.mnemonic ? `<p><strong>Mnemonic:</strong> ${topic.mnemonic}</p>` : ''}
                </div>
                <div class="study-actions">
                    <button class="btn-primary" onclick="app.closeStudyModal()">Continue Studying</button>
                    <button class="btn-secondary" onclick="app.studyTopic('${topic.id}')">Review Again</button>
                </div>
            </div>
        `;
    }
    
    checkAchievements() {
        const userData = tursoSync.getUserData(this.currentUser);
        const progress = tursoSync.getUserProgress(this.currentUser);
        
        // Check for first topic achievement
        const studiedTopics = Object.keys(progress).length;
        if (studiedTopics === 1) {
            tursoSync.awardAchievement(this.currentUser, 'first_topic');
        }
        
        // Check for mastery achievements
        const contractsTopics = LawContentHelper.getAllTopics('contracts');
        const contractsMastery = contractsTopics.filter(t => progress[t.id]?.masteryLevel >= 4).length;
        if (contractsMastery === contractsTopics.length) {
            tursoSync.awardAchievement(this.currentUser, 'contracts_master');
        }
        
        // Check streak achievements
        if (userData.streak >= 3) {
            tursoSync.awardAchievement(this.currentUser, 'streak_3');
        }
        if (userData.streak >= 7) {
            tursoSync.awardAchievement(this.currentUser, 'streak_7');
        }
        if (userData.streak >= 14) {
            tursoSync.awardAchievement(this.currentUser, 'streak_14');
        }
    }
    
    closeStudyModal() {
        this.studyModal?.classList.remove('active');
    }
    
    openChallengeModal() {
        this.challengeModal?.classList.add('active');
        
        // Set default deadline to 1 week from now
        const deadline = document.getElementById('challenge-deadline');
        if (deadline) {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            deadline.value = nextWeek.toISOString().split('T')[0];
        }
    }
    
    async createChallenge() {
        const type = document.getElementById('challenge-type')?.value;
        const description = document.getElementById('challenge-description')?.value;
        const deadline = document.getElementById('challenge-deadline')?.value;
        
        if (!type || !description || !deadline) return;
        
        const challenger = this.currentUser;
        const challenged = challenger === 'dylan' ? 'katelyn' : 'dylan';
        const targetValue = this.getTargetValue(type);
        
        await tursoSync.createChallenge(challenger, challenged, type, description, targetValue, deadline);
        
        this.challengeModal?.classList.remove('active');
        
        // Reset form
        document.getElementById('challenge-form')?.reset();
        
        // Show success message
        this.showNotification(`Challenge sent to ${challenged.charAt(0).toUpperCase() + challenged.slice(1)}!`);
    }
    
    getTargetValue(type) {
        switch (type) {
            case 'weekly_topics': return 10;
            case 'study_streak': return 7;
            case 'subject_mastery': return 1;
            case 'study_time': return 300; // 5 hours in minutes
            default: return 1;
        }
    }
    
    loadTabContent(tabName) {
        switch (tabName) {
            case 'tree':
                this.loadTreeTab();
                break;
            case 'progress':
                this.loadProgressTab();
                break;
            case 'challenges':
                this.loadChallengesTab();
                break;
            case 'achievements':
                this.loadAchievementsTab();
                break;
        }
    }
    
    loadTreeTab() {
        const treeContainer = document.getElementById('tree-tab');
        if (!treeContainer || typeof lawTree === 'undefined') return;
        
        // Generate tree interface and populate the tab
        treeContainer.innerHTML = lawTree.generateTreeInterface();
        
        // Initialize tree state
        lawTree.initializeTreeState();
    }
    
    loadProgressTab() {
        this.loadWeeklyGoals();
        this.loadStudyCalendar();
    }
    
    loadWeeklyGoals() {
        const goalsContainer = document.getElementById('week1-goals');
        if (!goalsContainer) return;
        
        const goals = STUDY_SCHEDULE.week1.goals;
        const progress = this.userProgress;
        
        goalsContainer.innerHTML = goals.map(goal => {
            const completed = this.isGoalCompleted(goal, progress);
            return `
                <div class="goal-item ${completed ? 'completed' : ''}">
                    <div class="goal-checkbox">${completed ? '✓' : ''}</div>
                    <span class="goal-text">${goal.text}</span>
                    <span class="goal-points">+${goal.points} pts</span>
                </div>
            `;
        }).join('');
    }
    
    isGoalCompleted(goal, progress) {
        // Simple goal completion logic - can be expanded
        return false; // Placeholder
    }
    
    loadStudyCalendar() {
        const calendarContainer = document.getElementById('study-calendar');
        if (!calendarContainer) return;
        
        // Generate calendar for current month
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        
        let calendarHTML = '';
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(now.getFullYear(), now.getMonth(), day);
            const isToday = day === now.getDate();
            const hasStudied = this.hasStudiedOnDate(date);
            
            calendarHTML += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${hasStudied ? 'studied' : ''}">
                    ${day}
                </div>
            `;
        }
        
        calendarContainer.innerHTML = calendarHTML;
    }
    
    hasStudiedOnDate(date) {
        // Check if user studied on this date
        const userData = tursoSync.getUserData(this.currentUser);
        if (!userData.lastStudied) return false;
        
        const studyDate = new Date(userData.lastStudied);
        return studyDate.toDateString() === date.toDateString();
    }
    
    loadChallengesTab() {
        const challengesContainer = document.getElementById('active-challenges');
        if (!challengesContainer) return;
        
        const challenges = tursoSync.getChallenges();
        const userChallenges = challenges.filter(c => 
            c.challengerId.includes(this.currentUser) || c.challengedId.includes(this.currentUser)
        );
        
        if (userChallenges.length === 0) {
            challengesContainer.innerHTML = `
                <div class="no-challenges">
                    <p>No active challenges. Create one to compete with your study partner!</p>
                    <button class="btn-primary" onclick="app.openChallengeModal()">Create Challenge</button>
                </div>
            `;
            return;
        }
        
        challengesContainer.innerHTML = userChallenges.map(challenge => `
            <div class="challenge-item ${challenge.status}">
                <div class="challenge-header">
                    <span class="challenge-type">${challenge.type}</span>
                    <span class="challenge-status ${challenge.status}">${challenge.status}</span>
                </div>
                <h4 class="challenge-title">${challenge.description}</h4>
                <div class="challenge-footer">
                    <span class="challenge-deadline">Due: ${new Date(challenge.deadline).toLocaleDateString()}</span>
                    <div class="challenge-progress">
                        <div class="challenge-progress-bar">
                            <div class="challenge-progress-fill" style="width: 30%"></div>
                        </div>
                        <span class="challenge-progress-text">30%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    loadAchievementsTab() {
        const achievementsContainer = document.getElementById('achievements-list');
        if (!achievementsContainer) return;
        
        const userAchievements = tursoSync.getUserAchievements(this.currentUser);
        const earnedIds = userAchievements.map(a => a.achievementId);
        
        achievementsContainer.innerHTML = Object.values(ACHIEVEMENTS).map(achievement => {
            const earned = earnedIds.includes(achievement.id);
            return `
                <div class="achievement-badge ${earned ? 'earned' : 'locked'}">
                    <span class="achievement-icon">${achievement.icon}</span>
                    <h4 class="achievement-title">${achievement.title}</h4>
                    <p class="achievement-description">${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points}</span>
                </div>
            `;
        }).join('');
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '8px',
            zIndex: '1001',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    listenForUpdates() {
        window.addEventListener('lawStudyUpdate', (event) => {
            const { type, data } = event.detail;
            
            switch (type) {
                case 'progress_updated':
                    this.handleProgressUpdate(data);
                    break;
                case 'achievement_earned':
                    this.handleAchievementEarned(data);
                    break;
                case 'challenge_created':
                    this.handleChallengeCreated(data);
                    break;
                case 'sync_complete':
                    this.handleSyncComplete(data);
                    break;
            }
        });
    }
    
    handleProgressUpdate(data) {
        this.loadUserData();
        this.updateDashboard();
        
        if (data.userId !== this.currentUser) {
            const userName = data.userId.charAt(0).toUpperCase() + data.userId.slice(1);
            this.showNotification(`${userName} is studying!`, 'info');
        }
    }
    
    handleAchievementEarned(data) {
        const achievement = data.achievement;
        const userName = data.userId.charAt(0).toUpperCase() + data.userId.slice(1);
        
        if (data.userId === this.currentUser) {
            this.showNotification(`🎉 Achievement Earned: ${achievement.title}!`);
        } else {
            this.showNotification(`${userName} earned: ${achievement.title}!`, 'info');
        }
        
        this.loadUserData();
        this.updateDashboard();
    }
    
    handleChallengeCreated(data) {
        this.showNotification('New challenge created!');
        if (this.currentTab === 'challenges') {
            this.loadChallengesTab();
        }
    }
    
    handleSyncComplete(data) {
        console.log('Data synced at:', data.timestamp);
        this.loadUserData();
        this.updateDashboard();
    }
    
    // Study mode methods
    startFlashcards(subject) {
        if (typeof flashcards !== 'undefined') {
            flashcards.startFlashcards(subject);
        } else {
            console.error('Flashcards system not loaded');
            this.showNotification('Flashcards not available', 'error');
        }
    }
    
    startChecklistDrill(subject) {
        console.log(`Starting checklist drill for ${subject}`);
        // TODO: Implement checklist drill
    }
    
    startIracPractice(subject) {
        if (typeof iracPractice !== 'undefined') {
            iracPractice.startIracPractice(subject);
        } else {
            console.error('IRAC practice system not loaded');
            this.showNotification('IRAC practice not available', 'error');
        }
    }
    
    startRandomReview() {
        console.log('Starting random review');
        // TODO: Implement random review
    }
    
    startWeakAreas() {
        console.log('Starting weak areas focus');
        // TODO: Implement weak areas focus
    }
    
    initiateStudyTogether() {
        console.log('Initiating study together session');
        // TODO: Implement study together functionality
    }
}

// Initialize the app
const app = new LawStudyApp();