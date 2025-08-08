// IRAC Practice Mode - Timed essay writing with legal hypotheticals

class IracPractice {
    constructor() {
        this.practiceHypos = {
            contracts: [
                {
                    id: 'contracts_formation_1',
                    title: 'Ed\'s Car Wash Contracts',
                    timeLimit: 15, // minutes
                    hypo: `Ed is the owner of the newly opened Ed's Custom Car Wash, where car washes cost $25. While he was grocery shopping in his home town, which is located 20 miles from Ed's Custom Car Wash, he was greeted by his friend Alice. After they chatted for a moment, Ed said, "Come by my new car wash and I'll give you a free car wash tomorrow." Alice replied, "Thanks. By the way, we've got a few extra tickets for the game tonight. If you want them, they're yours." A few minutes later, Ed ran into police officer Brown, who worked in Ed's home town. Ed said, "Officer Brown, if you will drive by my house soon and make sure everything is OK, I'll give you a free car wash tomorrow." Officer Brown, who was about to begin his job of patrolling Ed's neighborhood, replied, "I accept your kind offer." Officer Brown then left the store and began his routine patrol, which, as always, promptly took him by Ed's house, where everything was in order. When Ed returned home from shopping, he saw his next door neighbor, Charlie. Ed said, "Charlie, I'll give you a free car wash tomorrow at my new car wash." Charlie replied, "Thanks, I'll take you up on that." As soon as Ed arrived at work the next day, he found a long line of cars at the car wash. He phoned Alice and Officer Brown, and told them that he would not give them free car washes. Then he saw Charlie, who had left work and driven for one-half hour to get to the car wash and was waiting in line. Ed immediately told Charlie, "I am not going to give you a free car wash."`,
                    question: 'Does Ed have an enforceable obligation to Alice, Officer Brown, or Charlie? Discuss.',
                    topics: ['offer', 'acceptance', 'consideration', 'contract_formation'],
                    issueSpottingHints: [
                        'Look for offers vs. invitations',
                        'Check for consideration from each party',
                        'Analyze timing of acceptance',
                        'Consider reliance/detrimental reliance'
                    ]
                }
            ],
            torts: [
                {
                    id: 'torts_intentional_1',
                    title: 'Workplace Torts - Dolly vs. Coworkers',
                    timeLimit: 15,
                    hypo: `Al, Bob, Carl, and Dolly were coworkers at Zco. Al, Bob, and Carl did not like Dolly and wanted her fired from Zco. On Monday, all employees of Zco were required to attend a mandatory meeting. Prior to the meeting, Al entered Dolly's office and told her not to leave her office until the meeting was over. He then said to her, "If you leave this office before the meeting is over, some of my friends and I will come to your home and beat you up." Al then left for the meeting. Dolly, scared for her safety, remained in her office, missed the meeting, and was reprimanded by Carl, her supervisor. On Tuesday, Bob placed a sleeping pill in Dolly's coffee when Dolly was not looking. Dolly drank the coffee and fell asleep at her desk twenty minutes later. She slept for four hours, and was again reprimanded by Carl for sleeping on the job. On Wednesday, the Human Resources Manager for Zco asked Carl if he knew why Dolly had missed the meeting on Monday and fell asleep at her desk on Tuesday. Carl responded that Dolly had a serious drinking problem that interfered with her job performance. Carl was aware of the actual reasons why Dolly had missed the meeting on Monday and fell asleep on Tuesday, and he had no reason to believe that she had a drinking problem. On Thursday, Dolly was fired from Zco.`,
                    question: 'Under what intentional tort theories might an action for damages be brought by Dolly against Al, Bob, and Carl, and what defenses, if any, might Al, Bob, or Carl assert, and what are the likely results? Discuss.',
                    topics: ['assault', 'battery', 'false_imprisonment', 'defamation'],
                    issueSpottingHints: [
                        'Al\'s threat - assault elements',
                        'Al\'s confinement - false imprisonment',
                        'Bob\'s sleeping pill - battery',
                        'Carl\'s statement - defamation elements'
                    ]
                },
                {
                    id: 'torts_negligence_1',
                    title: 'Construction Site Negligence',
                    timeLimit: 15,
                    hypo: `Penny hired David to build an addition to her home. During excavation, a large hole was dug for the cement foundation to be poured. However, a section of the dirt wall around the hole caved in. David immediately shut down the work site and sent his work crew home for the day. David assessed the cave-in so that he could re-enforce the wall around the hole the next morning before continuing with the job. Later that evening, Penny walked outside to view the progress being made on the addition. As she was looking down into the hole, the section where she was standing caved in, and Penny fell into the hole. Her leg was broken and although she called for help, no one heard her and no help arrived until the next morning when David arrived, found her there, and called for an ambulance. In addition to Penny's broken leg, she suffered mild hypothermia from spending the night outside, and she now has nightmares due to the trauma.`,
                    question: 'Penny filed a lawsuit against David for negligence. Discuss whether she is likely to prevail and what defenses David might raise.',
                    topics: ['duty', 'breach', 'causation', 'damages', 'negligence_defenses'],
                    issueSpottingHints: [
                        'David\'s duty of care as contractor',
                        'Standard of care - reasonable contractor',
                        'Breach - leaving dangerous condition',
                        'Causation - but-for and proximate',
                        'Damages - physical and emotional',
                        'Defenses - comparative negligence'
                    ]
                }
            ],
            criminal: [
                {
                    id: 'criminal_arson_1',
                    title: 'Tom\'s Firecracker Incident',
                    timeLimit: 15,
                    hypo: `Tom lived next door to his girlfriend Heather, and often helped her tend her yard. To do so, Tom used the tools that were stored in Heather's wooden toolshed, which abutted Heather's house, such as a lawnmower and edger, both of which were filled with gasoline. One day when Tom thought Heather was away at work, he went to Heather's house to mow the lawn. However, through the backyard window, Tom was surprised to see Heather kissing another man. Tom felt queasy and left. He went to the drug store and bought Anxiety-Fix, an over-the-counter anti-anxiety medication that he had never used before, and headed home. Tom took three Anxiety-Fix pills, even though the instructions on the box stated that a person should take no more than two pills every eight hours. Two hours later, still feeling anxious, Tom took four more Anxiety-Fix pills, and fell asleep. Tom awoke in the middle of the night due to a nightmare he had about Heather. Tom then lit several firecrackers in his yard, and threw them at Heather's house. He wanted to wake her up to discuss what he had seen. Two of the firecrackers landed in the toolshed, setting it afire. The sound of the firecrackers awakened Heather and, upon seeing flames, she grabbed a can of lighter fluid, opened some windows on the side of the house near the shed, and squirted the flammable fluid on the windowsills. Heather had been having a hard time selling her house and thought that, as long as the shed was going to burn down, the house could just as well burn with it since her insurance would cover the loss. Meanwhile, Tom used a garden hose to extinguish the fire in the toolshed before it spread. The inside of the toolshed suffered smoke damage. All of the items inside of it were destroyed.`,
                    question: '1. Can it be reasonably argued that Tom is guilty of arson? Discuss. 2. Does Tom have any valid defenses? Discuss. 3. Can it be reasonably argued that Heather is guilty of any crimes? Discuss.',
                    topics: ['arson', 'intent', 'intoxication_defense', 'criminal_defenses'],
                    issueSpottingHints: [
                        'Tom\'s intent when throwing firecrackers',
                        'Arson elements - burning of dwelling',
                        'Intoxication defense - voluntary vs involuntary',
                        'Heather\'s intent with lighter fluid',
                        'Insurance fraud considerations'
                    ]
                }
            ]
        };
        
        this.currentSession = null;
        this.sessionTimer = null;
        this.autoSaveInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Auto-save functionality will be set up during practice session
    }
    
    // Start IRAC practice for a subject
    startIracPractice(subject) {
        const hypos = this.practiceHypos[subject];
        
        if (!hypos || hypos.length === 0) {
            app.showNotification('No practice problems available for this subject yet', 'error');
            return;
        }
        
        // Show hypo selection interface
        this.showHypoSelection(subject, hypos);
    }
    
    showHypoSelection(subject, hypos) {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        const subjectData = LAW_CONTENT[subject];
        modalTitle.textContent = `📝 ${subjectData.name} - IRAC Practice`;
        
        modalBody.innerHTML = `
            <div class="irac-selection">
                <div class="selection-header">
                    <h3>Choose a Practice Problem</h3>
                    <p>Select a hypothetical to practice your IRAC essay writing skills</p>
                </div>
                
                <div class="hypo-list">
                    ${hypos.map(hypo => `
                        <div class="hypo-item" onclick="iracPractice.startPracticeSession('${hypo.id}')">
                            <div class="hypo-header">
                                <h4>${hypo.title}</h4>
                                <div class="hypo-meta">
                                    <span class="time-limit">⏱️ ${hypo.timeLimit} minutes</span>
                                    <span class="topic-count">${hypo.topics.length} topics</span>
                                </div>
                            </div>
                            <div class="hypo-preview">
                                ${hypo.hypo.substring(0, 200)}...
                            </div>
                            <div class="hypo-question">
                                <strong>Question:</strong> ${hypo.question}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="irac-tips">
                    <h4>💡 IRAC Writing Tips</h4>
                    <ul>
                        <li><strong>Issue:</strong> State each legal issue as a yes/no question</li>
                        <li><strong>Rule:</strong> Give one concise rule of law for each issue</li>
                        <li><strong>Analysis:</strong> Apply facts to each element of the rule</li>
                        <li><strong>Conclusion:</strong> Answer the question you raised in your issue</li>
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
    
    startPracticeSession(hypoId) {
        // Find the hypo across all subjects
        let selectedHypo = null;
        let subject = null;
        
        for (const [subjectKey, hypos] of Object.entries(this.practiceHypos)) {
            const hypo = hypos.find(h => h.id === hypoId);
            if (hypo) {
                selectedHypo = hypo;
                subject = subjectKey;
                break;
            }
        }
        
        if (!selectedHypo) {
            app.showNotification('Practice problem not found', 'error');
            return;
        }
        
        // Initialize session
        this.currentSession = {
            hypo: selectedHypo,
            subject: subject,
            startTime: new Date(),
            timeLimit: selectedHypo.timeLimit * 60, // Convert to seconds
            timeRemaining: selectedHypo.timeLimit * 60,
            content: '',
            autoSaves: [],
            completed: false
        };
        
        // Show practice interface
        this.showPracticeInterface();
        
        // Start timer
        this.startSessionTimer();
        
        // Start auto-save
        this.startAutoSave();
    }
    
    showPracticeInterface() {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        modalTitle.textContent = `📝 IRAC Practice - ${this.currentSession.hypo.title}`;
        
        modalBody.innerHTML = `
            <div class="irac-practice-interface">
                <!-- Timer and Controls -->
                <div class="practice-header">
                    <div class="timer-section">
                        <div class="timer-display">
                            <span class="timer-label">Time Remaining:</span>
                            <span class="timer-value" id="practice-timer">${this.formatTime(this.currentSession.timeRemaining)}</span>
                        </div>
                        <div class="timer-controls">
                            <button class="timer-btn" onclick="iracPractice.pauseTimer()" id="pause-btn">⏸️ Pause</button>
                            <button class="timer-btn" onclick="iracPractice.addTime()" id="add-time-btn">⏰ +5 min</button>
                        </div>
                    </div>
                    
                    <div class="practice-controls">
                        <button class="control-btn" onclick="iracPractice.showHints()">💡 Hints</button>
                        <button class="control-btn" onclick="iracPractice.showIracTemplate()">📋 IRAC Guide</button>
                        <button class="control-btn danger" onclick="iracPractice.endSession()">🏁 Submit</button>
                    </div>
                </div>
                
                <!-- Hypothetical -->
                <div class="hypothetical-section">
                    <div class="hypo-header">
                        <h4>Hypothetical Facts</h4>
                        <button class="toggle-btn" onclick="iracPractice.toggleHypo()" id="toggle-hypo">📖 Hide Facts</button>
                    </div>
                    <div class="hypo-content" id="hypo-content">
                        <p>${this.currentSession.hypo.hypo}</p>
                        <div class="question-box">
                            <strong>Question:</strong> ${this.currentSession.hypo.question}
                        </div>
                    </div>
                </div>
                
                <!-- Writing Area -->
                <div class="writing-section">
                    <div class="writing-header">
                        <h4>Your IRAC Answer</h4>
                        <div class="writing-stats">
                            <span id="word-count">0 words</span>
                            <span class="auto-save-status" id="save-status">Auto-saved</span>
                        </div>
                    </div>
                    
                    <textarea 
                        id="essay-editor" 
                        class="essay-textarea" 
                        placeholder="Begin your IRAC analysis here...

ISSUE: 

RULE: 

ANALYSIS: 

CONCLUSION: "
                        oninput="iracPractice.updateWordCount()"
                        onkeydown="iracPractice.handleKeyboard(event)"
                    ></textarea>
                </div>
                
                <!-- IRAC Structure Guide (collapsible) -->
                <div class="irac-guide" id="irac-guide" style="display: none;">
                    <h4>IRAC Structure Guide</h4>
                    <div class="guide-sections">
                        <div class="guide-section">
                            <h5>📍 ISSUE</h5>
                            <p>State the legal issue as a yes/no question. Be specific and narrow.</p>
                            <p><em>Example: "Did Bob commit a battery when he placed a sleeping pill in Dolly's coffee?"</em></p>
                        </div>
                        
                        <div class="guide-section">
                            <h5>⚖️ RULE</h5>
                            <p>State the relevant rule of law in one clear sentence.</p>
                            <p><em>Example: "Battery is the intentional infliction of harmful or offensive contact with another person."</em></p>
                        </div>
                        
                        <div class="guide-section">
                            <h5>🔍 ANALYSIS</h5>
                            <p>Apply the facts to each element of the rule. Explain your reasoning.</p>
                            <p><em>Address each element: Intent, Contact, Harmful/Offensive nature</em></p>
                        </div>
                        
                        <div class="guide-section">
                            <h5>✅ CONCLUSION</h5>
                            <p>Answer the question from your issue statement. Be definitive.</p>
                            <p><em>Example: "Therefore, Bob committed a battery."</em></p>
                        </div>
                    </div>
                </div>
                
                <!-- Issue Spotting Hints (collapsible) -->
                <div class="hints-section" id="hints-section" style="display: none;">
                    <h4>🎯 Issue Spotting Hints</h4>
                    <ul class="hints-list">
                        ${this.currentSession.hypo.issueSpottingHints.map(hint => 
                            `<li>${hint}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Focus on textarea
        setTimeout(() => {
            document.getElementById('essay-editor')?.focus();
        }, 100);
    }
    
    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            if (this.currentSession && !this.currentSession.paused) {
                this.currentSession.timeRemaining--;
                
                const timerEl = document.getElementById('practice-timer');
                if (timerEl) {
                    timerEl.textContent = this.formatTime(this.currentSession.timeRemaining);
                    
                    // Color coding for urgency
                    if (this.currentSession.timeRemaining <= 300) { // 5 minutes
                        timerEl.style.color = '#ef4444';
                        timerEl.style.fontWeight = 'bold';
                    } else if (this.currentSession.timeRemaining <= 600) { // 10 minutes
                        timerEl.style.color = '#f59e0b';
                    }
                }
                
                // Time warnings
                if (this.currentSession.timeRemaining === 300) { // 5 minutes
                    app.showNotification('⏰ 5 minutes remaining!', 'warning');
                } else if (this.currentSession.timeRemaining === 60) { // 1 minute
                    app.showNotification('⏰ 1 minute remaining!', 'warning');
                } else if (this.currentSession.timeRemaining === 0) {
                    this.timeUp();
                }
            }
        }, 1000);
    }
    
    pauseTimer() {
        if (!this.currentSession) return;
        
        this.currentSession.paused = !this.currentSession.paused;
        const pauseBtn = document.getElementById('pause-btn');
        
        if (this.currentSession.paused) {
            pauseBtn.textContent = '▶️ Resume';
            app.showNotification('Timer paused');
        } else {
            pauseBtn.textContent = '⏸️ Pause';
            app.showNotification('Timer resumed');
        }
    }
    
    addTime() {
        if (!this.currentSession) return;
        
        this.currentSession.timeRemaining += 300; // Add 5 minutes
        this.currentSession.timeLimit += 300;
        
        app.showNotification('⏰ Added 5 minutes to your timer');
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.autoSave();
        }, 30000); // Auto-save every 30 seconds
    }
    
    autoSave() {
        const editor = document.getElementById('essay-editor');
        if (!editor || !this.currentSession) return;
        
        this.currentSession.content = editor.value;
        
        // Update save status
        const saveStatus = document.getElementById('save-status');
        if (saveStatus) {
            saveStatus.textContent = 'Auto-saved';
            saveStatus.style.color = '#10b981';
        }
        
        // Store in auto-saves array
        this.currentSession.autoSaves.push({
            timestamp: new Date(),
            content: editor.value,
            wordCount: this.countWords(editor.value)
        });
        
        // Keep only last 10 auto-saves
        if (this.currentSession.autoSaves.length > 10) {
            this.currentSession.autoSaves.shift();
        }
    }
    
    updateWordCount() {
        const editor = document.getElementById('essay-editor');
        const wordCountEl = document.getElementById('word-count');
        
        if (!editor || !wordCountEl) return;
        
        const wordCount = this.countWords(editor.value);
        wordCountEl.textContent = `${wordCount} words`;
        
        // Update save status to show unsaved changes
        const saveStatus = document.getElementById('save-status');
        if (saveStatus) {
            saveStatus.textContent = 'Unsaved changes';
            saveStatus.style.color = '#f59e0b';
        }
    }
    
    countWords(text) {
        return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    }
    
    handleKeyboard(event) {
        // Ctrl+S or Cmd+S to save
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            this.autoSave();
        }
        
        // Ctrl+Enter or Cmd+Enter to submit
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            this.endSession();
        }
    }
    
    toggleHypo() {
        const hypoContent = document.getElementById('hypo-content');
        const toggleBtn = document.getElementById('toggle-hypo');
        
        if (!hypoContent || !toggleBtn) return;
        
        if (hypoContent.style.display === 'none') {
            hypoContent.style.display = 'block';
            toggleBtn.textContent = '📖 Hide Facts';
        } else {
            hypoContent.style.display = 'none';
            toggleBtn.textContent = '👁️ Show Facts';
        }
    }
    
    showIracTemplate() {
        const guide = document.getElementById('irac-guide');
        if (!guide) return;
        
        if (guide.style.display === 'none') {
            guide.style.display = 'block';
        } else {
            guide.style.display = 'none';
        }
    }
    
    showHints() {
        const hints = document.getElementById('hints-section');
        if (!hints) return;
        
        if (hints.style.display === 'none') {
            hints.style.display = 'block';
        } else {
            hints.style.display = 'none';
        }
    }
    
    timeUp() {
        app.showNotification('⏰ Time\'s up! Your essay will be automatically submitted.', 'warning');
        
        setTimeout(() => {
            this.endSession(true); // true indicates time ran out
        }, 3000);
    }
    
    async endSession(timeUp = false) {
        if (!this.currentSession) return;
        
        // Final save
        this.autoSave();
        
        // Stop timers
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
        
        // Calculate session stats
        const totalTime = Math.floor((new Date() - this.currentSession.startTime) / 1000);
        const finalWordCount = this.countWords(this.currentSession.content);
        const timeUsed = this.currentSession.timeLimit - this.currentSession.timeRemaining;
        
        // Award points for completion
        let sessionPoints = 50; // Base points for completing
        if (!timeUp) sessionPoints += 25; // Bonus for finishing early
        if (finalWordCount >= 300) sessionPoints += 25; // Bonus for substantial writing
        
        await gamification.awardPoints(app.currentUser, 'irac_practice', sessionPoints);
        
        // Check for achievements
        await this.checkSessionAchievements(finalWordCount, timeUsed, timeUp);
        
        // Show completion summary
        this.showSessionSummary(totalTime, finalWordCount, timeUsed, sessionPoints, timeUp);
        
        // Mark session as completed
        this.currentSession.completed = true;
    }
    
    async checkSessionAchievements(wordCount, timeUsed, timeUp) {
        // Speed demon - finish IRAC under 8 minutes
        if (timeUsed < 480 && wordCount >= 200) {
            await tursoSync.awardAchievement(app.currentUser, 'speed_demon');
        }
        
        // IRAC master - write substantial essay
        if (wordCount >= 500) {
            await tursoSync.awardAchievement(app.currentUser, 'irac_master');
        }
        
        // Perfect timing - finish within last 2 minutes
        if (!timeUp && this.currentSession.timeRemaining <= 120 && this.currentSession.timeRemaining > 0) {
            await tursoSync.awardAchievement(app.currentUser, 'perfect_timing');
        }
    }
    
    showSessionSummary(totalTime, wordCount, timeUsed, pointsEarned, timeUp) {
        const modalBody = document.getElementById('study-modal-body');
        if (!modalBody) return;
        
        const timeUsedFormatted = this.formatTime(timeUsed);
        const totalTimeFormatted = this.formatTime(totalTime);
        
        modalBody.innerHTML = `
            <div class="irac-session-summary">
                <div class="summary-header">
                    <h3>${timeUp ? '⏰ Time\'s Up!' : '🎉 IRAC Practice Complete!'}</h3>
                    <p class="summary-subtitle">Great work on your legal writing practice!</p>
                </div>
                
                <div class="summary-stats-grid">
                    <div class="summary-stat">
                        <div class="stat-icon">📝</div>
                        <div class="stat-value">${wordCount}</div>
                        <div class="stat-label">Words Written</div>
                    </div>
                    
                    <div class="summary-stat">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-value">${timeUsedFormatted}</div>
                        <div class="stat-label">Time Used</div>
                    </div>
                    
                    <div class="summary-stat">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-value">+${pointsEarned}</div>
                        <div class="stat-label">Points Earned</div>
                    </div>
                    
                    <div class="summary-stat">
                        <div class="stat-icon">💾</div>
                        <div class="stat-value">${this.currentSession.autoSaves.length}</div>
                        <div class="stat-label">Auto-saves</div>
                    </div>
                </div>
                
                <div class="essay-preview">
                    <h4>Your Essay Preview</h4>
                    <div class="essay-content">
                        ${this.currentSession.content ? 
                          this.currentSession.content.substring(0, 300) + (this.currentSession.content.length > 300 ? '...' : '') :
                          'No content written'
                        }
                    </div>
                </div>
                
                <div class="writing-feedback">
                    <h4>📈 Writing Analysis</h4>
                    <div class="feedback-items">
                        <div class="feedback-item ${wordCount >= 200 ? 'positive' : 'neutral'}">
                            <span class="feedback-icon">${wordCount >= 200 ? '✅' : '⚠️'}</span>
                            <span>Word Count: ${wordCount >= 200 ? 'Good length' : 'Consider more detail'}</span>
                        </div>
                        
                        <div class="feedback-item ${timeUsed < this.currentSession.timeLimit ? 'positive' : 'neutral'}">
                            <span class="feedback-icon">${timeUsed < this.currentSession.timeLimit ? '✅' : '⚠️'}</span>
                            <span>Timing: ${timeUsed < this.currentSession.timeLimit ? 'Finished with time to spare' : 'Used full time'}</span>
                        </div>
                        
                        <div class="feedback-item ${this.currentSession.content.toLowerCase().includes('issue') ? 'positive' : 'neutral'}">
                            <span class="feedback-icon">${this.currentSession.content.toLowerCase().includes('issue') ? '✅' : '⚠️'}</span>
                            <span>Structure: ${this.currentSession.content.toLowerCase().includes('issue') ? 'IRAC format detected' : 'Consider IRAC structure'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h4>💡 Next Steps</h4>
                    <ul>
                        <li>Review the hypothetical facts again to spot any missed issues</li>
                        <li>Compare your analysis with the relevant law from your checklists</li>
                        <li>Practice similar problems to build speed and accuracy</li>
                        <li>Time yourself on shorter practice sessions to build confidence</li>
                    </ul>
                </div>
                
                <div class="summary-actions">
                    <button class="btn-primary" onclick="iracPractice.startIracPractice('${this.currentSession.subject}')">
                        📝 Practice Another
                    </button>
                    <button class="btn-secondary" onclick="app.closeStudyModal()">
                        📊 View Progress
                    </button>
                </div>
            </div>
        `;
    }
    
    // Cleanup
    cleanup() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
        
        this.currentSession = null;
    }
}

// Create global IRAC practice instance
const iracPractice = new IracPractice();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IracPractice;
}