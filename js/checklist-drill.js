// Checklist Drill Mode - Interactive memorization practice for law school checklists

class ChecklistDrill {
    constructor() {
        this.currentSession = null;
        this.sessionTimer = null;
        this.currentStep = 0;
        this.sessionStats = {
            startTime: null,
            totalTime: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            drillsCompleted: 0,
            hintsUsed: 0
        };
        
        this.drillModes = {
            fill_blanks: 'Fill in the Blanks',
            mnemonic_practice: 'Mnemonic Practice', 
            speed_recitation: 'Speed Recitation',
            guided_review: 'Guided Review'
        };
        
        this.init();
    }
    
    init() {
        // Setup is handled when drill mode is started
    }
    
    // Start checklist drill for a subject
    startChecklistDrill(subject) {
        const subjectData = LAW_CONTENT[subject];
        
        if (!subjectData || !subjectData.topics) {
            app.showNotification('No checklist data available for this subject', 'error');
            return;
        }
        
        // Show drill mode selection
        this.showDrillModeSelection(subject, subjectData);
    }
    
    showDrillModeSelection(subject, subjectData) {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        modalTitle.textContent = `✅ ${subjectData.name} - Checklist Drill`;
        
        modalBody.innerHTML = `
            <div class="checklist-drill-selection">
                <div class="selection-header">
                    <h3>Choose Your Drill Mode</h3>
                    <p>Master your law school checklists with interactive memorization</p>
                    <div class="mnemonic-reminder">
                        <strong>📝 ${subjectData.name} Mnemonic:</strong> 
                        <span class="mnemonic-text">"${subjectData.mnemonic}"</span>
                    </div>
                </div>
                
                <div class="drill-modes-grid">
                    <div class="drill-mode-card" onclick="checklistDrill.startDrillSession('${subject}', 'fill_blanks')">
                        <div class="mode-icon">📝</div>
                        <h4>Fill in the Blanks</h4>
                        <p>Practice completing checklist items with missing words</p>
                        <div class="mode-stats">
                            <span class="difficulty">Difficulty: Medium</span>
                            <span class="time">~10 minutes</span>
                        </div>
                    </div>
                    
                    <div class="drill-mode-card" onclick="checklistDrill.startDrillSession('${subject}', 'mnemonic_practice')">
                        <div class="mode-icon">🧠</div>
                        <h4>Mnemonic Practice</h4>
                        <p>Learn and practice memory aids for each checklist section</p>
                        <div class="mode-stats">
                            <span class="difficulty">Difficulty: Easy</span>
                            <span class="time">~8 minutes</span>
                        </div>
                    </div>
                    
                    <div class="drill-mode-card" onclick="checklistDrill.startDrillSession('${subject}', 'speed_recitation')">
                        <div class="mode-icon">⚡</div>
                        <h4>Speed Recitation</h4>
                        <p>Rapid-fire checklist recitation under time pressure</p>
                        <div class="mode-stats">
                            <span class="difficulty">Difficulty: Hard</span>
                            <span class="time">~5 minutes</span>
                        </div>
                    </div>
                    
                    <div class="drill-mode-card" onclick="checklistDrill.startDrillSession('${subject}', 'guided_review')">
                        <div class="mode-icon">📚</div>
                        <h4>Guided Review</h4>
                        <p>Step-by-step walkthrough of the complete checklist</p>
                        <div class="mode-stats">
                            <span class="difficulty">Difficulty: Easy</span>
                            <span class="time">~15 minutes</span>
                        </div>
                    </div>
                </div>
                
                <div class="drill-tips">
                    <h4>💡 Checklist Mastery Tips</h4>
                    <ul>
                        <li>Start with <strong>Guided Review</strong> to learn the structure</li>
                        <li>Practice <strong>Mnemonics</strong> to build memory hooks</li>
                        <li>Use <strong>Fill in Blanks</strong> to test knowledge</li>
                        <li>Challenge yourself with <strong>Speed Recitation</strong></li>
                    </ul>
                </div>
                
                <div class="selection-actions">
                    <button class="btn-secondary" onclick="app.closeStudyModal()">
                        ← Back to Study
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
    
    startDrillSession(subject, mode) {
        const subjectData = LAW_CONTENT[subject];
        
        // Initialize session
        this.currentSession = {
            subject: subject,
            subjectData: subjectData,
            mode: mode,
            currentStep: 0,
            steps: this.generateDrillSteps(subject, mode),
            startTime: new Date(),
            sessionActive: true,
            userAnswers: [],
            hints: []
        };
        
        // Reset stats
        this.sessionStats = {
            startTime: new Date(),
            totalTime: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            drillsCompleted: 0,
            hintsUsed: 0
        };
        
        // Show drill interface
        this.showDrillInterface();
        
        // Start the first step
        this.displayCurrentStep();
        
        // Start session timer
        this.startSessionTimer();
    }
    
    generateDrillSteps(subject, mode) {
        const subjectData = LAW_CONTENT[subject];
        const steps = [];
        
        switch (mode) {
            case 'fill_blanks':
                steps.push(...this.generateFillBlanksSteps(subjectData));
                break;
            case 'mnemonic_practice':
                steps.push(...this.generateMnemonicSteps(subjectData));
                break;
            case 'speed_recitation':
                steps.push(...this.generateSpeedSteps(subjectData));
                break;
            case 'guided_review':
                steps.push(...this.generateGuidedSteps(subjectData));
                break;
        }
        
        return steps;
    }
    
    generateFillBlanksSteps(subjectData) {
        const steps = [];
        
        // Generate fill-in-the-blank questions for major sections
        Object.entries(subjectData.topics).forEach(([categoryKey, category]) => {
            // Main category question
            steps.push({
                type: 'fill_blank',
                category: category.name,
                question: `Complete the main category: ${this.createBlankQuestion(category.name)}`,
                answer: category.name,
                hint: `This is part of "${subjectData.mnemonic}"`
            });
            
            // Topic questions
            Object.entries(category.topics).forEach(([topicKey, topic]) => {
                steps.push({
                    type: 'fill_blank',
                    category: category.name,
                    question: `Complete this topic: ${this.createBlankQuestion(topic.title)}`,
                    answer: topic.title,
                    hint: topic.mnemonic || `This is under ${category.name}`
                });
            });
        });
        
        return this.shuffleArray(steps).slice(0, 15); // Limit to 15 questions
    }
    
    generateMnemonicSteps(subjectData) {
        const steps = [];
        
        // Main subject mnemonic
        steps.push({
            type: 'mnemonic_learn',
            title: `${subjectData.name} Main Mnemonic`,
            mnemonic: subjectData.mnemonic,
            explanation: 'This helps you remember the main categories',
            categories: Object.values(subjectData.topics).map(cat => cat.name)
        });
        
        // Category-specific mnemonics
        Object.entries(subjectData.topics).forEach(([categoryKey, category]) => {
            Object.entries(category.topics).forEach(([topicKey, topic]) => {
                if (topic.mnemonic) {
                    steps.push({
                        type: 'mnemonic_practice',
                        title: topic.title,
                        mnemonic: topic.mnemonic,
                        elements: topic.elements || [],
                        category: category.name
                    });
                }
            });
        });
        
        return steps;
    }
    
    generateSpeedSteps(subjectData) {
        const steps = [];
        
        // Create rapid-fire recitation challenges
        Object.entries(subjectData.topics).forEach(([categoryKey, category]) => {
            steps.push({
                type: 'speed_recite',
                category: category.name,
                items: Object.values(category.topics).map(t => t.title),
                timeLimit: 30, // 30 seconds per category
                instruction: `Quickly list all topics under "${category.name}"`
            });
        });
        
        return steps;
    }
    
    generateGuidedSteps(subjectData) {
        const steps = [];
        
        // Create step-by-step walkthrough
        Object.entries(subjectData.topics).forEach(([categoryKey, category]) => {
            steps.push({
                type: 'guided_intro',
                category: category.name,
                description: `Let's review ${category.name}`,
                topicCount: Object.keys(category.topics).length
            });
            
            Object.entries(category.topics).forEach(([topicKey, topic]) => {
                steps.push({
                    type: 'guided_topic',
                    category: category.name,
                    title: topic.title,
                    rule: topic.rule,
                    elements: topic.elements || [],
                    mnemonic: topic.mnemonic
                });
            });
        });
        
        return steps;
    }
    
    createBlankQuestion(text) {
        const words = text.split(' ');
        if (words.length === 1) {
            // Single word - blank out middle letters
            return words[0].charAt(0) + '_'.repeat(words[0].length - 2) + words[0].charAt(words[0].length - 1);
        } else {
            // Multiple words - blank out one random word
            const blankIndex = Math.floor(Math.random() * words.length);
            return words.map((word, index) => 
                index === blankIndex ? '_'.repeat(word.length) : word
            ).join(' ');
        }
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    showDrillInterface() {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        const modeName = this.drillModes[this.currentSession.mode];
        modalTitle.textContent = `✅ ${this.currentSession.subjectData.name} - ${modeName}`;
        
        modalBody.innerHTML = `
            <div class="checklist-drill-interface">
                <!-- Progress Header -->
                <div class="drill-header">
                    <div class="progress-section">
                        <div class="step-counter">
                            Step <span id="current-step">1</span> of <span id="total-steps">${this.currentSession.steps.length}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="drill-progress" style="width: 0%"></div>
                        </div>
                    </div>
                    
                    <div class="drill-controls">
                        <div class="timer-display" id="session-timer">00:00</div>
                        <button class="control-btn" onclick="checklistDrill.showHint()" id="hint-btn">💡 Hint</button>
                        <button class="control-btn danger" onclick="checklistDrill.endSession()">🏁 End</button>
                    </div>
                </div>
                
                <!-- Drill Content Area -->
                <div class="drill-content" id="drill-content">
                    <!-- Content will be populated by displayCurrentStep -->
                </div>
                
                <!-- Navigation -->
                <div class="drill-navigation">
                    <button class="nav-btn" onclick="checklistDrill.previousStep()" id="prev-step-btn" disabled>
                        ← Previous
                    </button>
                    <button class="nav-btn primary" onclick="checklistDrill.checkAnswer()" id="check-answer-btn" style="display: none;">
                        ✓ Check Answer
                    </button>
                    <button class="nav-btn primary" onclick="checklistDrill.nextStep()" id="next-step-btn" style="display: none;">
                        Next →
                    </button>
                </div>
                
                <!-- Keyboard Shortcuts -->
                <div class="keyboard-shortcuts">
                    <small>
                        <strong>Shortcuts:</strong> 
                        Enter = Check/Next | H = Hint | ← → = Navigate | Esc = End
                    </small>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    displayCurrentStep() {
        const step = this.currentSession.steps[this.currentSession.currentStep];
        const contentArea = document.getElementById('drill-content');
        
        if (!step || !contentArea) return;
        
        // Update progress
        this.updateProgress();
        
        // Render step content based on type
        switch (step.type) {
            case 'fill_blank':
                this.renderFillBlankStep(step, contentArea);
                break;
            case 'mnemonic_learn':
                this.renderMnemonicLearnStep(step, contentArea);
                break;
            case 'mnemonic_practice':
                this.renderMnemonicPracticeStep(step, contentArea);
                break;
            case 'speed_recite':
                this.renderSpeedReciteStep(step, contentArea);
                break;
            case 'guided_intro':
                this.renderGuidedIntroStep(step, contentArea);
                break;
            case 'guided_topic':
                this.renderGuidedTopicStep(step, contentArea);
                break;
        }
        
        // Update navigation buttons
        this.updateNavigation();
    }
    
    renderFillBlankStep(step, container) {
        container.innerHTML = `
            <div class="fill-blank-step">
                <div class="step-header">
                    <h3>Fill in the Blank</h3>
                    <div class="category-badge">${step.category}</div>
                </div>
                
                <div class="question-area">
                    <p class="question-text">${step.question}</p>
                    <input type="text" id="fill-blank-input" class="fill-blank-input" 
                           placeholder="Type your answer here..." 
                           onkeydown="checklistDrill.handleInputKeydown(event)">
                </div>
                
                <div class="hint-area" id="hint-area" style="display: none;">
                    <div class="hint-box">
                        <strong>💡 Hint:</strong> ${step.hint}
                    </div>
                </div>
                
                <div class="answer-feedback" id="answer-feedback" style="display: none;">
                    <!-- Feedback will be shown here -->
                </div>
            </div>
        `;
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('fill-blank-input')?.focus();
        }, 100);
        
        // Show check answer button
        document.getElementById('check-answer-btn').style.display = 'block';
    }
    
    renderMnemonicLearnStep(step, container) {
        container.innerHTML = `
            <div class="mnemonic-learn-step">
                <div class="step-header">
                    <h3>📝 ${step.title}</h3>
                </div>
                
                <div class="mnemonic-display">
                    <div class="mnemonic-box">
                        <h4>Memory Device:</h4>
                        <div class="mnemonic-text">"${step.mnemonic}"</div>
                    </div>
                    
                    <div class="mnemonic-breakdown">
                        <h4>What it helps you remember:</h4>
                        <ul class="category-list">
                            ${step.categories.map(cat => `<li>${cat}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="mnemonic-practice">
                    <h4>Practice saying it aloud:</h4>
                    <div class="practice-instruction">
                        Repeat the mnemonic 3 times, then click Next to continue.
                    </div>
                </div>
            </div>
        `;
        
        // Show next button immediately
        document.getElementById('next-step-btn').style.display = 'block';
    }
    
    renderMnemonicPracticeStep(step, container) {
        container.innerHTML = `
            <div class="mnemonic-practice-step">
                <div class="step-header">
                    <h3>🧠 Practice: ${step.title}</h3>
                    <div class="category-badge">${step.category}</div>
                </div>
                
                <div class="mnemonic-challenge">
                    <div class="mnemonic-display">
                        <h4>Mnemonic:</h4>
                        <div class="mnemonic-text">"${step.mnemonic}"</div>
                    </div>
                    
                    <div class="elements-practice">
                        <h4>Now list what each part represents:</h4>
                        <div class="elements-grid">
                            ${step.elements.map((element, index) => `
                                <div class="element-item">
                                    <div class="element-number">${index + 1}.</div>
                                    <div class="element-text">${element}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="practice-instruction">
                    Study the connections, then click Next when ready.
                </div>
            </div>
        `;
        
        // Show next button
        document.getElementById('next-step-btn').style.display = 'block';
    }
    
    renderSpeedReciteStep(step, container) {
        container.innerHTML = `
            <div class="speed-recite-step">
                <div class="step-header">
                    <h3>⚡ Speed Challenge</h3>
                    <div class="category-badge">${step.category}</div>
                </div>
                
                <div class="speed-challenge">
                    <div class="instruction">${step.instruction}</div>
                    
                    <div class="timer-section">
                        <div class="countdown-timer" id="speed-timer">${step.timeLimit}</div>
                        <button class="start-timer-btn" onclick="checklistDrill.startSpeedTimer()" id="start-speed-btn">
                            🏁 Start Timer
                        </button>
                    </div>
                    
                    <div class="speed-input-area" id="speed-input-area" style="display: none;">
                        <textarea id="speed-input" class="speed-textarea" 
                                placeholder="List the items as quickly as you can..."></textarea>
                    </div>
                    
                    <div class="speed-results" id="speed-results" style="display: none;">
                        <!-- Results will be shown here -->
                    </div>
                </div>
            </div>
        `;
    }
    
    renderGuidedIntroStep(step, container) {
        container.innerHTML = `
            <div class="guided-intro-step">
                <div class="step-header">
                    <h3>📚 Guided Review</h3>
                </div>
                
                <div class="intro-content">
                    <h2>${step.category}</h2>
                    <p class="intro-description">${step.description}</p>
                    
                    <div class="category-overview">
                        <div class="overview-stats">
                            <div class="stat">
                                <span class="stat-number">${step.topicCount}</span>
                                <span class="stat-label">Topics to Review</span>
                            </div>
                        </div>
                        
                        <div class="ready-prompt">
                            <p>We'll go through each topic step by step.</p>
                            <p>Ready to start?</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show next button
        document.getElementById('next-step-btn').style.display = 'block';
    }
    
    renderGuidedTopicStep(step, container) {
        container.innerHTML = `
            <div class="guided-topic-step">
                <div class="step-header">
                    <h3>📖 ${step.title}</h3>
                    <div class="category-badge">${step.category}</div>
                </div>
                
                <div class="topic-content">
                    <div class="rule-section">
                        <h4>Rule:</h4>
                        <div class="rule-text">${step.rule}</div>
                    </div>
                    
                    <div class="elements-section">
                        <h4>Elements:</h4>
                        <ul class="elements-list">
                            ${step.elements.map(element => `<li>${element}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${step.mnemonic ? `
                        <div class="mnemonic-section">
                            <h4>Memory Aid:</h4>
                            <div class="mnemonic-text">"${step.mnemonic}"</div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="study-prompt">
                    <p>Take a moment to review this topic. Click Next when ready to continue.</p>
                </div>
            </div>
        `;
        
        // Show next button
        document.getElementById('next-step-btn').style.display = 'block';
    }
    
    updateProgress() {
        const currentStepEl = document.getElementById('current-step');
        const progressBar = document.getElementById('drill-progress');
        
        if (currentStepEl) {
            currentStepEl.textContent = this.currentSession.currentStep + 1;
        }
        
        if (progressBar) {
            const progress = ((this.currentSession.currentStep) / this.currentSession.steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prev-step-btn');
        const nextBtn = document.getElementById('next-step-btn');
        const checkBtn = document.getElementById('check-answer-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSession.currentStep === 0;
        }
        
        // Hide all nav buttons initially
        if (nextBtn) nextBtn.style.display = 'none';
        if (checkBtn) checkBtn.style.display = 'none';
    }
    
    checkAnswer() {
        const step = this.currentSession.steps[this.currentSession.currentStep];
        const input = document.getElementById('fill-blank-input');
        const feedback = document.getElementById('answer-feedback');
        
        if (!step || !input || !feedback) return;
        
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = step.answer.toLowerCase();
        const isCorrect = userAnswer === correctAnswer || 
                         this.fuzzyMatch(userAnswer, correctAnswer);
        
        // Update stats
        this.sessionStats.totalQuestions++;
        if (isCorrect) {
            this.sessionStats.correctAnswers++;
        }
        
        // Show feedback
        feedback.style.display = 'block';
        feedback.innerHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
                <div class="feedback-text">
                    <strong>${isCorrect ? 'Correct!' : 'Not quite right'}</strong>
                    ${!isCorrect ? `<br>The correct answer is: <strong>"${step.answer}"</strong>` : ''}
                </div>
            </div>
        `;
        
        // Disable input and check button
        input.disabled = true;
        document.getElementById('check-answer-btn').style.display = 'none';
        document.getElementById('next-step-btn').style.display = 'block';
        
        // Award points for correct answers
        if (isCorrect) {
            gamification.awardPoints(app.currentUser, 'checklist_drill', 10);
        }
    }
    
    fuzzyMatch(userAnswer, correctAnswer) {
        // Simple fuzzy matching for close answers
        const similarity = this.levenshteinDistance(userAnswer, correctAnswer);
        const threshold = Math.max(2, correctAnswer.length * 0.2);
        return similarity <= threshold;
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
    
    showHint() {
        const step = this.currentSession.steps[this.currentSession.currentStep];
        const hintArea = document.getElementById('hint-area');
        
        if (step && hintArea && step.hint) {
            hintArea.style.display = 'block';
            this.sessionStats.hintsUsed++;
            
            // Disable hint button
            const hintBtn = document.getElementById('hint-btn');
            if (hintBtn) {
                hintBtn.disabled = true;
                hintBtn.textContent = '💡 Hint Used';
            }
        }
    }
    
    nextStep() {
        if (this.currentSession.currentStep < this.currentSession.steps.length - 1) {
            this.currentSession.currentStep++;
            this.displayCurrentStep();
        } else {
            this.completeSession();
        }
    }
    
    previousStep() {
        if (this.currentSession.currentStep > 0) {
            this.currentSession.currentStep--;
            this.displayCurrentStep();
        }
    }
    
    startSpeedTimer() {
        const step = this.currentSession.steps[this.currentSession.currentStep];
        const timerEl = document.getElementById('speed-timer');
        const startBtn = document.getElementById('start-speed-btn');
        const inputArea = document.getElementById('speed-input-area');
        
        if (!step || !timerEl || !startBtn || !inputArea) return;
        
        // Hide start button and show input
        startBtn.style.display = 'none';
        inputArea.style.display = 'block';
        
        // Focus on textarea
        document.getElementById('speed-input')?.focus();
        
        // Start countdown
        let timeLeft = step.timeLimit;
        const interval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            
            if (timeLeft <= 5) {
                timerEl.style.color = '#ef4444';
                timerEl.style.fontWeight = 'bold';
            }
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                this.endSpeedChallenge();
            }
        }, 1000);
        
        // Store interval for cleanup
        this.speedInterval = interval;
    }
    
    endSpeedChallenge() {
        const step = this.currentSession.steps[this.currentSession.currentStep];
        const userInput = document.getElementById('speed-input')?.value || '';
        const resultsArea = document.getElementById('speed-results');
        
        if (!step || !resultsArea) return;
        
        // Clear timer
        if (this.speedInterval) {
            clearInterval(this.speedInterval);
        }
        
        // Analyze user input
        const userItems = userInput.toLowerCase().split(/[,\n]/).map(s => s.trim()).filter(s => s);
        const correctItems = step.items.map(s => s.toLowerCase());
        const matches = userItems.filter(item => 
            correctItems.some(correct => this.fuzzyMatch(item, correct))
        );
        
        const score = Math.round((matches.length / correctItems.length) * 100);
        
        // Show results
        resultsArea.style.display = 'block';
        resultsArea.innerHTML = `
            <div class="speed-results-content">
                <h4>Speed Challenge Results</h4>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-value">${score}%</span>
                    </div>
                </div>
                <div class="results-breakdown">
                    <div class="result-stat">
                        <span class="stat-label">Correct Items:</span>
                        <span class="stat-value">${matches.length} / ${correctItems.length}</span>
                    </div>
                </div>
                
                <div class="correct-answers">
                    <h5>Complete List:</h5>
                    <ul>
                        ${step.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Show next button
        document.getElementById('next-step-btn').style.display = 'block';
        
        // Award points based on performance
        const points = Math.max(5, Math.floor(score / 10));
        gamification.awardPoints(app.currentUser, 'speed_drill', points);
    }
    
    handleInputKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.checkAnswer();
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this.currentSession?.sessionActive) return;
            
            switch (e.key) {
                case 'Enter':
                    if (document.getElementById('check-answer-btn').style.display !== 'none') {
                        this.checkAnswer();
                    } else if (document.getElementById('next-step-btn').style.display !== 'none') {
                        this.nextStep();
                    }
                    break;
                case 'h':
                case 'H':
                    this.showHint();
                    break;
                case 'ArrowLeft':
                    this.previousStep();
                    break;
                case 'ArrowRight':
                    if (document.getElementById('next-step-btn').style.display !== 'none') {
                        this.nextStep();
                    }
                    break;
                case 'Escape':
                    this.endSession();
                    break;
            }
        });
    }
    
    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            if (this.currentSession?.sessionActive) {
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
    
    async completeSession() {
        if (!this.currentSession) return;
        
        this.currentSession.sessionActive = false;
        
        // Stop timers
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        if (this.speedInterval) {
            clearInterval(this.speedInterval);
        }
        
        // Calculate final stats
        const accuracy = this.sessionStats.totalQuestions > 0 ? 
            Math.round((this.sessionStats.correctAnswers / this.sessionStats.totalQuestions) * 100) : 100;
        
        // Award completion points
        const basePoints = 25;
        const accuracyBonus = Math.floor(accuracy / 10) * 5;
        const speedBonus = this.sessionStats.totalTime < 300 ? 15 : 0; // Under 5 minutes
        const totalPoints = basePoints + accuracyBonus + speedBonus;
        
        await gamification.awardPoints(app.currentUser, 'checklist_completion', totalPoints);
        
        // Check for achievements
        await this.checkSessionAchievements(accuracy);
        
        // Show completion summary
        this.showCompletionSummary(accuracy, totalPoints);
    }
    
    async checkSessionAchievements(accuracy) {
        // Perfect score achievement
        if (accuracy === 100 && this.sessionStats.totalQuestions >= 5) {
            await tursoSync.awardAchievement(app.currentUser, 'perfect_session');
        }
        
        // Checklist master achievement
        const checklistSessions = parseInt(localStorage.getItem('checklistSessions') || '0') + 1;
        localStorage.setItem('checklistSessions', checklistSessions.toString());
        
        if (checklistSessions >= 10) {
            await tursoSync.awardAchievement(app.currentUser, 'checklist_master');
        }
    }
    
    showCompletionSummary(accuracy, pointsEarned) {
        const modalBody = document.getElementById('study-modal-body');
        if (!modalBody) return;
        
        modalBody.innerHTML = `
            <div class="drill-completion-summary">
                <div class="summary-header">
                    <h3>🎉 Checklist Drill Complete!</h3>
                    <p class="summary-subtitle">Great work mastering your law checklists!</p>
                </div>
                
                <div class="summary-stats">
                    <div class="summary-stat">
                        <div class="stat-icon">📋</div>
                        <div class="stat-value">${this.currentSession.steps.length}</div>
                        <div class="stat-label">Steps Completed</div>
                    </div>
                    
                    <div class="summary-stat">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value">${accuracy}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    
                    <div class="summary-stat">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-value">${Math.floor(this.sessionStats.totalTime / 60)}</div>
                        <div class="stat-label">Minutes</div>
                    </div>
                    
                    <div class="summary-stat">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-value">+${pointsEarned}</div>
                        <div class="stat-label">Points</div>
                    </div>
                </div>
                
                <div class="drill-feedback">
                    <h4>📈 Performance Feedback</h4>
                    <div class="feedback-items">
                        <div class="feedback-item ${accuracy >= 80 ? 'positive' : 'neutral'}">
                            <span class="feedback-icon">${accuracy >= 80 ? '✅' : '⚠️'}</span>
                            <span>Accuracy: ${accuracy >= 80 ? 'Excellent grasp of the material' : 'Review needed for some topics'}</span>
                        </div>
                        
                        <div class="feedback-item ${this.sessionStats.hintsUsed <= 2 ? 'positive' : 'neutral'}">
                            <span class="feedback-icon">${this.sessionStats.hintsUsed <= 2 ? '✅' : '💡'}</span>
                            <span>Hints Used: ${this.sessionStats.hintsUsed} (${this.sessionStats.hintsUsed <= 2 ? 'Great independence' : 'Consider more practice'})</span>
                        </div>
                        
                        <div class="feedback-item positive">
                            <span class="feedback-icon">🧠</span>
                            <span>Memory: Building strong recall patterns</span>
                        </div>
                    </div>
                </div>
                
                <div class="next-practice">
                    <h4>🎯 Recommended Next Steps</h4>
                    <ul>
                        <li>Try a different drill mode for varied practice</li>
                        <li>Practice flashcards to reinforce individual topics</li>
                        <li>Take an IRAC practice session to apply your knowledge</li>
                        <li>Challenge your study partner to a checklist race</li>
                    </ul>
                </div>
                
                <div class="summary-actions">
                    <button class="btn-primary" onclick="checklistDrill.startChecklistDrill('${this.currentSession.subject}')">
                        🔄 Try Another Mode
                    </button>
                    <button class="btn-secondary" onclick="app.closeStudyModal()">
                        📊 View Progress
                    </button>
                </div>
            </div>
        `;
    }
    
    endSession() {
        if (confirm('Are you sure you want to end this checklist drill session?')) {
            this.completeSession();
        }
    }
    
    // Cleanup
    cleanup() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        if (this.speedInterval) {
            clearInterval(this.speedInterval);
        }
        
        this.currentSession = null;
    }
}

// Create global checklist drill instance
const checklistDrill = new ChecklistDrill();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChecklistDrill;
}