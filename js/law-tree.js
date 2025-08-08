// Interactive Law Tree - Visual organization of legal concepts
// Enhanced tree structure for Dylan & Katelyn's law study

class LawTree {
    constructor() {
        this.activeRule = null;
        this.expandedCategories = new Set();
        this.searchResults = [];
        this.searchTimeout = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Search functionality
        document.addEventListener('input', (e) => {
            if (e.target.id === 'tree-search-input') {
                this.handleSearch(e.target.value);
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#tree-search-input') && !e.target.closest('#tree-search-results')) {
                this.hideSearchResults();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeRuleDetail();
                this.hideSearchResults();
            }
        });
    }
    
    // Display the law tree interface
    showLawTree() {
        const modal = document.getElementById('study-modal');
        const modalTitle = document.getElementById('study-modal-title');
        const modalBody = document.getElementById('study-modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        modalTitle.textContent = '🌳 Law Study Tree';
        modalBody.innerHTML = this.generateTreeInterface();
        modal.classList.add('active');
        
        // Initialize tree state
        this.initializeTreeState();
    }
    
    generateTreeInterface() {
        return `
            <div class="space-y-8">
                <!-- Header - Law Library Archive Style -->
                <div class="text-center legal-paper p-8 rounded-lg shadow-lg retro-border">
                    <i class="fas fa-sitemap text-4xl text-law-navy mb-4"></i>
                    <h3 class="text-3xl font-bold font-serif text-law-navy mb-2">Interactive Law Reference Tree</h3>
                    <p class="text-law-mahogany typewriter-font">Click any rule to view full definition and elements</p>
                </div>
                
                <!-- Search Bar - Retro Terminal Style -->
                <div class="parchment p-6 rounded-lg retro-border relative">
                    <div class="flex items-center gap-3 mb-2">
                        <i class="fas fa-search text-law-navy"></i>
                        <label class="font-bold font-serif text-law-navy">Legal Research Terminal</label>
                    </div>
                    <input type="text" class="w-full p-3 border-2 border-law-navy rounded typewriter-font bg-white" 
                           placeholder="Search rules, elements, or keywords..." id="tree-search-input">
                    <div class="absolute top-full left-0 right-0 bg-white border-2 border-law-navy rounded-b-lg shadow-lg z-10 hidden" id="tree-search-results"></div>
                </div>
                
                <!-- Controls - Law Office Buttons -->
                <div class="flex justify-center gap-4 flex-wrap">
                    <button class="retro-button px-6 py-3 rounded-lg text-law-navy hover:bg-law-gold transition-all duration-200" onclick="lawTree.expandAll()">
                        <i class="fas fa-book-open mr-2"></i>
                        EXPAND ALL
                    </button>
                    <button class="retro-button px-6 py-3 rounded-lg text-law-navy hover:bg-law-gold transition-all duration-200" onclick="lawTree.collapseAll()">
                        <i class="fas fa-book mr-2"></i>
                        COLLAPSE ALL
                    </button>
                    <button class="retro-button px-6 py-3 rounded-lg text-law-navy hover:bg-law-gold transition-all duration-200" onclick="lawTree.showMasteryView()">
                        <i class="fas fa-bullseye mr-2"></i>
                        MASTERY VIEW
                    </button>
                </div>
                
                <!-- Subject Trees - Law Book Collection -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    ${this.generateSubjectTree('contracts')}
                    ${this.generateSubjectTree('torts')}
                    ${this.generateSubjectTree('criminal')}
                </div>
            </div>
            
            <!-- Rule Detail Panel - Retro Law Office Side Panel -->
            <div class="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-40 transform translate-x-full transition-transform duration-300 retro-border" id="rule-detail-panel">
                <div class="wood-panel p-6">
                    <div class="flex justify-between items-center">
                        <div class="text-white">
                            <div class="text-xl font-bold font-serif" id="rule-detail-title"></div>
                            <div class="text-sm typewriter-font" id="rule-detail-subject"></div>
                        </div>
                        <button class="text-white text-2xl hover:text-law-gold transition-colors duration-200" onclick="lawTree.closeRuleDetail()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="p-6 h-full overflow-y-auto pb-20" id="rule-detail-content"></div>
            </div>
        `;
    }
    
    generateSubjectTree(subject) {
        const subjectData = LAW_CONTENT[subject];
        if (!subjectData) return '';
        
        const icons = {
            contracts: 'fas fa-file-contract',
            torts: 'fas fa-gavel', 
            criminal: 'fas fa-university'
        };
        
        return `
            <div class="legal-paper p-6 rounded-lg shadow-lg retro-border">
                <div class="text-center mb-6">
                    <i class="${icons[subject]} text-3xl text-law-navy mb-3"></i>
                    <div class="text-xl font-bold font-serif text-law-navy">
                        ${subjectData.name}
                    </div>
                    <div class="text-sm text-law-mahogany typewriter-font italic mt-2 p-2 bg-law-cream rounded">
                        "${subjectData.mnemonic}"
                    </div>
                </div>
                
                <div class="space-y-4">
                    ${this.generateTreeCategories(subject, subjectData)}
                </div>
            </div>
        `;
    }
    
    generateTreeCategories(subject, subjectData) {
        let html = '';
        
        Object.entries(subjectData.topics).forEach(([categoryKey, category]) => {
            html += `
                <div class="border border-law-navy rounded-lg overflow-hidden">
                    <button class="w-full p-3 bg-law-navy text-white font-bold text-left hover:bg-law-burgundy transition-colors duration-200 flex items-center justify-between" onclick="lawTree.toggleCategory('${subject}-${categoryKey}')">
                        <span class="font-serif">${category.name}</span>
                        <i class="fas fa-chevron-right transform transition-transform duration-200" id="${subject}-${categoryKey}-icon"></i>
                    </button>
                    <div class="hidden bg-white" id="${subject}-${categoryKey}">
                        ${this.generateCategoryTopics(subject, category)}
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    generateCategoryTopics(subject, category) {
        let html = '';
        
        Object.entries(category.topics).forEach(([topicKey, topic]) => {
            const progress = this.getTopicProgress(topic.id);
            const progressClass = this.getProgressClass(progress);
            const progressIcon = this.getProgressIcon(progress);
            
            html += `
                <div class="border-b border-gray-200 last:border-b-0">
                    <div class="p-4 hover:bg-law-cream cursor-pointer transition-colors duration-200 flex items-center justify-between" onclick="lawTree.showRuleDetail('${topic.id}')">
                        <div class="flex-1">
                            <div class="font-bold text-law-navy font-serif mb-1">${topic.title}</div>
                            <div class="text-sm text-law-mahogany typewriter-font">${this.truncateText(topic.rule, 60)}</div>
                        </div>
                        <div class="ml-4 flex items-center gap-2">
                            <span class="text-lg ${this.getProgressColor(progressClass)}">${progressIcon}</span>
                            <i class="fas fa-arrow-right text-law-navy"></i>
                        </div>
                    </div>
            `;
            
            // Add subtopics if they exist
            if (topic.subtopics) {
                html += '<div class="bg-gray-50 border-t border-gray-200">';
                Object.entries(topic.subtopics).forEach(([subtopicKey, subtopic]) => {
                    const subProgress = this.getTopicProgress(subtopic.id);
                    const subProgressClass = this.getProgressClass(subProgress);
                    const subProgressIcon = this.getProgressIcon(subProgress);
                    
                    html += `
                        <div class="p-3 pl-8 hover:bg-white cursor-pointer transition-colors duration-200 flex items-center justify-between border-b border-gray-100 last:border-b-0" onclick="lawTree.showRuleDetail('${subtopic.id}')">
                            <div class="flex-1">
                                <div class="font-semibold text-law-navy font-serif text-sm">${subtopic.title}</div>
                            </div>
                            <div class="ml-4 flex items-center gap-2">
                                <span class="text-sm ${this.getProgressColor(subProgressClass)}">${subProgressIcon}</span>
                                <i class="fas fa-arrow-right text-law-navy text-xs"></i>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }
            
            html += '</div>';
        });
        
        return html;
    }
    
    initializeTreeState() {
        // Auto-expand first category of each subject for better UX
        const subjects = ['contracts', 'torts', 'criminal'];
        subjects.forEach(subject => {
            const firstCategory = Object.keys(LAW_CONTENT[subject].topics)[0];
            if (firstCategory) {
                this.toggleCategory(`${subject}-${firstCategory}`, true);
            }
        });
    }
    
    toggleCategory(categoryId, forceExpand = false) {
        const content = document.getElementById(categoryId);
        const icon = document.getElementById(`${categoryId}-icon`);
        
        if (!content || !icon) return;
        
        const isExpanded = this.expandedCategories.has(categoryId);
        
        if (forceExpand || !isExpanded) {
            // Expand
            content.classList.remove('hidden');
            icon.classList.add('rotate-90');
            this.expandedCategories.add(categoryId);
        } else {
            // Collapse
            content.classList.add('hidden');
            icon.classList.remove('rotate-90');
            this.expandedCategories.delete(categoryId);
        }
    }
    
    expandAll() {
        document.querySelectorAll('[onclick*="toggleCategory"]').forEach(button => {
            const onclick = button.getAttribute('onclick');
            if (onclick) {
                const categoryId = onclick.match(/'([^']+)'/)[1];
                this.toggleCategory(categoryId, true);
            }
        });
    }
    
    collapseAll() {
        document.querySelectorAll('[id*="-icon"]').forEach(icon => {
            icon.classList.remove('rotate-90');
        });
        
        document.querySelectorAll('[id*="contracts-"], [id*="torts-"], [id*="criminal-"]').forEach(content => {
            if (content.id.includes('-icon')) return;
            content.classList.add('hidden');
        });
        
        this.expandedCategories.clear();
    }
    
    showRuleDetail(topicId) {
        const topic = LawContentHelper.getTopicById(topicId);
        if (!topic) return;
        
        this.activeRule = topicId;
        
        const icons = {
            contracts: 'fas fa-file-contract',
            torts: 'fas fa-gavel', 
            criminal: 'fas fa-university'
        };
        
        // Update detail panel
        document.getElementById('rule-detail-title').textContent = topic.title;
        document.getElementById('rule-detail-subject').innerHTML = `<i class="${icons[topic.subject]}"></i> ${LAW_CONTENT[topic.subject].name}`;
        document.getElementById('rule-detail-content').innerHTML = this.generateRuleDetailContent(topic);
        
        // Show panel
        const panel = document.getElementById('rule-detail-panel');
        panel.classList.remove('translate-x-full');
        
        // Update active state
        this.updateActiveStates(topicId);
        
        // Track study activity
        this.recordRuleView(topicId);
    }
    
    generateRuleDetailContent(topic) {
        return `
            <div class="space-y-6">
                <div class="parchment p-4 rounded-lg retro-border">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-book text-law-navy"></i>
                        <h4 class="text-lg font-bold font-serif text-law-navy">Rule Definition</h4>
                    </div>
                    <div class="text-law-mahogany leading-relaxed bg-white p-4 rounded border-l-4 border-law-burgundy typewriter-font">
                        ${topic.rule}
                    </div>
                </div>
                
                <div class="parchment p-4 rounded-lg retro-border">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-list-ol text-law-navy"></i>
                        <h4 class="text-lg font-bold font-serif text-law-navy">Essential Elements</h4>
                    </div>
                    <div class="space-y-2">
                        ${topic.elements.map((element, index) => `
                            <div class="bg-white p-3 rounded border border-law-navy hover:bg-law-cream transition-colors duration-200 flex items-start gap-3">
                                <div class="w-6 h-6 bg-law-navy text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    ${index + 1}
                                </div>
                                <div class="text-law-mahogany typewriter-font text-sm leading-relaxed flex-1">
                                    ${this.processElementWithClickableTerms(element)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${topic.mnemonic ? `
                    <div class="parchment p-4 rounded-lg retro-border">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="fas fa-brain text-law-navy"></i>
                            <h4 class="text-lg font-bold font-serif text-law-navy">Memory Aid</h4>
                        </div>
                        <div class="bg-law-gold/20 p-4 rounded border-2 border-law-gold text-center">
                            <div class="text-law-burgundy font-bold italic text-lg font-serif">
                                "${topic.mnemonic}"
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // Legal term dictionary for clickable definitions
    getLegalTermDefinitions() {
        return {
            'consideration': {
                definition: 'A bargained-for exchange of legal value, where each party gives something of value in return for something else.',
                example: 'Example: Alex promises to pay $500 (consideration) in exchange for Ben\'s promise to deliver a laptop (consideration). Both parties give something of value.'
            },
            'mutual assent': {
                definition: 'Agreement between parties evidenced by offer and acceptance, creating a "meeting of the minds."',
                example: 'Example: Sarah offers to sell her car for $10,000, and John accepts. Their mutual assent creates a binding agreement.'
            },
            'offer': {
                definition: 'A manifestation of willingness to enter into a bargain with definite and certain terms.',
                example: 'Example: "I will sell you my guitar for $300" is an offer with specific terms (guitar, $300, sale).'
            },
            'acceptance': {
                definition: 'Unqualified assent to the terms of an offer by the offeree.',
                example: 'Example: When offered a job at $50,000/year, saying "I accept" creates acceptance and forms a contract.'
            },
            'malice aforethought': {
                definition: 'The mental state required for murder, including intent to kill, intent to cause serious bodily harm, extreme recklessness, or felony murder.',
                example: 'Example: Planning to kill someone (premeditation) or acting with extreme recklessness showing disregard for human life.'
            },
            'proximate cause': {
                definition: 'Legal causation limiting liability to foreseeable consequences of defendant\'s conduct.',
                example: 'Example: Running a red light and hitting another car is proximate cause of the accident, but not of a meteor strike that happened to occur at the same time.'
            },
            'duty of care': {
                definition: 'Legal obligation to conform conduct to a standard that protects others from unreasonable risk of harm.',
                example: 'Example: Drivers have a duty to operate vehicles safely; doctors have a duty to provide competent medical care.'
            },
            'breach': {
                definition: 'Failure to perform any duty or obligation specified in a contract or imposed by law.',
                example: 'Example: Failing to deliver goods on the agreed date breaches the contract terms.'
            },
            'damages': {
                definition: 'Monetary compensation awarded to a party who has suffered loss or injury.',
                example: 'Example: $5,000 awarded for medical bills and lost wages after a car accident.'
            },
            'intent': {
                definition: 'Mental state involving purpose to cause a result or substantial certainty that result will occur.',
                example: 'Example: Throwing a punch intending to hit someone shows intent for battery.'
            },
            'negligence': {
                definition: 'Failure to exercise the standard of care that a reasonably careful person would use in similar circumstances.',
                example: 'Example: Texting while driving falls below the reasonable standard of care expected from drivers.'
            },
            'strict liability': {
                definition: 'Legal responsibility for damages or injury even without fault, negligence, or intent to harm.',
                example: 'Example: Manufacturers are strictly liable for defective products that cause injury, regardless of how careful they were.'
            },
            'actus reus': {
                definition: 'The guilty act or conduct; the physical element of a crime.',
                example: 'Example: Actually taking someone else\'s property is the actus reus of theft.'
            },
            'mens rea': {
                definition: 'The guilty mind; the mental element or intent required for criminal liability.',
                example: 'Example: Intending to permanently deprive someone of their property is the mens rea for theft.'
            },
            'felony': {
                definition: 'A serious crime typically punishable by imprisonment for more than one year.',
                example: 'Example: Murder, burglary, and robbery are felonies; jaywalking is not.'
            },
            'tort': {
                definition: 'A civil wrong that causes harm to another person, resulting in legal liability.',
                example: 'Example: Hitting someone in a fight is the tort of battery, separate from any criminal charges.'
            },
            'plaintiff': {
                definition: 'The party who initiates a lawsuit by filing a complaint.',
                example: 'Example: In Smith v. Jones, Smith is the plaintiff seeking damages from defendant Jones.'
            },
            'defendant': {
                definition: 'The party being sued or accused in a legal proceeding.',
                example: 'Example: In a personal injury case, the person who allegedly caused the injury is the defendant.'
            },
            'burden of proof': {
                definition: 'The obligation to prove allegations or claims in a legal proceeding.',
                example: 'Example: In criminal cases, prosecution has the burden to prove guilt "beyond a reasonable doubt."'
            },
            'unconscionability': {
                definition: 'Contract terms so unfair as to shock the conscience, having both procedural and substantive elements.',
                example: 'Example: A contract with hidden fees in tiny print (procedural) charging 500% interest (substantive) may be unconscionable.'
            },
            'duress': {
                definition: 'Improper threat that overcomes a person\'s free will in contract formation.',
                example: 'Example: "Sign this contract or I\'ll hurt your family" constitutes duress that makes the contract voidable.'
            },
            'conversion': {
                definition: 'Intentional exercise of dominion and control over another\'s personal property.',
                example: 'Example: Taking someone\'s car and selling it without permission is conversion.'
            },
            'trespass': {
                definition: 'Intentional entry onto land in possession of another without permission.',
                example: 'Example: Walking across someone\'s yard without permission constitutes trespass to land.'
            },
            'assault': {
                definition: 'Intent to cause apprehension of imminent harmful or offensive contact.',
                example: 'Example: Swinging a fist at someone but missing still constitutes assault if they reasonably feared being hit.'
            },
            'battery': {
                definition: 'Intent to cause harmful or offensive contact with another person.',
                example: 'Example: Punching someone in the face is battery; touching someone\'s shoulder rudely could also be battery.'
            },
            'causation': {
                definition: 'The causal connection between defendant\'s conduct and plaintiff\'s harm, requiring both factual and proximate cause.',
                example: 'Example: Speeding (conduct) that causes a car accident (harm) shows both but-for causation and proximate causation.'
            },
            'premeditation': {
                definition: 'Thinking about and planning a crime before committing it, required for first-degree murder.',
                example: 'Example: Buying a gun, following the victim, and then shooting them shows premeditation.'
            },
            'burglary': {
                definition: 'Breaking and entering a structure with intent to commit a felony therein.',
                example: 'Example: Breaking into a house intending to steal jewelry constitutes burglary, even if nothing is actually stolen.'
            },
            'larceny': {
                definition: 'Taking and carrying away personal property of another with intent to permanently deprive.',
                example: 'Example: Taking someone\'s bicycle from their yard with intent to keep it is larceny.'
            },
            'reasonable person': {
                definition: 'The objective standard used in law representing how a typical person would act in similar circumstances.',
                example: 'Example: A reasonable person would stop at a red light; failing to do so may constitute negligence.'
            },
            'foreseeability': {
                definition: 'Whether a reasonable person could anticipate that certain consequences might result from their actions.',
                example: 'Example: It\'s foreseeable that speeding in a school zone could result in hitting a child.'
            },
            // DAMAGES TYPES - COMPREHENSIVE COVERAGE
            'special damages': {
                definition: 'Economic losses that can be calculated with mathematical precision, also called consequential damages.',
                example: 'Example: $5,000 in medical bills, $2,000 in lost wages, $800 car repair - all specific, calculable amounts.'
            },
            'general damages': {
                definition: 'Non-economic losses that cannot be precisely calculated, like pain and suffering.',
                example: 'Example: $50,000 for pain and suffering from a broken leg - subjective amount based on jury discretion.'
            },
            'consequential damages': {
                definition: 'Indirect damages that flow from breach but are not the direct result, must be foreseeable.',
                example: 'Example: Late delivery of flour causes bakery to lose $10,000 wedding cake contract - consequential damage.'
            },
            'incidental damages': {
                definition: 'Expenses reasonably incurred as a result of breach, like storage or inspection costs.',
                example: 'Example: $500 to store rejected goods and $200 to inspect defective machinery - incidental damages.'
            },
            'liquidated damages': {
                definition: 'Pre-agreed damages specified in contract for breach, must be reasonable estimate.',
                example: 'Example: Contract states "$500/day for late completion" - liquidated damages if amount is reasonable.'
            },
            'punitive damages': {
                definition: 'Damages awarded to punish defendant and deter similar conduct, beyond compensation.',
                example: 'Example: $1 million punitive award against company for knowingly selling dangerous products.'
            },
            'nominal damages': {
                definition: 'Small symbolic damages awarded when legal right violated but no actual harm proven.',
                example: 'Example: $1 awarded for trespass where no property damage occurred - validates legal right.'
            },
            'expectation damages': {
                definition: 'Money damages to put plaintiff in position they would have been in if contract performed.',
                example: 'Example: Contract price was $1000, market price $1200 - expectation damages = $200 difference.'
            },
            'reliance damages': {
                definition: 'Damages to restore plaintiff to position before contract, covering out-of-pocket expenses.',
                example: 'Example: $3000 spent preparing for performance before other party breached contract.'
            },
            'restitution damages': {
                definition: 'Money to prevent unjust enrichment, restoring value defendant received.',
                example: 'Example: Contractor paid $5000 but did no work - restitution damages = $5000 return.'
            },
            // CONSTITUTIONAL PRIVILEGES & DEFENSES
            'constitutional privileges': {
                definition: 'First Amendment protections that serve as defenses to defamation claims.',
                example: 'Example: Newspaper criticism of public official requires "actual malice" standard, not just falsity.'
            },
            'actual malice': {
                definition: 'Knowledge of falsity or reckless disregard for truth, required for defamation of public figures.',
                example: 'Example: Publishing story knowing it\'s false or not bothering to verify obvious lies about mayor.'
            },
            'qualified privilege': {
                definition: 'Conditional immunity for statements made in certain relationships, lost if abused.',
                example: 'Example: Employment reference has qualified privilege unless employer acts with malice.'
            },
            'absolute privilege': {
                definition: 'Complete immunity for statements made in certain proceedings, cannot be lost.',
                example: 'Example: Attorney statements in court proceedings have absolute privilege, even if false.'
            },
            'public figure': {
                definition: 'Person who assumes prominent role in public affairs, subject to actual malice standard.',
                example: 'Example: Politicians, celebrities, and public activists are public figures requiring higher proof.'
            },
            'limited purpose public figure': {
                definition: 'Private person who voluntarily enters public controversy on specific issue.',
                example: 'Example: Private citizen who leads campaign against new highway becomes limited public figure.'
            },
            // CONTRACT FORMATION ELEMENTS
            'bargained-for exchange': {
                definition: 'Each party\'s promise or performance is sought by other party and given in exchange.',
                example: 'Example: "I\'ll pay $100 if you mow my lawn" - money sought for service, service given for money.'
            },
            'legal detriment': {
                definition: 'Doing something you\'re not legally obligated to do or refraining from legal right.',
                example: 'Example: Promising not to smoke (giving up legal right) or promising to paint house (new obligation).'
            },
            'legal benefit': {
                definition: 'Receiving something of value or having legal right to receive performance.',
                example: 'Example: Receiving promised payment or getting legal right to demand contracted services.'
            },
            'past consideration': {
                definition: 'Act performed before promise made, generally not valid consideration.',
                example: 'Example: "Thanks for helping me move last week, I\'ll pay you $100" - promise unenforceable.'
            },
            'pre-existing duty': {
                definition: 'Promise to do what one is already legally obligated to do, not valid consideration.',
                example: 'Example: Police officer can\'t get reward for arresting criminals - already duty to do so.'
            },
            'moral consideration': {
                definition: 'Promise based on moral obligation without legal detriment, generally unenforceable.',
                example: 'Example: "I feel bad about your loss, I\'ll pay your bills" - moral but not legal consideration.'
            },
            // CRIMINAL LAW MENTAL STATES
            'purposely': {
                definition: 'Mental state where actor\'s conscious object is to cause the result (MPC §2.02).',
                example: 'Example: Aiming gun at victim intending to kill them - conscious object is death.'
            },
            'knowingly': {
                definition: 'Actor is aware conduct will cause result or is practically certain to cause result.',
                example: 'Example: Throwing brick from overpass into traffic - practically certain to cause harm.'
            },
            'recklessly': {
                definition: 'Consciously disregarding substantial and unjustifiable risk that result will occur.',
                example: 'Example: Racing car through school zone - aware of risk but disregarding it.'
            },
            'criminal negligence': {
                definition: 'Should be aware of substantial and unjustifiable risk but fails to perceive it.',
                example: 'Example: Leaving loaded gun where children play - should realize risk even if unaware.'
            },
            'specific intent': {
                definition: 'Intent to cause specific result beyond the act itself, required for certain crimes.',
                example: 'Example: Burglary requires intent to commit felony inside, not just intent to enter.'
            },
            'general intent': {
                definition: 'Intent to perform the act that constitutes the crime, no additional specific intent required.',
                example: 'Example: Battery requires intent to make contact, not intent to cause specific injury.'
            },
            'transferred intent': {
                definition: 'Intent transfers from intended victim to actual victim when harm occurs.',
                example: 'Example: Shooting at A but hitting B - intent transfers, still liable for harming B.'
            },
            // TORT DEFENSES & PRIVILEGES
            'self-defense': {
                definition: 'Right to use reasonable force to protect oneself from imminent harmful or offensive contact.',
                example: 'Example: Punching attacker who swings first is justified self-defense if force is proportional.'
            },
            'defense of others': {
                definition: 'Right to use reasonable force to protect third parties from harm.',
                example: 'Example: Tackling person attacking your friend is justified defense of others.'
            },
            'defense of property': {
                definition: 'Right to use reasonable non-deadly force to protect real or personal property.',
                example: 'Example: Pushing trespasser off your land is justified, but shooting them is not.'
            },
            'necessity': {
                definition: 'Privilege to commit tort when reasonably necessary to avoid greater harm.',
                example: 'Example: Trespassing on private property to escape from attacking dog - necessity defense.'
            },
            'private necessity': {
                definition: 'Privilege to use another\'s property to protect own interests, but must pay for damage.',
                example: 'Example: Docking boat at private pier during storm - privileged but must pay pier damage.'
            },
            'public necessity': {
                definition: 'Privilege to harm private property to protect public interest, no liability for damage.',
                example: 'Example: Firefighters destroying house to create firebreak - public necessity, no liability.'
            },
            'consent': {
                definition: 'Voluntary agreement to conduct that would otherwise be tortious, eliminating liability.',
                example: 'Example: Agreeing to boxing match means consenting to being punched within rules.'
            },
            'implied consent': {
                definition: 'Consent inferred from circumstances and conduct rather than express agreement.',
                example: 'Example: Playing football implies consent to normal physical contact during game.'
            },
            // PROPERTY & THEFT CRIMES
            'asportation': {
                definition: 'Carrying away element of larceny, any movement of property however slight.',
                example: 'Example: Moving stolen item from shelf to pocket satisfies asportation requirement.'
            },
            'caption': {
                definition: 'Taking possession or control of property, first element of larceny.',
                example: 'Example: Picking up someone\'s wallet satisfies caption even if not moved away yet.'
            },
            'trespassory taking': {
                definition: 'Taking property without consent of owner, distinguishing larceny from conversion.',
                example: 'Example: Employee stealing from register vs. employee keeping entrusted money (embezzlement).'
            },
            'intent to permanently deprive': {
                definition: 'Mental state for larceny requiring intent to deprive owner of property permanently.',
                example: 'Example: Taking car intending to return it after joyride is not larceny (no permanent deprivation).'
            },
            'constructive possession': {
                definition: 'Legal possession through another person or legal relationship, not physical possession.',
                example: 'Example: Bank has constructive possession of money in safe deposit box through bailment.'
            },
            // ADVANCED CONTRACT CONCEPTS
            'parol evidence rule': {
                definition: 'Integrated written contract cannot be contradicted by prior or contemporaneous oral agreements.',
                example: 'Example: Signed lease says $1000/month - cannot introduce oral evidence that parties agreed to $800.'
            },
            'integration': {
                definition: 'Written contract that parties intended as final expression of their agreement.',
                example: 'Example: Contract with "This constitutes entire agreement" clause shows integration intent.'
            },
            'merger clause': {
                definition: 'Contract provision stating written agreement supersedes all prior negotiations.',
                example: 'Example: "This contract contains the entire agreement between parties" - merger clause.'
            },
            'course of dealing': {
                definition: 'Pattern of conduct between parties in previous transactions under UCC.',
                example: 'Example: Always accepting late deliveries in past creates course of dealing allowing lateness.'
            },
            'usage of trade': {
                definition: 'Regular practice in particular trade or industry that gives meaning to contract terms.',
                example: 'Example: In construction, "finished by spring" means May 1st by usage of trade.'
            },
            'course of performance': {
                definition: 'How parties actually perform under current contract, shows their understanding.',
                example: 'Example: Accepting partial deliveries monthly shows course of performance for "delivery" term.'
            },
            // ADVANCED TORT CONCEPTS
            'res ipsa loquitur': {
                definition: 'Doctrine allowing negligence inference when harm ordinarily wouldn\'t occur without negligence.',
                example: 'Example: Surgical instrument left in patient - "the thing speaks for itself" about negligence.'
            },
            'negligence per se': {
                definition: 'Violation of statute designed to protect class of people establishes duty and breach.',
                example: 'Example: Speeding in violation of safety statute is negligence per se if accident results.'
            },
            'assumption of risk': {
                definition: 'Defense when plaintiff voluntarily encounters known risk, barring recovery.',
                example: 'Example: Attending baseball game assumes risk of being hit by foul ball.'
            },
            'comparative negligence': {
                definition: 'Plaintiff\'s recovery reduced by percentage of their own fault in causing harm.',
                example: 'Example: $100K damages, plaintiff 30% at fault = recovery reduced to $70K.'
            },
            'contributory negligence': {
                definition: 'Any negligence by plaintiff that contributes to harm completely bars recovery.',
                example: 'Example: Jaywalking pedestrian hit by speeding driver recovers nothing under contributory negligence.'
            },
            'last clear chance': {
                definition: 'Doctrine allowing contributorily negligent plaintiff to recover if defendant had last opportunity to avoid harm.',
                example: 'Example: Jaywalker can recover if driver saw them and could have stopped but didn\'t.'
            },
            'attractive nuisance': {
                definition: 'Landowner liable to trespassing children if dangerous condition likely to attract them.',
                example: 'Example: Unfenced swimming pool that attracts neighborhood children creates attractive nuisance liability.'
            },
            'invitee': {
                definition: 'Person invited onto land for business purpose, owed highest duty of care.',
                example: 'Example: Store customers are invitees owed duty to inspect for and warn of dangers.'
            },
            'licensee': {
                definition: 'Person on land with permission but for own purpose, owed duty to warn of known dangers.',
                example: 'Example: Social guests are licensees - must warn of known dangers but no duty to inspect.'
            },
            'trespasser': {
                definition: 'Person on land without permission, generally owed no duty except no intentional harm.',
                example: 'Example: Burglar is trespasser owed no duty to make premises safe, but can\'t set traps.'
            },
            // ADDITIONAL ESSENTIAL TERMS
            'material breach': {
                definition: 'Breach so fundamental it defeats the essential purpose of the contract.',
                example: 'Example: Wedding caterer not showing up is material breach; being 10 minutes late is not.'
            },
            'anticipatory repudiation': {
                definition: 'Clear indication before performance due that party will not perform contractual duties.',
                example: 'Example: "I\'m not delivering your goods next month" before delivery date - anticipatory repudiation.'
            },
            'adequate assurance': {
                definition: 'UCC right to demand proof of performance when reasonable grounds for insecurity exist.',
                example: 'Example: If supplier seems financially troubled, buyer can demand adequate assurance of delivery.'
            },
            'cover': {
                definition: 'UCC buyer\'s remedy of purchasing substitute goods after seller\'s breach.',
                example: 'Example: Seller doesn\'t deliver widgets, buyer purchases elsewhere - cover damages = price difference.'
            },
            'mitigation of damages': {
                definition: 'Duty to take reasonable steps to minimize harm from other party\'s breach.',
                example: 'Example: Fired employee must look for new job - can\'t just sit home and collect full salary damages.'
            },
            'substantial performance': {
                definition: 'Performance that meets essential purpose of contract despite minor deviations.',
                example: 'Example: House built to specifications except wrong color doorknobs - substantial performance achieved.'
            },
            'perfect tender rule': {
                definition: 'UCC rule allowing buyer to reject goods that fail to conform exactly to contract.',
                example: 'Example: Order 100 red widgets, receive 99 red and 1 blue - can reject entire shipment.'
            },
            'good faith': {
                definition: 'Duty to act honestly and fairly in performance and enforcement of contracts.',
                example: 'Example: Employer can\'t fire at-will employee day before pension vests - lacks good faith.'
            },
            'commercial reasonableness': {
                definition: 'UCC standard requiring actions consistent with honest dealing and accepted practices.',
                example: 'Example: Reselling breached goods must be done in commercially reasonable manner.'
            },
            'battle of the forms': {
                definition: 'UCC § 2-207 rules for determining contract terms when forms differ.',
                example: 'Example: Buyer sends purchase order, seller sends acknowledgment with different terms - which controls?'
            },
            'mailbox rule': {
                definition: 'Acceptance effective upon dispatch, not receipt (with exceptions).',
                example: 'Example: Acceptance letter mailed Monday creates contract Monday, even if received Wednesday.'
            },
            'mirror image rule': {
                definition: 'Common law rule requiring acceptance to exactly match offer terms.',
                example: 'Example: Offer says "$100," response "I\'ll pay $95" is counteroffer, not acceptance.'
            },
            'option contract': {
                definition: 'Contract giving right to accept offer for specified time, prevents revocation.',
                example: 'Example: "You have 30 days to buy my car for $10,000" with consideration - irrevocable option.'
            },
            'firm offer': {
                definition: 'UCC rule making merchant\'s signed offer irrevocable for stated time (max 3 months).',
                example: 'Example: Written offer from car dealer "This price good for 60 days" - irrevocable firm offer.'
            },
            'output contract': {
                definition: 'Contract for buyer to purchase all seller produces, requires good faith.',
                example: 'Example: "I\'ll buy all widgets you manufacture this year" - valid output contract.'
            },
            'requirements contract': {
                definition: 'Contract for seller to supply all buyer needs, requires good faith.',
                example: 'Example: "You\'ll supply all coal I need for my factory" - valid requirements contract.'
            },
            'statute of limitations': {
                definition: 'Time limit for bringing legal action, varies by type of claim.',
                example: 'Example: Personal injury claims typically must be filed within 2-3 years of injury.'
            },
            'laches': {
                definition: 'Equitable defense based on unreasonable delay in asserting rights.',
                example: 'Example: Waiting 20 years to sue for copyright infringement may be barred by laches.'
            },
            'estoppel': {
                definition: 'Doctrine preventing party from asserting position inconsistent with prior conduct.',
                example: 'Example: Landlord accepting late rent for months is estopped from claiming breach for lateness.'
            },
            'waiver': {
                definition: 'Voluntary relinquishment of known right, can be express or implied.',
                example: 'Example: Consistently accepting late payments waives right to demand timely payment.'
            },
            'novation': {
                definition: 'Agreement substituting new party for original party, discharging original obligations.',
                example: 'Example: All parties agree buyer\'s friend will take over purchase contract - novation.'
            },
            'assignment': {
                definition: 'Transfer of contractual rights to third party, assignor remains liable.',
                example: 'Example: Contractor assigns right to payment to bank as collateral - assignment of rights.'
            },
            'delegation': {
                definition: 'Transfer of contractual duties to third party, delegator remains liable.',
                example: 'Example: Contractor hires subcontractor to do work - delegation of duties.'
            },
            // COMPOUND TERMS & SPECIFIC ELEMENT WORDS
            'presumed damages': {
                definition: 'Damages presumed by law without proof of actual harm, typically in libel cases.',
                example: 'Example: Written false statement about someone\'s professional competence - law presumes damages occurred.'
            },
            'per se damages': {
                definition: 'Damages that are presumed from certain types of defamatory statements without proving actual harm.',
                example: 'Example: Falsely calling someone a criminal creates per se damages - no need to prove reputation loss.'
            },
            'slander per se': {
                definition: 'Spoken defamation in specific categories that are presumed harmful without proof of damages.',
                example: 'Example: Falsely claiming someone has STD, committed crime, is incompetent at job, or is unchaste.'
            },
            'libel per se': {
                definition: 'Written defamation that is presumed harmful on its face without proof of special damages.',
                example: 'Example: Newspaper article falsely stating doctor committed malpractice - libel per se.'
            },
            'actual damages': {
                definition: 'Proven monetary losses that can be calculated and documented.',
                example: 'Example: $10,000 in medical bills and $5,000 in lost wages - actual provable damages.'
            },
            'pecuniary damages': {
                definition: 'Monetary losses, same as actual or special damages, measurable in dollars.',
                example: 'Example: Lost business income of $50,000 due to defamatory statements - pecuniary harm.'
            },
            'emotional distress': {
                definition: 'Mental suffering including anxiety, humiliation, and psychological trauma.',
                example: 'Example: Severe anxiety and depression following assault - compensable emotional distress.'
            },
            'severe emotional distress': {
                definition: 'Mental suffering so intense that no reasonable person could endure it.',
                example: 'Example: PTSD requiring hospitalization after witnessing gruesome accident - severe distress.'
            },
            'extreme and outrageous conduct': {
                definition: 'Behavior that exceeds all bounds of decency and is utterly intolerable in civilized society.',
                example: 'Example: Falsely telling parent their child died in accident as prank - extreme and outrageous.'
            },
            'reasonable apprehension': {
                definition: 'Victim\'s awareness and expectation of imminent harmful or offensive contact.',
                example: 'Example: Seeing fist coming toward face creates reasonable apprehension of being hit.'
            },
            'imminent contact': {
                definition: 'Physical touching that will occur immediately or very soon, not future harm.',
                example: 'Example: Punch about to land is imminent; threat to hit "next week" is not imminent.'
            },
            'harmful contact': {
                definition: 'Physical touching that causes pain, injury, or bodily damage.',
                example: 'Example: Punch causing bruise, kick breaking bone - harmful physical contact.'
            },
            'offensive contact': {
                definition: 'Physical touching that offends reasonable sense of dignity, even without injury.',
                example: 'Example: Unwanted kiss, spitting on someone, touching intimate areas - offensive contact.'
            },
            'person of another': {
                definition: 'Victim\'s body, clothing, or objects closely connected to them.',
                example: 'Example: Hitting someone\'s hat they\'re wearing or cane they\'re holding - contact with person.'
            },
            'without consent': {
                definition: 'Lacking voluntary agreement to the contact or conduct.',
                example: 'Example: Touching someone who said "don\'t touch me" or unconscious person - without consent.'
            },
            'reasonable confinement': {
                definition: 'Restraint that significantly restricts freedom of movement within fixed boundaries.',
                example: 'Example: Locking in room, blocking only exit, or physical restraint - reasonable confinement.'
            },
            'awareness of confinement': {
                definition: 'Victim knows they are being restrained or confined against their will.',
                example: 'Example: Person realizes door is locked and they can\'t leave - aware of confinement.'
            },
            'reasonable means of escape': {
                definition: 'Safe, practical way to leave confinement without risk or embarrassment.',
                example: 'Example: Open window on first floor is reasonable escape; second floor window is not.'
            },
            'not privileged': {
                definition: 'Action lacks legal justification or excuse under law.',
                example: 'Example: Store security can detain suspected shoplifter (privileged); random person cannot (not privileged).'
            },
            'legal justification': {
                definition: 'Lawful reason or excuse that makes otherwise wrongful conduct permissible.',
                example: 'Example: Police arrest (legal justification for restraint); parent disciplining child (privilege).'
            },
            'factual causation': {
                definition: 'Defendant\'s conduct was necessary for harm to occur - "but for" test.',
                example: 'Example: But for running red light, accident wouldn\'t have happened - factual causation exists.'
            },
            'but-for causation': {
                definition: 'Harm would not have occurred but for defendant\'s conduct.',
                example: 'Example: "But for leaving banana peel on floor, slip wouldn\'t have happened" - but-for cause.'
            },
            'substantial factor': {
                definition: 'When multiple causes contribute, each cause that materially contributed to harm.',
                example: 'Example: Two fires merge to burn house - each fire is substantial factor in destruction.'
            },
            'intervening cause': {
                definition: 'Event occurring after defendant\'s conduct that contributes to harm.',
                example: 'Example: Car accident victim dies from infection at hospital - infection is intervening cause.'
            },
            'superseding cause': {
                definition: 'Unforeseeable intervening cause that breaks chain of causation, relieving defendant of liability.',
                example: 'Example: Meteor hits ambulance carrying accident victim - superseding cause of death.'
            },
            'foreseeable result': {
                definition: 'Consequence that reasonable person could anticipate from the conduct.',
                example: 'Example: Speeding in rain makes accident foreseeable result of reckless driving.'
            },
            'chain of causation': {
                definition: 'Connected sequence of events linking defendant\'s conduct to plaintiff\'s harm.',
                example: 'Example: Speeding → losing control → hitting tree → injury - unbroken chain of causation.'
            },
            'standard of care': {
                definition: 'Level of caution and attention that reasonable person would use in similar circumstances.',
                example: 'Example: Doctor must use care that reasonably competent physician would use in same situation.'
            },
            'reasonable care': {
                definition: 'Degree of caution that ordinarily prudent person would exercise under same circumstances.',
                example: 'Example: Checking blind spot before changing lanes shows reasonable care while driving.'
            },
            'unreasonable risk': {
                definition: 'Danger that reasonable person would not create or tolerate under the circumstances.',
                example: 'Example: Texting while driving creates unreasonable risk of harm to others.'
            },
            'breach of duty': {
                definition: 'Failure to meet the required standard of care owed to another person.',
                example: 'Example: Surgeon leaving instrument in patient breaches duty of reasonable medical care.'
            },
            'actual harm': {
                definition: 'Real injury or damage that plaintiff suffered, not speculative or potential harm.',
                example: 'Example: Broken bone, property damage, or lost income - actual provable harm occurred.'
            },
            'physical harm': {
                definition: 'Bodily injury or damage to person\'s physical well-being.',
                example: 'Example: Broken arm, concussion, or internal injuries - physical harm to body.'
            },
            'reasonably foreseeable': {
                definition: 'Consequence that reasonable person could predict might result from the conduct.',
                example: 'Example: Leaving ice on sidewalk makes slip and fall reasonably foreseeable.'
            },
            'zone of danger': {
                definition: 'Area where person is at risk of physical harm from defendant\'s negligent conduct.',
                example: 'Example: Pedestrian near speeding car is in zone of danger; person miles away is not.'
            },
            'duty to warn': {
                definition: 'Obligation to inform others of known dangers or risks.',
                example: 'Example: Landowner must warn social guests about hidden pit in backyard.'
            },
            'duty to inspect': {
                definition: 'Obligation to examine premises or property for dangerous conditions.',
                example: 'Example: Store owner must inspect aisles for spills that could cause customers to slip.'
            },
            'known dangers': {
                definition: 'Hazards that person is actually aware exist.',
                example: 'Example: Homeowner knows back step is loose - known danger requiring warning to guests.'
            },
            'hidden dangers': {
                definition: 'Hazards that are not obvious or apparent to reasonable inspection.',
                example: 'Example: Electrical wire buried under walkway - hidden danger not obvious to visitors.'
            },
            'open and obvious': {
                definition: 'Danger that is apparent to reasonable person using ordinary senses.',
                example: 'Example: Large pothole in bright daylight is open and obvious hazard.'
            },
            'business purpose': {
                definition: 'Commercial reason for entering property that benefits the landowner.',
                example: 'Example: Customer shopping in store enters for business purpose benefiting store owner.'
            },
            'social guest': {
                definition: 'Person invited onto property for social reasons, not business purposes.',
                example: 'Example: Friend coming to dinner party is social guest, not business visitor.'
            },
            'scope of employment': {
                definition: 'Activities reasonably connected to employee\'s job duties and employer\'s business.',
                example: 'Example: Delivery driver making deliveries is in scope; stopping for personal shopping is not.'
            },
            'frolic and detour': {
                definition: 'Employee\'s deviation from work duties for personal reasons.',
                example: 'Example: Mail carrier stopping at bar for drinks - frolic outside scope of employment.'
            },
            'independent contractor': {
                definition: 'Person hired to perform specific task with control over methods and means.',
                example: 'Example: Plumber hired to fix pipes controls how work is done - independent contractor.'
            },
            'right of control': {
                definition: 'Authority to direct how, when, and where work is performed.',
                example: 'Example: Employer telling employee what to do and how to do it - right of control.'
            },
            'course of dealing': {
                definition: 'Pattern of conduct between parties in previous transactions.',
                example: 'Example: Always accepting delivery on Mondays creates course of dealing for timing.'
            },
            'trade usage': {
                definition: 'Regular practice in particular industry that gives meaning to contract terms.',
                example: 'Example: In lumber trade, "thousand" means 1200 board feet, not 1000 - trade usage.'
            },
            'commercial unit': {
                definition: 'Single whole for purposes of sale, division of which materially impairs value.',
                example: 'Example: Matched set of furniture is commercial unit - can\'t reject just one piece.'
            },
            'conforming goods': {
                definition: 'Goods that meet contract specifications exactly.',
                example: 'Example: Order red widgets, receive red widgets of correct size - conforming goods.'
            },
            'non-conforming goods': {
                definition: 'Goods that fail to meet contract specifications in any respect.',
                example: 'Example: Order 100 items, receive 99 - non-conforming delivery under perfect tender rule.'
            }
        };
    }
    
    // Process element text to make complex legal terms clickable
    processElementWithClickableTerms(element) {
        const definitions = this.getLegalTermDefinitions();
        let processedElement = element;
        
        // Sort terms by length (longest first) to avoid partial matches
        const sortedTerms = Object.keys(definitions).sort((a, b) => b.length - a.length);
        
        // Find and replace legal terms with clickable spans
        sortedTerms.forEach(term => {
            // Escape special regex characters but preserve word boundaries
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
            const replacement = `<span class="clickable-term text-law-navy font-semibold underline cursor-pointer hover:text-law-burgundy transition-colors duration-200" onclick="lawTree.showTermDefinition('${term}')" title="Click for definition">${term}</span>`;
            processedElement = processedElement.replace(regex, replacement);
        });
        
        return processedElement;
    }
    
    // Show definition popup for legal terms
    showTermDefinition(term) {
        const definitions = this.getLegalTermDefinitions();
        const termData = definitions[term.toLowerCase()];
        
        if (!termData) return;
        
        // Create and show definition modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="legal-paper max-w-lg w-full mx-4 rounded-lg shadow-2xl retro-border">
                <div class="wood-panel p-4 rounded-t-lg">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold font-serif text-white capitalize">${term}</h3>
                        <button class="text-white text-2xl hover:text-law-gold transition-colors duration-200" onclick="this.closest('.fixed').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="mb-4">
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-book text-law-navy"></i>
                            <h4 class="font-bold font-serif text-law-navy">Definition</h4>
                        </div>
                        <div class="bg-gray-50 p-4 rounded border-l-4 border-law-burgundy">
                            <p class="text-gray-700 leading-relaxed">${termData.definition}</p>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <i class="fas fa-lightbulb text-law-navy"></i>
                            <h4 class="font-bold font-serif text-law-navy">Example</h4>
                        </div>
                        <div class="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                            <p class="text-gray-700 leading-relaxed">${termData.example}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    
    closeRuleDetail() {
        const panel = document.getElementById('rule-detail-panel');
        panel.classList.add('translate-x-full');
        this.activeRule = null;
        this.updateActiveStates(null);
    }
    
    updateActiveStates(activeTopicId) {
        // Remove all active states
        document.querySelectorAll('.topic-item, .subtopic-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active state to selected rule
        if (activeTopicId) {
            const activeItems = document.querySelectorAll(`[onclick*="${activeTopicId}"]`);
            activeItems.forEach(item => {
                if (item.classList.contains('topic-item') || item.classList.contains('subtopic-item')) {
                    item.classList.add('active');
                }
            });
        }
    }
    
    // Search functionality
    handleSearch(query) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }
    
    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideSearchResults();
            return;
        }
        
        const results = this.searchRules(query.toLowerCase());
        this.displaySearchResults(results);
    }
    
    searchRules(query) {
        const results = [];
        
        Object.keys(LAW_CONTENT).forEach(subject => {
            const topics = LawContentHelper.getAllTopics(subject);
            
            topics.forEach(topic => {
                let matches = 0;
                let matchTypes = [];
                
                // Check title match
                if (topic.title.toLowerCase().includes(query)) {
                    matches += 3;
                    matchTypes.push('title');
                }
                
                // Check rule match
                if (topic.rule.toLowerCase().includes(query)) {
                    matches += 2;
                    matchTypes.push('rule');
                }
                
                // Check elements match
                const elementMatches = topic.elements.filter(element => 
                    element.toLowerCase().includes(query)
                ).length;
                if (elementMatches > 0) {
                    matches += elementMatches;
                    matchTypes.push('elements');
                }
                
                // Check mnemonic match
                if (topic.mnemonic && topic.mnemonic.toLowerCase().includes(query)) {
                    matches += 1;
                    matchTypes.push('mnemonic');
                }
                
                if (matches > 0) {
                    results.push({
                        topic,
                        relevance: matches,
                        matchTypes
                    });
                }
            });
        });
        
        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
    }
    
    displaySearchResults(results) {
        const container = document.getElementById('tree-search-results');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = '<div class="p-4 text-center text-law-mahogany typewriter-font">No rules found</div>';
        } else {
            container.innerHTML = results.map(result => `
                <div class="p-3 hover:bg-law-cream cursor-pointer border-b border-gray-200 last:border-b-0" onclick="lawTree.selectSearchResult('${result.topic.id}')">
                    <div class="font-bold text-law-navy font-serif">${result.topic.title}</div>
                    <div class="text-sm text-law-mahogany typewriter-font">${LAW_CONTENT[result.topic.subject].name}</div>
                </div>
            `).join('');
        }
        
        container.classList.remove('hidden');
    }
    
    hideSearchResults() {
        const container = document.getElementById('tree-search-results');
        if (container) {
            container.classList.add('hidden');
        }
    }
    
    selectSearchResult(topicId) {
        this.hideSearchResults();
        this.showRuleDetail(topicId);
        
        // Clear search input
        const searchInput = document.getElementById('tree-search-input');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    // Mastery view
    showMasteryView() {
        // Filter and highlight based on mastery levels
        const masteryFilter = prompt('Show rules by mastery level:\n1 = New (never studied)\n2 = Learning (1-2 ★)\n3 = Mastered (4-5 ★)\n\nEnter 1, 2, or 3:');
        
        if (!masteryFilter || !['1', '2', '3'].includes(masteryFilter)) {
            return;
        }
        
        this.filterByMastery(parseInt(masteryFilter));
    }
    
    filterByMastery(level) {
        document.querySelectorAll('.topic-item, .subtopic-item').forEach(item => {
            const progressEl = item.querySelector('.topic-progress');
            let show = false;
            
            if (level === 1 && progressEl.classList.contains('new')) show = true;
            if (level === 2 && progressEl.classList.contains('learning')) show = true;
            if (level === 3 && progressEl.classList.contains('mastered')) show = true;
            
            item.style.display = show ? 'block' : 'none';
        });
        
        // Expand all categories to show filtered results
        this.expandAll();
    }
    
    // Study actions
    studyRule(topicId) {
        // Mark as studied and update progress
        this.recordStudySession(topicId);
        app.showNotification('📚 Rule marked as studied!');
        
        // Update display
        this.showRuleDetail(topicId);
    }
    
    addToFlashcards(topicId) {
        app.showNotification('🗂️ Added to flashcard deck!');
        // Could integrate with flashcard system here
    }
    
    practiceRule(topicId) {
        // Could open IRAC practice with this specific rule
        app.showNotification('✍️ Opening practice mode...');
    }
    
    // Helper methods
    getTopicProgress(topicId) {
        if (!app?.currentUser) return null;
        const userProgress = tursoSync.getUserProgress(app.currentUser);
        return userProgress[topicId];
    }
    
    getProgressClass(progress) {
        if (!progress) return 'new';
        if (progress.masteryLevel >= 4) return 'mastered';
        if (progress.masteryLevel >= 1) return 'learning';
        return 'new';
    }
    
    getProgressIcon(progress) {
        if (!progress) return '<i class="fas fa-circle"></i>';
        if (progress.masteryLevel >= 4) return '<i class="fas fa-check-circle"></i>';
        if (progress.masteryLevel >= 1) return '<i class="fas fa-play-circle"></i>';
        return '<i class="fas fa-circle"></i>';
    }
    
    getProgressColor(progressClass) {
        switch(progressClass) {
            case 'mastered': return 'text-green-600';
            case 'learning': return 'text-yellow-600';
            case 'new': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    recordRuleView(topicId) {
        // Track that user viewed this rule
        if (app?.currentUser) {
            const timestamp = new Date().toISOString();
            // Could save to local storage or database
            console.log(`Rule viewed: ${topicId} at ${timestamp}`);
        }
    }
    
    recordStudySession(topicId) {
        // Record a study session for this rule
        if (app?.currentUser) {
            const currentProgress = this.getTopicProgress(topicId) || {
                masteryLevel: 0,
                studyCount: 0,
                confidence: 1,
                timeSpent: 0
            };
            
            const updatedProgress = {
                ...currentProgress,
                studyCount: currentProgress.studyCount + 1,
                masteryLevel: Math.min(currentProgress.masteryLevel + 0.5, 5),
                timeSpent: currentProgress.timeSpent + 5, // 5 minutes
                lastStudied: new Date().toISOString()
            };
            
            tursoSync.updateProgress(app.currentUser, topicId, updatedProgress);
        }
    }
}

// Create global law tree instance
const lawTree = new LawTree();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LawTree;
}