// Flashcard Study Mode - Interactive learning with spaced repetition

class FlashcardSystem {
    constructor() {
        this.currentDeck = [];
        this.currentCardIndex = 0;
        this.sessionStats = {
            cardsStudied: 0,
            correctAnswers: 0,
            totalTime: 0,
            startTime: null
        };
        this.sessionActive = false;
        this.cardFlipped = false;
        this.confidenceRatings = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for flashcard events
        document.addEventListener('keydown', (e) => {
            if (this.sessionActive) {
                this.handleKeyboardShortcuts(e);
            }
        });
    }
    
    // Start flashcard session for a subject
    async startFlashcards(subject) {
        try {
            // Get all topics for the subject
            const allTopics = LawContentHelper.getAllTopics(subject);
            
            if (allTopics.length === 0) {
                app.showNotification('No topics found for this subject', 'error');
                return;
            }
            
            // Filter topics based on spaced repetition needs
            const userProgress = tursoSync.getUserProgress(app.currentUser);
            this.currentDeck = this.selectCardsForStudy(allTopics, userProgress);
            
            if (this.currentDeck.length === 0) {
                app.showNotification('All topics mastered! Great job! 🎉');
                return;
            }
            
            // Shuffle deck for better learning
            this.shuffleDeck();
            
            // Initialize session
            this.currentCardIndex = 0;
            this.sessionActive = true;
            this.cardFlipped = false;
            this.sessionStats = {
                cardsStudied: 0,
                correctAnswers: 0,
                totalTime: 0,
                startTime: new Date()
            };
            this.confidenceRatings = [];
            
            // Show flashcard interface
            this.showFlashcardInterface(subject);
            
            // Display first card
            this.displayCurrentCard();
            
        } catch (error) {
            console.error('Error starting flashcards:', error);
            app.showNotification('Failed to start flashcard session', 'error');
        }
    }
    
    selectCardsForStudy(allTopics, userProgress) {
        const cards = [];
        const now = new Date();
        
        allTopics.forEach(topic => {
            const progress = userProgress[topic.id];
            
            // Include topic if:
            // 1. Never studied (new topic)
            // 2. Low mastery level (< 4)
            // 3. Due for review based on spaced repetition
            
            if (!progress) {
                // New topic - include it
                cards.push({
                    ...topic,
                    priority: 'new',
                    lastStudied: null,
                    masteryLevel: 0,
                    confidence: 1
                });
            } else {
                const daysSinceStudy = progress.lastStudied ? 
                    (now - new Date(progress.lastStudied)) / (1000 * 60 * 60 * 24) : 999;
                
                // Calculate review interval based on mastery and confidence
                const reviewInterval = this.calculateReviewInterval(progress.masteryLevel, progress.confidence);
                
                if (progress.masteryLevel < 4 || daysSinceStudy >= reviewInterval) {
                    cards.push({
                        ...topic,
                        priority: progress.masteryLevel < 2 ? 'struggling' : 'review',
                        lastStudied: progress.lastStudied,
                        masteryLevel: progress.masteryLevel,
                        confidence: progress.confidence || 1
                    });
                }
            }
        });
        
        // Sort by priority: struggling > new > review
        cards.sort((a, b) => {
            const priorityOrder = { struggling: 0, new: 1, review: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        
        // Limit deck size for focused sessions (max 20 cards)
        return cards.slice(0, 20);
    }
    
    calculateReviewInterval(masteryLevel, confidence) {
        // Spaced repetition intervals based on mastery and confidence
        const baseIntervals = [1, 2, 4, 7, 14]; // days
        const confidenceMultipliers = { 1: 0.5, 2: 1.0, 3: 1.5 }; // hard, medium, easy
        
        const baseInterval = baseIntervals[Math.min(masteryLevel, baseIntervals.length - 1)];
        const multiplier = confidenceMultipliers[confidence] || 1.0;
        
        return Math.floor(baseInterval * multiplier);
    }
    
    shuffleDeck() {
        // Fisher-Yates shuffle with priority preservation
        for (let i = this.currentDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentDeck[i], this.currentDeck[j]] = [this.currentDeck[j], this.currentDeck[i]];
        }
    }
    
    showFlashcardInterface(subject) {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        const subjectData = LAW_CONTENT[subject];
        modalTitle.textContent = `🗂️ ${subjectData.name} Flashcards`;
        
        modalBody.innerHTML = `
            <div class="flashcard-interface">
                <!-- Session Header -->
                <div class="flashcard-header">
                    <div class="session-info">
                        <span class="card-counter">Card <span id="card-current">1</span> of <span id="card-total">${this.currentDeck.length}</span></span>
                        <span class="session-timer" id="session-timer">00:00</span>
                    </div>
                    <div class="session-stats">
                        <span class="stat">
                            <span class="stat-value" id="cards-studied">0</span>
                            <span class="stat-label">studied</span>
                        </span>
                        <span class="stat">
                            <span class="stat-value" id="cards-correct">0</span>
                            <span class="stat-label">correct</span>
                        </span>
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="flashcard-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="session-progress" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Flashcard -->
                <div class="flashcard-container">
                    <div class="flashcard" id="current-flashcard">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <div class="card-subject" id="card-subject"></div>
                                <div class="card-category" id="card-category"></div>
                                <div class="card-title" id="card-title"></div>
                                <div class="card-hint">Click to reveal answer</div>
                            </div>
                            <div class="flashcard-back">
                                <div class="card-rule">
                                    <h4>Rule:</h4>
                                    <p id="card-rule-text"></p>
                                </div>
                                <div class="card-elements">
                                    <h4>Elements:</h4>
                                    <ul id="card-elements-list"></ul>
                                </div>
                                <div class="card-mnemonic" id="card-mnemonic-container">
                                    <h4>Mnemonic:</h4>
                                    <p id="card-mnemonic-text"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Confidence Rating -->
                <div class="confidence-rating" id="confidence-rating" style="display: none;">
                    <h4>How well did you know this?</h4>
                    <div class="confidence-buttons">
                        <button class="confidence-btn hard" onclick="flashcards.rateCard(1)">
                            😰 Hard
                            <span class="confidence-desc">Didn't know it</span>
                        </button>
                        <button class="confidence-btn medium" onclick="flashcards.rateCard(2)">
                            🤔 Medium  
                            <span class="confidence-desc">Knew some parts</span>
                        </button>
                        <button class="confidence-btn easy" onclick="flashcards.rateCard(3)">
                            😊 Easy
                            <span class="confidence-desc">Knew it well</span>
                        </button>
                    </div>
                </div>
                
                <!-- Navigation -->
                <div class="flashcard-navigation">
                    <button class="nav-btn secondary" onclick="flashcards.previousCard()" id="prev-btn">
                        ← Previous
                    </button>
                    <button class="nav-btn primary" onclick="flashcards.flipCard()" id="flip-btn">
                        Flip Card
                    </button>
                    <button class="nav-btn secondary" onclick="flashcards.nextCard()" id="next-btn" style="display: none;">
                        Next →
                    </button>
                </div>
                
                <!-- Session Actions -->
                <div class="session-actions">
                    <button class="action-btn secondary" onclick="flashcards.pauseSession()">
                        ⏸️ Pause
                    </button>
                    <button class="action-btn secondary" onclick="flashcards.endSession()">
                        🏁 End Session
                    </button>
                </div>
                
                <!-- Keyboard Shortcuts -->
                <div class="keyboard-shortcuts">
                    <small>
                        <strong>Shortcuts:</strong> 
                        Space = Flip | 1,2,3 = Rate | ← → = Navigate | Esc = End
                    </small>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Start session timer
        this.startSessionTimer();
    }
    
    displayCurrentCard() {
        if (this.currentCardIndex >= this.currentDeck.length) {
            this.completeSession();
            return;
        }
        
        const card = this.currentDeck[this.currentCardIndex];
        const subjectData = LAW_CONTENT[card.subject];
        
        // Update card counter
        document.getElementById('card-current').textContent = this.currentCardIndex + 1;
        
        // Update progress bar
        const progress = ((this.currentCardIndex) / this.currentDeck.length) * 100;
        document.getElementById('session-progress').style.width = `${progress}%`;
        
        // Update card content
        document.getElementById('card-subject').textContent = subjectData.emoji + ' ' + subjectData.name;
        document.getElementById('card-category').textContent = card.category || '';
        document.getElementById('card-title').textContent = card.title;
        document.getElementById('card-rule-text').textContent = card.rule;
        
        // Update elements list
        const elementsList = document.getElementById('card-elements-list');
        elementsList.innerHTML = card.elements.map(element => `<li>${element}</li>`).join('');
        
        // Update mnemonic (if exists)
        const mnemonicContainer = document.getElementById('card-mnemonic-container');
        const mnemonicText = document.getElementById('card-mnemonic-text');
        if (card.mnemonic) {
            mnemonicText.textContent = card.mnemonic;
            mnemonicContainer.style.display = 'block';
        } else {
            mnemonicContainer.style.display = 'none';
        }
        
        // Reset card state
        this.cardFlipped = false;
        const flashcard = document.getElementById('current-flashcard');
        flashcard.classList.remove('flipped');
        
        // Hide confidence rating
        document.getElementById('confidence-rating').style.display = 'none';
        
        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentCardIndex === 0;
        document.getElementById('flip-btn').style.display = 'block';
        document.getElementById('next-btn').style.display = 'none';
        
        // Add priority indicator
        flashcard.className = `flashcard priority-${card.priority}`;
    }
    
    flipCard() {
        if (this.cardFlipped) return;
        
        const flashcard = document.getElementById('current-flashcard');
        flashcard.classList.add('flipped');
        this.cardFlipped = true;
        
        // Show confidence rating
        document.getElementById('confidence-rating').style.display = 'block';
        
        // Update navigation
        document.getElementById('flip-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'block';
    }
    
    async rateCard(confidence) {
        if (!this.cardFlipped) return;
        
        const currentCard = this.currentDeck[this.currentCardIndex];
        
        // Record confidence rating
        this.confidenceRatings.push({
            topicId: currentCard.id,
            confidence: confidence,
            correct: confidence >= 2 // Consider medium/easy as correct
        });
        
        // Update session stats
        this.sessionStats.cardsStudied++;
        if (confidence >= 2) {
            this.sessionStats.correctAnswers++;
        }
        
        // Update UI stats
        document.getElementById('cards-studied').textContent = this.sessionStats.cardsStudied;
        document.getElementById('cards-correct').textContent = this.sessionStats.correctAnswers;
        
        // Update progress in database
        await this.updateTopicProgress(currentCard, confidence);
        
        // Auto-advance to next card after rating
        setTimeout(() => {
            this.nextCard();
        }, 500);
    }
    
    async updateTopicProgress(card, confidence) {
        const currentProgress = tursoSync.getUserProgress(app.currentUser)[card.id] || {
            masteryLevel: 0,
            studyCount: 0,
            confidence: 1,
            timeSpent: 0
        };
        
        // Calculate new mastery level based on confidence
        let masteryIncrease = 0;
        if (confidence === 3) masteryIncrease = 1;        // Easy = +1
        else if (confidence === 2) masteryIncrease = 0.5; // Medium = +0.5
        else masteryIncrease = 0;                          // Hard = no increase
        
        const updatedProgress = {
            masteryLevel: Math.min(currentProgress.masteryLevel + masteryIncrease, 5),
            studyCount: currentProgress.studyCount + 1,
            confidence: confidence,
            timeSpent: currentProgress.timeSpent + 2 // Assume 2 minutes per card
        };
        
        await tursoSync.updateProgress(app.currentUser, card.id, updatedProgress);
    }
    
    nextCard() {
        if (this.currentCardIndex < this.currentDeck.length - 1) {
            this.currentCardIndex++;
            this.displayCurrentCard();
        } else {
            this.completeSession();
        }
    }
    
    previousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.displayCurrentCard();
        }
    }
    
    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            if (this.sessionActive && this.sessionStats.startTime) {
                const elapsed = Math.floor((new Date() - this.sessionStats.startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                
                const timerEl = document.getElementById('session-timer');
                if (timerEl) {
                    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
                
                this.sessionStats.totalTime = elapsed;
            }
        }, 1000);
    }
    
    pauseSession() {
        this.sessionActive = !this.sessionActive;
        const pauseBtn = document.querySelector('.action-btn:nth-child(1)');
        
        if (this.sessionActive) {
            pauseBtn.textContent = '⏸️ Pause';
            this.sessionStats.startTime = new Date(new Date() - this.sessionStats.totalTime * 1000);
        } else {
            pauseBtn.textContent = '▶️ Resume';
        }
    }
    
    async completeSession() {
        this.sessionActive = false;
        
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        
        // Calculate session statistics
        const accuracy = this.sessionStats.cardsStudied > 0 ? 
            Math.round((this.sessionStats.correctAnswers / this.sessionStats.cardsStudied) * 100) : 0;
        
        const totalMinutes = Math.round(this.sessionStats.totalTime / 60);
        
        // Award session points
        const sessionPoints = this.sessionStats.cardsStudied * 10 + 
                             this.sessionStats.correctAnswers * 5 +
                             (accuracy >= 80 ? 25 : 0); // Bonus for high accuracy
        
        await gamification.awardPoints(app.currentUser, 'flashcard_session', sessionPoints);
        
        // Check for achievements
        await this.checkSessionAchievements();
        
        // Show completion summary
        this.showSessionSummary(accuracy, totalMinutes, sessionPoints);
    }
    
    async checkSessionAchievements() {
        const accuracy = (this.sessionStats.correctAnswers / this.sessionStats.cardsStudied) * 100;
        
        // Perfect session achievement
        if (accuracy === 100 && this.sessionStats.cardsStudied >= 5) {
            await tursoSync.awardAchievement(app.currentUser, 'perfect_session');
        }
        
        // Speed demon achievement (if under 1 minute per card)
        const avgTimePerCard = this.sessionStats.totalTime / this.sessionStats.cardsStudied;
        if (avgTimePerCard < 60 && this.sessionStats.cardsStudied >= 10) {
            await tursoSync.awardAchievement(app.currentUser, 'speed_demon');
        }
    }
    
    showSessionSummary(accuracy, totalMinutes, pointsEarned) {
        const modalBody = document.getElementById('study-modal-body');
        
        modalBody.innerHTML = `
            <div class="session-summary">
                <div class="summary-header">
                    <h3>🎉 Flashcard Session Complete!</h3>
                    <div class="summary-score">
                        <div class="score-circle">
                            <span class="score-value">${accuracy}%</span>
                            <span class="score-label">Accuracy</span>
                        </div>
                    </div>
                </div>
                
                <div class="summary-stats">
                    <div class="stat-item">
                        <div class="stat-icon">📚</div>
                        <div class="stat-info">
                            <span class="stat-number">${this.sessionStats.cardsStudied}</span>
                            <span class="stat-text">Cards Studied</span>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">✅</div>
                        <div class="stat-info">
                            <span class="stat-number">${this.sessionStats.correctAnswers}</span>
                            <span class="stat-text">Correct Answers</span>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-info">
                            <span class="stat-number">${totalMinutes}</span>
                            <span class="stat-text">Minutes Studied</span>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-info">
                            <span class="stat-number">+${pointsEarned}</span>
                            <span class="stat-text">Points Earned</span>
                        </div>
                    </div>
                </div>
                
                <div class="summary-progress">
                    <h4>Topics Reviewed:</h4>
                    <div class="topics-list">
                        ${this.confidenceRatings.map(rating => {
                            const topic = this.currentDeck.find(c => c.id === rating.topicId);
                            const confidenceEmoji = rating.confidence === 3 ? '😊' : rating.confidence === 2 ? '🤔' : '😰';
                            return `
                                <div class="topic-review">
                                    <span class="topic-name">${topic?.title || 'Unknown'}</span>
                                    <span class="topic-confidence">${confidenceEmoji}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="summary-actions">
                    <button class="btn-primary" onclick="flashcards.startFlashcards('${this.currentDeck[0]?.subject}')">
                        🔄 Study More Cards
                    </button>
                    <button class="btn-secondary" onclick="app.closeStudyModal()">
                        📊 View Progress
                    </button>
                </div>
                
                <div class="next-session">
                    <p>💡 <strong>Next Review:</strong> Come back tomorrow to review struggling topics with spaced repetition!</p>
                </div>
            </div>
        `;
    }
    
    endSession() {
        if (confirm('Are you sure you want to end this flashcard session?')) {
            this.completeSession();
        }
    }
    
    handleKeyboardShortcuts(e) {
        if (!this.sessionActive) return;
        
        switch (e.key) {
            case ' ':
                e.preventDefault();
                if (!this.cardFlipped) {
                    this.flipCard();
                } else {
                    this.nextCard();
                }
                break;
            case '1':
                e.preventDefault();
                if (this.cardFlipped) this.rateCard(1);
                break;
            case '2':
                e.preventDefault();
                if (this.cardFlipped) this.rateCard(2);
                break;
            case '3':
                e.preventDefault();
                if (this.cardFlipped) this.rateCard(3);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (this.cardFlipped) this.nextCard();
                break;
            case 'Escape':
                e.preventDefault();
                this.endSession();
                break;
        }
    }
    
    // Cleanup
    cleanup() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        
        this.sessionActive = false;
        this.currentDeck = [];
        this.currentCardIndex = 0;
        this.cardFlipped = false;
    }
}

// Create global flashcards instance
const flashcards = new FlashcardSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlashcardSystem;
}