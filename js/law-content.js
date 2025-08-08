// Law Study Content - Complete checklists from Dylan's materials
// Organized data for Contracts, Torts, and Criminal Law

const LAW_CONTENT = {
    contracts: {
        name: 'Contracts',
        emoji: '📋',
        mnemonic: 'Failure To Contract Deserves Better Review',
        color: '#3b82f6',
        topics: {
            formation: {
                name: 'Formation',
                category: 'I. Formation',
                topics: {
                    governing_law: {
                        id: 'contracts_formation_governing_law',
                        title: 'A. Governing Law',
                        rule: 'Determine whether UCC (goods) or Common Law (services/real estate) applies.',
                        elements: ['Identify subject matter', 'Goods = UCC Article 2', 'Services/Real Estate = Common Law'],
                        difficulty: 1
                    },
                    valid_contract: {
                        id: 'contracts_valid_contract',
                        title: 'B. Valid Contract',
                        rule: 'A valid contract requires mutual assent, consideration, and no defenses.',
                        elements: ['Mutual assent (offer + acceptance)', 'Consideration', 'No defenses to formation'],
                        difficulty: 2,
                        subtopics: {
                            mutual_assent: {
                                id: 'contracts_mutual_assent',
                                title: '1. Mutual Assent',
                                rule: 'Mutual assent requires a valid offer and acceptance.',
                                elements: ['Valid offer', 'Valid acceptance', 'Meeting of the minds'],
                                difficulty: 2,
                                subtopics: {
                                    offer: {
                                        id: 'contracts_offer',
                                        title: 'a. Offer',
                                        rule: 'An offer manifests willingness to contract with definite terms.',
                                        elements: [
                                            'Definite Terms (Q-Tips)',
                                            '(1) Quantity',
                                            '(2) Terms',
                                            '(3) Identity',
                                            '(4) Price',
                                            '(5) Subject'
                                        ],
                                        mnemonic: 'Q-TIPS',
                                        difficulty: 2
                                    },
                                    termination: {
                                        id: 'contracts_termination',
                                        title: 'b. Termination',
                                        rule: 'Offers terminate by revocation, rejection, lapse, death, or illegality.',
                                        elements: [
                                            '(1) Revocation',
                                            '(2) Rejection', 
                                            '(3) Lapse of time',
                                            '(4) Death/incapacity',
                                            '(5) Supervening illegality'
                                        ],
                                        difficulty: 2
                                    },
                                    acceptance: {
                                        id: 'contracts_acceptance',
                                        title: 'c. Acceptance',
                                        rule: 'Acceptance must be unqualified assent by the offeree.',
                                        elements: ['Unqualified assent', 'By offeree', 'Proper method', 'Timely'],
                                        difficulty: 2
                                    }
                                }
                            },
                            consideration: {
                                id: 'contracts_consideration',
                                title: '2. Consideration',
                                rule: 'Consideration requires bargained-for exchange with legal value.',
                                elements: [
                                    'Bargained-for exchange',
                                    'Legal value (benefit or detriment)',
                                    'Not past consideration',
                                    'Not pre-existing duty'
                                ],
                                difficulty: 2
                            }
                        }
                    },
                    statute_of_frauds: {
                        id: 'contracts_statute_of_frauds',
                        title: 'C.1. Statute of Frauds',
                        rule: 'Certain contracts must be in writing to be enforceable.',
                        elements: [
                            '1. Contract within statute (MYLEGS)',
                            '• Marriage contracts',
                            '• Year+ performance contracts',
                            '• Land sale contracts',
                            '• Executor/estate contracts',
                            '• Goods $500+ (UCC)',
                            '• Surety contracts',
                            '2. Not in writing or insufficient writing',
                            '3. No performance exception applies'
                        ],
                        difficulty: 3
                    },
                    unconscionability: {
                        id: 'contracts_unconscionability',
                        title: 'C.2. Unconscionability',
                        rule: 'Contract terms so unfair as to shock the conscience.',
                        elements: [
                            '1. Procedural unconscionability (bargaining process)',
                            '• Unequal bargaining power',
                            '• Hidden terms',
                            '• High pressure tactics',
                            '2. Substantive unconscionability (terms)',
                            '• Grossly unfair terms',
                            '• Excessive price',
                            '3. Determined at time of contract formation'
                        ],
                        difficulty: 3
                    },
                    fraud: {
                        id: 'contracts_fraud',
                        title: 'C.3. Fraud/Misrepresentation',
                        rule: 'False statement of material fact inducing contract formation.',
                        elements: [
                            '1. False statement of material fact',
                            '2. Knowledge of falsity or reckless disregard',
                            '3. Intent to induce reliance',
                            '4. Justifiable reliance by victim',
                            '5. Damages result from reliance'
                        ],
                        difficulty: 3
                    },
                    duress: {
                        id: 'contracts_duress',
                        title: 'C.4. Duress',
                        rule: 'Improper threat that overcomes free will in contract formation.',
                        elements: [
                            '1. Improper threat',
                            '• Physical duress (void)',
                            '• Economic duress (voidable)',
                            '2. No reasonable alternative',
                            '3. Threat induces assent',
                            '4. Victim lacks free will'
                        ],
                        difficulty: 2
                    },
                    incapacity: {
                        id: 'contracts_incapacity',
                        title: 'C.5. Incapacity',
                        rule: 'Legal inability to enter binding contracts.',
                        elements: [
                            '1. Minor (under 18)',
                            '• Voidable by minor',
                            '• Ratification upon majority',
                            '2. Mental incapacity',
                            '• Adjudicated incompetent (void)',
                            '• Cognitive incapacity (voidable)',
                            '3. Intoxication (voidable if severe)'
                        ],
                        difficulty: 2
                    },
                    illegality: {
                        id: 'contracts_illegality',
                        title: 'C.6. Illegality',
                        rule: 'Contracts for illegal purposes are unenforceable.',
                        elements: [
                            '1. Illegal subject matter or purpose',
                            '2. Violates statute or public policy',
                            '3. Both parties aware of illegality',
                            '4. Contract void (no enforcement)',
                            '5. Exceptions: licensing, partial illegality'
                        ],
                        difficulty: 2
                    }
                }
            },
            third_party_rights: {
                name: 'Third Party Rights',
                category: 'II. Third Party Rights',
                topics: {
                    third_party_beneficiary: {
                        id: 'contracts_tpb',
                        title: 'A. Third Party Beneficiary',
                        rule: 'Third parties may enforce contracts made for their benefit.',
                        elements: [
                            'Does Public Intercourse Cause VD?',
                            '1. Donee',
                            '2. Public',
                            '3. Incidental',
                            '4. Creditor',
                            '5. Vesting',
                            '6. Defenses if Necessary'
                        ],
                        mnemonic: 'Does Public Intercourse Cause VD?',
                        difficulty: 3
                    },
                    assignment: {
                        id: 'contracts_assignment',
                        title: 'B. Assignment',
                        rule: 'Rights can be assigned unless prohibited.',
                        elements: ['Assignable right', 'Valid assignment', 'Notice to obligor'],
                        difficulty: 2
                    },
                    delegation: {
                        id: 'contracts_delegation', 
                        title: 'C. Delegation',
                        rule: 'Duties can be delegated unless personal in nature.',
                        elements: ['Delegable duty', 'Valid delegation', 'Delegator remains liable'],
                        difficulty: 2
                    }
                }
            },
            conditions_performance: {
                name: 'Conditions to Performance',
                category: 'III. Conditions to Performance',
                topics: {
                    covenant_condition: {
                        id: 'contracts_covenant_condition',
                        title: 'A. Covenant/Promise v. Condition',
                        rule: 'Distinguish between promises (create duties) and conditions (trigger duties).',
                        elements: ['Promise creates duty', 'Condition triggers duty', 'Language determines classification'],
                        difficulty: 2
                    },
                    types: {
                        id: 'contracts_condition_types',
                        title: 'B. Type',
                        rule: 'Conditions are precedent, concurrent, or subsequent.',
                        elements: [
                            '1. Precedent',
                            '2. Concurrent', 
                            '3. Subsequent',
                            '4. Express',
                            '5. Implied'
                        ],
                        difficulty: 2
                    },
                    satisfaction_constructive: {
                        id: 'contracts_satisfaction',
                        title: 'C. Were Plaintiff\'s Conditions Satisfied?',
                        rule: 'Analyze whether conditions were satisfied, waived, or excused.',
                        elements: [
                            '1. Substantial Performance (Constructive)',
                            '2. Divisibility'
                        ],
                        difficulty: 3
                    },
                    excuse_conditions: {
                        id: 'contracts_excuse_conditions',
                        title: 'D. Were Plaintiff\'s Conditions Excused?',
                        rule: 'Conditions may be excused by waiver, repudiation, or other doctrines.',
                        elements: [
                            '1. Waiver',
                            '2. Anticipatory Repudiation', 
                            '3. Prevention',
                            '4. Impossibility of Performance',
                            '5. Voluntary Disablement',
                            '6. Estoppel'
                        ],
                        difficulty: 3
                    }
                }
            },
            discharge_duty: {
                name: 'Discharge of Defendant\'s Duty to Perform',
                category: 'IV. Discharge of Defendant\'s Duty to Perform',
                topics: {
                    merger: {
                        id: 'contracts_merger',
                        title: 'A. Merger',
                        rule: 'Duty discharged when merged into judgment.',
                        elements: ['Valid judgment', 'Same claim', 'Res judicata'],
                        difficulty: 2
                    },
                    substitute_contract: {
                        id: 'contracts_substitute',
                        title: 'B. Substitute Contract',
                        rule: 'New contract replaces original obligations.',
                        elements: ['New agreement', 'Intent to substitute', 'Consideration'],
                        difficulty: 2
                    },
                    modification: {
                        id: 'contracts_modification',
                        title: 'C. Modification',
                        rule: 'Contract terms can be modified with proper consideration.',
                        elements: ['Mutual assent', 'Consideration (or UCC good faith)', 'No duress'],
                        difficulty: 2
                    },
                    amendment_restatement: {
                        id: 'contracts_amendment',
                        title: 'D. Amendment and Restatement of Contract',
                        rule: 'Contracts can be amended or restated with agreement.',
                        elements: ['Agreement to amend', 'Clear terms', 'Consideration if required'],
                        difficulty: 2
                    },
                    novation: {
                        id: 'contracts_novation',
                        title: 'E. Novation',
                        rule: 'Substitution of new party discharges original obligor.',
                        elements: ['New party substituted', 'Agreement of all parties', 'Original party discharged'],
                        difficulty: 2
                    },
                    accord_satisfaction: {
                        id: 'contracts_accord',
                        title: 'F. Accord and Satisfaction',
                        rule: 'Agreement to accept different performance discharges duty.',
                        elements: ['Accord (agreement)', 'Satisfaction (performance)', 'Disputed claim'],
                        difficulty: 2
                    },
                    account_stated: {
                        id: 'contracts_account_stated',
                        title: 'G. Account Stated (mutual)',
                        rule: 'Parties agree on amount owed, creating new obligation.',
                        elements: ['Mutual agreement', 'Amount stated', 'Account between parties'],
                        difficulty: 2
                    },
                    release: {
                        id: 'contracts_release',
                        title: 'H. Release',
                        rule: 'Express discharge of obligation.',
                        elements: ['Written release', 'Consideration', 'Clear intent'],
                        difficulty: 1
                    },
                    waiver: {
                        id: 'contracts_waiver',
                        title: 'I. Waiver',
                        rule: 'Voluntary relinquishment of right.',
                        elements: ['Voluntary act', 'Knowledge of right', 'Intent to waive'],
                        difficulty: 2
                    },
                    condition_subsequent: {
                        id: 'contracts_condition_subsequent',
                        title: 'J. Condition Subsequent',
                        rule: 'Condition that terminates existing duty.',
                        elements: ['Condition occurs', 'Terminates duty', 'Express or implied'],
                        difficulty: 2
                    },
                    impossibility: {
                        id: 'contracts_impossibility',
                        title: 'K. Impossibility of Performance',
                        rule: 'Performance becomes objectively impossible.',
                        elements: ['Objective impossibility', 'Not foreseeable', 'Not party\'s fault'],
                        difficulty: 3
                    },
                    frustration: {
                        id: 'contracts_frustration',
                        title: 'L. Frustration of Purpose',
                        rule: 'Principal purpose frustrated by supervening event.',
                        elements: ['Principal purpose known', 'Purpose frustrated', 'Supervening event'],
                        difficulty: 3
                    },
                    impracticability: {
                        id: 'contracts_impracticability',
                        title: 'M. Commercial or Economic Impracticability',
                        rule: 'Performance becomes commercially impracticable.',
                        elements: ['Extreme hardship', 'Unforeseen event', 'Not basic assumption'],
                        difficulty: 3
                    },
                    failure_consideration: {
                        id: 'contracts_failure_consideration',
                        title: 'N. Failure of Consideration',
                        rule: 'Total failure of consideration excuses performance.',
                        elements: ['Total failure', 'No benefit received', 'Substantial failure'],
                        difficulty: 2
                    },
                    defenses_formation_discharge: {
                        id: 'contracts_defenses_formation_discharge',
                        title: 'O. Defenses to Formation',
                        rule: 'Formation defenses can discharge duty.',
                        elements: ['Incapacity', 'Fraud', 'Duress', 'Mistake', 'Unconscionability'],
                        difficulty: 3
                    }
                }
            },
            breach: {
                name: 'Breach',
                category: 'V. Breach',
                topics: {
                    major: {
                        id: 'contracts_major_breach',
                        title: 'A. Major',
                        rule: 'Material breach excuses other party\'s performance.',
                        elements: ['Material breach', 'Goes to essence', 'Substantial failure'],
                        difficulty: 2
                    },
                    minor: {
                        id: 'contracts_minor_breach',
                        title: 'B. Minor',
                        rule: 'Minor breach allows damages but not excuse of performance.',
                        elements: ['Insubstantial breach', 'Performance still required', 'Damages available'],
                        difficulty: 2
                    }
                }
            },
            remedies: {
                name: 'Remedies',
                category: 'VI. Remedies',
                topics: {
                    legal_equitable: {
                        id: 'contracts_legal_equitable',
                        title: 'A. Legal - Equitable Remedies',
                        rule: 'Determine if legal or equitable relief is appropriate.',
                        elements: ['Legal remedies (damages)', 'Equitable remedies (specific performance)', 'Adequacy of legal remedy'],
                        difficulty: 2,
                        subtopics: {
                            liver_cats: {
                                id: 'contracts_liver_cats',
                                title: 'Liver Cats Find Mice Dice Nice',
                                rule: 'Types of damages available for breach.',
                                elements: [
                                    '1. General Damages',
                                    '2. Special Damages',
                                    '3. Consequential Damages',
                                    'a. Expectation Damages',
                                    'b. Reliance Damages',
                                    'c. Restitution Damages',
                                    '4. Liquidated Damages',
                                    '5. Punitive Damages (NOT)',
                                    '6. Exceptions',
                                    '7. Certainty',
                                    '8. Avoidable Consequence Rule',
                                    '9. Collateral Source Rule'
                                ],
                                mnemonic: 'Liver Cats Find Mice Dice Nice',
                                difficulty: 3
                            }
                        }
                    },
                    quasi_contract: {
                        id: 'contracts_quasi_contract',
                        title: 'C. Quasi-Contract',
                        rule: 'Restitution to prevent unjust enrichment.',
                        elements: ['No valid contract', 'Benefit conferred', 'Unjust enrichment'],
                        difficulty: 2
                    },
                    rescission: {
                        id: 'contracts_rescission',
                        title: 'D. Rescission',
                        rule: 'Cancellation of contract and restoration of status quo.',
                        elements: ['Grounds for rescission', 'Timely election', 'Restitution'],
                        difficulty: 2
                    },
                    restitution: {
                        id: 'contracts_restitution',
                        title: 'E. Restitution',
                        rule: 'Recovery of benefits conferred to prevent unjust enrichment.',
                        elements: ['Benefit conferred', 'Appreciation by defendant', 'Unjust to retain'],
                        difficulty: 2
                    },
                    reformation: {
                        id: 'contracts_reformation',
                        title: 'F. Reformation',
                        rule: 'Correction of written contract to reflect true agreement.',
                        elements: ['Written contract', 'Mistake in writing', 'Clear and convincing evidence'],
                        difficulty: 2
                    },
                    injunction: {
                        id: 'contracts_injunction',
                        title: 'G. Injunction',
                        rule: 'Court order to do or refrain from doing specific act.',
                        elements: ['Inadequate legal remedy', 'Irreparable harm', 'Balance of hardships'],
                        difficulty: 2,
                        subtopics: {
                            specific_performance: {
                                id: 'contracts_specific_performance',
                                title: '1. Specific Performance',
                                rule: 'Court orders exact performance of contract.',
                                elements: ['Valid contract', 'Inadequate legal remedy', 'Feasible enforcement'],
                                difficulty: 2
                            },
                            earnest_money: {
                                id: 'contracts_earnest_money',
                                title: '2. Earnest Money Cash Delivering Elephants',
                                rule: 'Specific performance available for unique goods.',
                                elements: [
                                    'Inadequate legal remedy',
                                    'Valid contract',
                                    'Definite terms',
                                    'Mutuality',
                                    'Feasibility'
                                ],
                                mnemonic: 'Earnest Money Cash Delivering Elephants',
                                difficulty: 2
                            }
                        }
                    },
                    ucc_remedies: {
                        id: 'contracts_ucc_remedies',
                        title: 'H. UCC Remedies for Buyer and Seller',
                        rule: 'UCC provides specific remedies for sale of goods.',
                        elements: ['Buyer remedies', 'Seller remedies', 'Cover and resale', 'Incidental damages'],
                        difficulty: 3
                    }
                }
            }
        }
    },
    
    torts: {
        name: 'Torts',
        emoji: '⚖️',
        mnemonic: 'In Nevada, My Sister Very Profoundly Calls Drunks "Idiots"',
        color: '#10b981',
        topics: {
            intentional_torts: {
                name: 'Intentional Torts',
                category: 'I. Intentional Torts',
                topics: {
                    assault: {
                        id: 'torts_assault',
                        title: 'A.1. Assault',
                        rule: 'Intent to cause apprehension of imminent harmful or offensive contact.',
                        elements: [
                            '1. Intent (purpose or substantial certainty)',
                            '2. Reasonable apprehension by victim',
                            '3. Of imminent contact',
                            '4. That would be harmful or offensive',
                            '5. Victim must be aware (no assault while sleeping)'
                        ],
                        difficulty: 2
                    },
                    battery: {
                        id: 'torts_battery',
                        title: 'A.2. Battery',
                        rule: 'Intent to cause harmful or offensive contact with person of another.',
                        elements: [
                            '1. Intent (purpose or substantial certainty)',
                            '2. Harmful or offensive contact',
                            '3. With person of another (includes clothing, objects held)',
                            '4. No consent',
                            '5. No privilege/defense'
                        ],
                        difficulty: 2
                    },
                    false_imprisonment_tort: {
                        id: 'torts_false_imprisonment',
                        title: 'A.3. False Imprisonment',
                        rule: 'Intent to confine another within boundaries fixed by defendant.',
                        elements: [
                            '1. Intent to confine',
                            '2. Actual confinement',
                            '3. Awareness of confinement OR harm from confinement',
                            '4. No reasonable means of escape',
                            '5. Confinement not privileged'
                        ],
                        difficulty: 2
                    },
                    iied: {
                        id: 'torts_iied',
                        title: 'A.4. Intentional Infliction of Emotional Distress',
                        rule: 'Intent to cause severe emotional distress by extreme and outrageous conduct.',
                        elements: [
                            '1. Intent OR recklessness',
                            '2. Extreme and outrageous conduct (beyond all bounds of decency)',
                            '3. Causation',
                            '4. Severe emotional distress (more than reasonable person could endure)',
                            '5. Physical manifestation (some jurisdictions)'
                        ],
                        difficulty: 3
                    },
                    trespass_to_land: {
                        id: 'torts_trespass_land',
                        title: 'A.5. Trespass to Land',
                        rule: 'Intent to enter land in possession of another.',
                        elements: [
                            '1. Intent to enter land',
                            '2. Physical invasion of land',
                            '3. Land in possession of another',
                            '4. Without permission or privilege',
                            '5. No harm required (nominal damages)'
                        ],
                        difficulty: 2
                    },
                    trespass_to_chattel: {
                        id: 'torts_trespass_chattel',
                        title: 'A.6. Trespass to Chattel',
                        rule: 'Intent to interfere with chattel in possession of another.',
                        elements: [
                            '1. Intent to interfere with chattel',
                            '2. Actual interference or intermeddling',
                            '3. Chattel in possession of another',
                            '4. Harm to chattel or possessor required',
                            '5. Without consent or privilege'
                        ],
                        difficulty: 2
                    },
                    conversion: {
                        id: 'torts_conversion',
                        title: 'A.7. Conversion',
                        rule: 'Intent to exercise dominion and control over chattel of another.',
                        elements: [
                            '1. Intent to exercise dominion and control',
                            '2. Over chattel of another',
                            '3. Serious interference with possessory rights',
                            '4. Substantial deprivation of use',
                            '5. Damages = full value of chattel'
                        ],
                        difficulty: 2
                    },
                    defenses_intentional: {
                        id: 'torts_defenses_intentional',
                        title: 'B. Defenses to Intentional Torts',
                        rule: 'Various defenses excuse intentional tort liability.',
                        elements: [
                            '1. Consent',
                            '2. Self Defense',
                            '3. Defense of Others',
                            '4. Shop-Keeper\'s Privilege',
                            'a. Reasonable Jurisdictions',
                            'b. Restatement Jurisdictions',
                            '5. Defense of Property',
                            '6. Prevention of Crime',
                            '7. Recapture of Property',
                            'a. Re-entry Upon Land',
                            'b. Recapture of Chattel',
                            'c. Shopkeeper\'s Rule',
                            '8. Legal Authority',
                            'a. Public Necessity',
                            'b. Private Necessity'
                        ],
                        difficulty: 3
                    }
                }
            },
            negligence: {
                name: 'Negligence',
                category: 'II. Negligence',
                topics: {
                    duty: {
                        id: 'torts_duty',
                        title: 'A. Duty',
                        rule: 'Duty of reasonable care under the circumstances.',
                        elements: [
                            '1. General',
                            '2. Special',
                            'a. Negligence Per Se',
                            'b. Drivers Standard',
                            'c. Omission',
                            'd. Good Samaritans/Rescuers'
                        ],
                        difficulty: 2,
                        subtopics: {
                            negligent_supervision: {
                                id: 'torts_negligent_supervision',
                                title: '2. Negligent Supervision',
                                rule: 'Duty to supervise those under control.',
                                elements: ['Relationship exists', 'Foreseeable harm', 'Reasonable supervision'],
                                difficulty: 2
                            },
                            professionals: {
                                id: 'torts_professionals',
                                title: 'f. Professionals',
                                rule: 'Professionals held to standard of profession.',
                                elements: ['Professional relationship', 'Standard of profession', 'Deviation from standard'],
                                difficulty: 2
                            }
                        }
                    },
                    breach: {
                        id: 'torts_breach',
                        title: 'B. Breach',
                        rule: 'Failure to meet the applicable standard of care.',
                        elements: [
                            '1. Direct / Circumstantial',
                            '2. Res Ipsa Loquitur'
                        ],
                        difficulty: 2,
                        subtopics: {
                            causation: {
                                id: 'torts_causation',
                                title: 'C. Causation',
                                rule: 'Breach must be factual and proximate cause of harm.',
                                elements: [
                                    '1. Actual',
                                    'a. "But for"',
                                    'b. Substantial Factor',
                                    '2. Proximate',
                                    'a. Watch the time line!',
                                    'b. Direct',
                                    'c. Intervening Acts',
                                    '(1) Independent',
                                    '(2) Dependent'
                                ],
                                difficulty: 3
                            },
                            damages: {
                                id: 'torts_damages',
                                title: 'D. Damages',
                                rule: 'Plaintiff must suffer actual harm.',
                                elements: [
                                    '1. Physical Harm Needed',
                                    '2. NIED'
                                ],
                                difficulty: 2
                            }
                        }
                    },
                    defenses: {
                        id: 'torts_defenses_negligence',
                        title: 'E. Defenses',
                        rule: 'Defenses that reduce or eliminate negligence liability.',
                        elements: [
                            '1. Contributory Negligence',
                            '2. Comparative Negligence',
                            '3. Last Clear Chance',
                            '4. Assumption of the Risk'
                        ],
                        difficulty: 3
                    }
                }
            },
            strict_liability: {
                name: 'Strict Liability',
                category: 'IV. Strict Liability',
                topics: {
                    animals: {
                        id: 'torts_animals',
                        title: 'A. Animals',
                        rule: 'Strict liability for certain animal activities.',
                        elements: ['Wild animals', 'Domestic animals with known vicious propensities'],
                        difficulty: 2
                    },
                    abnormally_dangerous: {
                        id: 'torts_abnormally_dangerous',
                        title: 'B. Abnormally Dangerous Activities',
                        rule: 'Strict liability for abnormally dangerous activities.',
                        elements: ['High degree of risk', 'Serious harm', 'Cannot be eliminated by reasonable care'],
                        difficulty: 2
                    }
                }
            },
            vicarious_liability: {
                name: 'Vicarious Liability',
                category: 'V. Vicarious Liability',
                topics: {
                    employment: {
                        id: 'torts_employment',
                        title: 'A. Employment Relationship - Respondeat Superior',
                        rule: 'Employer liable for employee torts within scope of employment.',
                        elements: [
                            '1. Scope of employment',
                            '2. To From Home',
                            '3. Frolic and Detour'
                        ],
                        difficulty: 2
                    },
                    independent_contractors: {
                        id: 'torts_independent_contractors',
                        title: 'B. Independent Contractors',
                        rule: 'Generally no vicarious liability for independent contractors.',
                        elements: ['Independent contractor relationship', 'Exceptions apply', 'Non-delegable duties'],
                        difficulty: 2
                    },
                    joint_enterprise: {
                        id: 'torts_joint_enterprise',
                        title: 'C. Joint Enterprise',
                        rule: 'Mutual right of control creates vicarious liability.',
                        elements: ['Common purpose', 'Mutual right of control', 'Financial interest'],
                        difficulty: 2
                    },
                    bailment: {
                        id: 'torts_bailment',
                        title: 'D. Bailor / Bailee',
                        rule: 'Special duties in bailment relationships.',
                        elements: ['Bailment relationship', 'Duty of care', 'Standard varies by type'],
                        difficulty: 2
                    },
                    vehicle_ownership: {
                        id: 'torts_vehicle_ownership',
                        title: 'E. Vehicle Ownership',
                        rule: 'Vehicle owner may be liable for permissive user.',
                        elements: ['Permission to use', 'Scope of permission', 'Family purpose doctrine'],
                        difficulty: 2
                    }
                }
            },
            products_liability: {
                name: 'Products Liability',
                category: 'VI. Products Liability',
                topics: {
                    general_rule: {
                        id: 'torts_products_general',
                        title: 'A. General Rule',
                        rule: 'Manufacturers and sellers liable for defective products.',
                        elements: ['Defective product', 'Causation', 'Commercial seller'],
                        difficulty: 2
                    },
                    defect_type: {
                        id: 'torts_defect_type',
                        title: 'B. Defect Type',
                        rule: 'Three types of product defects.',
                        elements: [
                            '1. Manufacturing defect',
                            '2. Design defect',
                            '3. Warning defect'
                        ],
                        difficulty: 2
                    },
                    theory: {
                        id: 'torts_products_theory',
                        title: 'C. Theory',
                        rule: 'Multiple theories of products liability.',
                        elements: [
                            '1. Intentional (rare)',
                            '2. Negligence',
                            '3. Breach of Warranty',
                            '4. Strict Liability in Tort'
                        ],
                        difficulty: 2
                    }
                }
            },
            miscellaneous: {
                name: 'Miscellaneous Tort Concepts',
                category: 'III. Miscellaneous Tort Concepts',
                topics: {
                    wrongful_death: {
                        id: 'torts_wrongful_death',
                        title: 'A. Wrongful Death',
                        rule: 'Statutory cause of action for death caused by tort.',
                        elements: ['Death caused by tort', 'Statutory beneficiaries', 'Damages specified by statute'],
                        difficulty: 2
                    },
                    survival_statutes: {
                        id: 'torts_survival_statutes',
                        title: 'B. Survival Statutes',
                        rule: 'Decedent\'s tort claims survive death.',
                        elements: ['Personal injury claim', 'Death of victim', 'Estate can continue claim'],
                        difficulty: 2
                    },
                    statute_limitations: {
                        id: 'torts_statute_limitations',
                        title: 'C. Statute of Limitations',
                        rule: 'Time limits for bringing tort claims.',
                        elements: ['Applicable time period', 'Discovery rule', 'Statute of repose'],
                        difficulty: 2
                    },
                    immunities: {
                        id: 'torts_immunities',
                        title: 'D. Immunities',
                        rule: 'Certain parties immune from tort liability.',
                        elements: [
                            '1. Husband/Wife',
                            '2. Parent/Child',
                            '3. Charities',
                            '4. Government'
                        ],
                        difficulty: 2
                    }
                }
            },
            crossovers: {
                name: 'Crossovers',
                category: 'VII. Crossovers',
                topics: {
                    misrepresentation: {
                        id: 'torts_misrepresentation',
                        title: 'A. Misrepresentation',
                        rule: 'Liability for false statements causing harm.',
                        elements: [
                            '1. Intentional: Deceit/Fraud',
                            '2. Negligent',
                            '3. Damages'
                        ],
                        difficulty: 2
                    },
                    nuisance: {
                        id: 'torts_nuisance',
                        title: 'B. Nuisance',
                        rule: 'Interference with use and enjoyment of land.',
                        elements: [
                            '1. Private Nuisance',
                            '2. Public Nuisance'
                        ],
                        difficulty: 2
                    },
                    wrongful_litigation: {
                        id: 'torts_wrongful_litigation',
                        title: 'C. Wrongful Litigation',
                        rule: 'Tort liability for improper use of legal process.',
                        elements: [
                            '1. Malicious Prosecution',
                            '2. Abuse of Process'
                        ],
                        difficulty: 2
                    },
                    business_torts: {
                        id: 'torts_business_torts',
                        title: 'D. Business Torts',
                        rule: 'Torts affecting business relationships.',
                        elements: [
                            '1. Disparagement',
                            '2. Interference with Economic Relationship'
                        ],
                        difficulty: 2
                    }
                }
            },
            defamation: {
                name: 'Defamation',
                category: 'VIII. Defamation',
                topics: {
                    general_rule: {
                        id: 'torts_defamation_general',
                        title: 'A. General Rule',
                        rule: 'False statement of fact that harms reputation.',
                        elements: ['False statement of fact', 'Published to third party', 'Harm to reputation'],
                        difficulty: 2
                    },
                    slander_per_se: {
                        id: 'torts_slander_per_se',
                        title: 'B. Slander / Slander per se',
                        rule: 'Spoken defamation, some categories per se.',
                        elements: ['Spoken statement', 'Categories of slander per se', 'Damages'],
                        difficulty: 2
                    },
                    libel_per_se: {
                        id: 'torts_libel_per_se',
                        title: 'C. Libel / libel per se',
                        rule: 'Written defamation, presumed damages.',
                        elements: ['Written statement', 'Permanent form', 'Presumed damages'],
                        difficulty: 2
                    },
                    damages: {
                        id: 'torts_defamation_damages',
                        title: 'D. Damages',
                        rule: 'Types of damages in defamation cases.',
                        elements: ['Special damages', 'General damages', 'Presumed damages'],
                        difficulty: 2
                    },
                    privileges: {
                        id: 'torts_defamation_privileges',
                        title: 'E. Privileges',
                        rule: 'Defenses to defamation claims.',
                        elements: ['Absolute privileges', 'Qualified privileges', 'Constitutional privileges'],
                        difficulty: 2
                    }
                }
            },
            invasion_privacy: {
                name: 'Invasion of Privacy',
                category: 'IX. Invasion of Privacy',
                topics: {
                    appropriation: {
                        id: 'torts_appropriation',
                        title: 'A. Appropriation of Likeness',
                        rule: 'Use of plaintiff\'s likeness without permission.',
                        elements: ['Use of likeness', 'Commercial purpose', 'Without consent'],
                        difficulty: 2
                    },
                    intrusion: {
                        id: 'torts_intrusion',
                        title: 'B. Intrusion upon Seclusion',
                        rule: 'Invasion of private affairs in objectionable manner.',
                        elements: ['Intrusion into private affairs', 'Highly offensive manner', 'Reasonable expectation of privacy'],
                        difficulty: 2
                    },
                    false_light: {
                        id: 'torts_false_light',
                        title: 'C. False Light',
                        rule: 'Publicity placing person in false light.',
                        elements: ['Public disclosure', 'False light', 'Highly offensive'],
                        difficulty: 2
                    },
                    disclosure: {
                        id: 'torts_disclosure',
                        title: 'D. Public Disclosure of Private Facts',
                        rule: 'Public disclosure of private facts.',
                        elements: ['Private facts', 'Public disclosure', 'Not legitimate concern'],
                        difficulty: 2
                    }
                }
            },
            tort_damages: {
                name: 'Tort Damages',
                category: 'X. Tort Damages',
                topics: {
                    special: {
                        id: 'torts_damages_special',
                        title: 'A. Special',
                        rule: 'Economic losses that can be calculated.',
                        elements: ['Medical expenses', 'Lost wages', 'Property damage'],
                        difficulty: 1
                    },
                    general: {
                        id: 'torts_damages_general',
                        title: 'B. General',
                        rule: 'Non-economic losses difficult to quantify.',
                        elements: ['Pain and suffering', 'Emotional distress', 'Loss of enjoyment'],
                        difficulty: 2
                    },
                    punitive: {
                        id: 'torts_damages_punitive',
                        title: 'C. Punitive',
                        rule: 'Damages to punish and deter egregious conduct.',
                        elements: ['Malicious conduct', 'Willful misconduct', 'Reckless disregard'],
                        difficulty: 2
                    },
                    avoidable_consequence: {
                        id: 'torts_avoidable_consequence',
                        title: 'D. Avoidable Consequence Rule',
                        rule: 'Plaintiff must mitigate damages.',
                        elements: ['Duty to mitigate', 'Reasonable efforts', 'Reduce damages'],
                        difficulty: 2
                    },
                    collateral_source: {
                        id: 'torts_collateral_source',
                        title: 'E. Collateral Source Rule',
                        rule: 'Benefits from other sources do not reduce damages.',
                        elements: ['Independent source', 'No reduction of damages', 'Insurance payments'],
                        difficulty: 2
                    }
                }
            }
        }
    },
    
    criminal: {
        name: 'Criminal Law',
        emoji: '🚔',
        mnemonic: 'Felons in Prison Habitually Propose Planning Murderous Deeds',
        color: '#dc2626',
        topics: {
            formation: {
                name: 'Formation',
                category: 'I. Formation',
                topics: {
                    actus_reus: {
                        id: 'criminal_actus_reus',
                        title: 'A. Actus Reus / Mens Rea / Concurrence',
                        rule: 'Criminal liability requires voluntary act, mental state, and concurrence.',
                        elements: ['Voluntary act', 'Mental state (mens rea)', 'Concurrence of act and intent'],
                        difficulty: 2
                    },
                    accomplice_liability: {
                        id: 'criminal_accomplice',
                        title: 'B. Accomplice Liability',
                        rule: 'Liability for aiding, abetting, or encouraging criminal conduct.',
                        elements: [
                            '1. Intent',
                            '2. Knowledge', 
                            '3. Active Assistance'
                        ],
                        difficulty: 2
                    },
                    vicarious_liability: {
                        id: 'criminal_vicarious',
                        title: 'C. Vicarious Liability',
                        rule: 'Criminal liability for acts of another in limited circumstances.',
                        elements: ['Statutory liability', 'Corporate liability', 'Supervisory liability'],
                        difficulty: 2
                    }
                }
            },
            inchoate_crimes: {
                name: 'Inchoate Crimes (SAC)',
                category: 'II. Inchoate Crimes (SAC)',
                topics: {
                    solicitation: {
                        id: 'criminal_solicitation',
                        title: 'A. Solicitation',
                        rule: 'Asking another to commit a crime.',
                        elements: ['Request to commit crime', 'Intent for crime to be committed', 'Communication to target'],
                        difficulty: 2
                    },
                    attempt: {
                        id: 'criminal_attempt',
                        title: 'B. Attempt',
                        rule: 'Trying to commit a crime but failing.',
                        elements: ['Specific intent', 'Substantial step', 'Fails to complete'],
                        difficulty: 2
                    },
                    conspiracy: {
                        id: 'criminal_conspiracy',
                        title: 'C. Conspiracy',
                        rule: 'Agreement to commit a crime.',
                        elements: ['Agreement', 'Intent to commit crime', 'Overt act (majority rule)'],
                        difficulty: 2
                    }
                }
            },
            crimes_against_person: {
                name: 'Crimes against the Person',
                category: 'III. Crimes against the Person',
                topics: {
                    homicide: {
                        id: 'criminal_homicide',
                        title: 'A. Homicide',
                        rule: 'Unlawful killing of another human being.',
                        elements: ['Unlawful', 'Killing', 'Of human being', 'Causation'],
                        difficulty: 3,
                        subtopics: {
                            irac_homicide: {
                                id: 'criminal_irac_homicide',
                                title: '1. IRAC Homicide',
                                rule: 'Analyze intent, recklessness, and circumstances.',
                                elements: ['Intent', 'Recklessness', 'Aggravating factors', 'Circumstances'],
                                difficulty: 3
                            },
                            causation: {
                                id: 'criminal_causation',
                                title: '2. Causation',
                                rule: 'Defendant\'s act must cause victim\'s death.',
                                elements: ['Factual causation', 'Legal causation', 'Proximate cause'],
                                difficulty: 3
                            },
                            murder_malice: {
                                id: 'criminal_murder_malice',
                                title: '3. Murder / Malice?',
                                rule: 'Murder requires malice aforethought.',
                                elements: [
                                    'a. If YES, there is a murder:',
                                    '(1) What Degree?',
                                    '(a) First Degree',
                                    '(b) Second Degree',
                                    '(2) Justifications',
                                    '(3) Excuses',
                                    '(4) Mitigation to Voluntary Manslaughter'
                                ],
                                difficulty: 3
                            },
                            no_murder: {
                                id: 'criminal_no_murder',
                                title: 'b. If NO, there is no murder',
                                rule: 'Without malice, consider manslaughter.',
                                elements: [
                                    '(1) Involuntary Manslaughter',
                                    '(2) Criminally Negligent Homicide'
                                ],
                                difficulty: 3
                            }
                        }
                    },
                    assault: {
                        id: 'criminal_assault',
                        title: 'B.1. Assault',
                        rule: 'Intent to cause apprehension of imminent harmful or offensive contact.',
                        elements: [
                            '1. Intent (purpose or substantial certainty)',
                            '2. Victim\'s reasonable apprehension',
                            '3. Of imminent contact',
                            '4. That would be harmful or offensive',
                            '5. Victim must be aware (no assault while sleeping)'
                        ],
                        difficulty: 2
                    },
                    battery: {
                        id: 'criminal_battery',
                        title: 'B.2. Battery',
                        rule: 'Unlawful application of force to person of another.',
                        elements: [
                            '1. Intent to cause harmful/offensive contact',
                            '2. Harmful or offensive contact occurs',
                            '3. Without consent',
                            '4. Contact with person (includes clothing, objects held)'
                        ],
                        difficulty: 2
                    },
                    false_imprisonment: {
                        id: 'criminal_false_imprisonment',
                        title: 'B.3. False Imprisonment',
                        rule: 'Unlawful restraint of another person\'s freedom of movement.',
                        elements: [
                            '1. Intent to confine or restrain',
                            '2. Actual confinement or restraint',
                            '3. Against victim\'s will',
                            '4. Without lawful justification'
                        ],
                        difficulty: 2
                    },
                    kidnapping: {
                        id: 'criminal_kidnapping',
                        title: 'B.4. Kidnapping',
                        rule: 'Unlawful confinement with movement (asportation) or concealment.',
                        elements: [
                            '1. Unlawful confinement or restraint',
                            '2. Asportation (movement) OR concealment',
                            '3. By force, threat, or deception',
                            '4. Against victim\'s will',
                            '5. Intent to hold victim'
                        ],
                        difficulty: 3
                    },
                    mayhem: {
                        id: 'criminal_mayhem',
                        title: 'B.5. Mayhem',
                        rule: 'Intentionally disfiguring or disabling another person.',
                        elements: [
                            '1. Intent to disfigure or disable',
                            '2. Permanent injury or disfigurement',
                            '3. To face, limb, or organ',
                            '4. Affects victim\'s fighting ability'
                        ],
                        difficulty: 2
                    },
                    rape: {
                        id: 'criminal_rape',
                        title: 'B.6. Rape',
                        rule: 'Sexual intercourse with another person without consent.',
                        elements: [
                            '1. Sexual intercourse (penetration)',
                            '2. Without victim\'s consent',
                            '3. By force, threat of force, or incapacity',
                            '4. Against victim\'s will'
                        ],
                        difficulty: 3
                    }
                }
            },
            crimes_against_habitation: {
                name: 'Crimes against Habitation',
                category: 'IV. Crimes against Habitation',
                topics: {
                    burglary: {
                        id: 'criminal_burglary',
                        title: 'A. Burglary',
                        rule: 'Breaking and entering structure of another with intent to commit felony therein.',
                        elements: [
                            '1. Breaking (actual or constructive)',
                            '2. Entering (any part of body or instrument)',
                            '3. Structure of another (dwelling or building)',
                            '4. Intent to commit felony therein',
                            '5. Without permission or privilege'
                        ],
                        difficulty: 2
                    },
                    arson: {
                        id: 'criminal_arson',
                        title: 'B. Arson',
                        rule: 'Malicious burning of dwelling of another.',
                        elements: ['Malicious', 'Burning', 'Dwelling', 'Of another'],
                        difficulty: 2
                    }
                }
            },
            crimes_against_property: {
                name: 'Crimes against Property',
                category: 'V. Crimes against Property',
                topics: {
                    larceny: {
                        id: 'criminal_larceny',
                        title: 'A. Larceny & Larceny by Trick',
                        rule: 'Taking and carrying away personal property of another with intent to steal.',
                        elements: ['Taking', 'Carrying away', 'Personal property', 'Of another', 'Intent to steal'],
                        difficulty: 2
                    },
                    false_pretenses: {
                        id: 'criminal_false_pretenses',
                        title: 'B. False Pretenses',
                        rule: 'Obtaining title to property by false representation.',
                        elements: ['False representation', 'Intent to defraud', 'Victim relies', 'Title passes'],
                        difficulty: 2
                    },
                    embezzlement: {
                        id: 'criminal_embezzlement',
                        title: 'C. Embezzlement',
                        rule: 'Conversion of property by one in lawful possession.',
                        elements: ['Lawful possession', 'Conversion', 'Property of another', 'Intent to steal'],
                        difficulty: 2
                    },
                    robbery: {
                        id: 'criminal_robbery',
                        title: 'D. Robbery',
                        rule: 'Taking personal property from person by force or threat.',
                        elements: ['Taking', 'Personal property', 'From person or presence', 'Force or threat'],
                        difficulty: 2
                    },
                    receiving_stolen: {
                        id: 'criminal_receiving_stolen',
                        title: 'E. Receiving Stolen Property',
                        rule: 'Receiving stolen property knowing it was stolen.',
                        elements: ['Receiving', 'Stolen property', 'Knowledge it was stolen', 'Intent to deprive'],
                        difficulty: 2
                    }
                }
            },
            crimes_against_property_interests: {
                name: 'Crimes against Property Interests',
                category: 'VI. Crimes against Property Interests',
                topics: {
                    forgery: {
                        id: 'criminal_forgery',
                        title: 'A. Forgery',
                        rule: 'Making false writing with intent to defraud.',
                        elements: ['False making', 'Writing', 'Legal significance', 'Intent to defraud'],
                        difficulty: 2
                    },
                    uttering: {
                        id: 'criminal_uttering',
                        title: 'B. Uttering',
                        rule: 'Offering forged document as genuine.',
                        elements: ['Forged document', 'Offering as genuine', 'Knowledge of forgery', 'Intent to defraud'],
                        difficulty: 2
                    },
                    extortion_blackmail: {
                        id: 'criminal_extortion',
                        title: 'C. Extortion / Blackmail',
                        rule: 'Obtaining property by threat of future harm.',
                        elements: ['Threat of future harm', 'Intent to obtain property', 'Victim compliance'],
                        difficulty: 2
                    }
                }
            },
            miscellaneous_crimes: {
                name: 'Miscellaneous Crimes',
                category: 'VII. Miscellaneous Crimes',
                topics: {
                    misprision: {
                        id: 'criminal_misprision',
                        title: 'A. Misprision',
                        rule: 'Failure to report known felony to authorities.',
                        elements: ['Knowledge of felony', 'Failure to report', 'Some affirmative step'],
                        difficulty: 2
                    },
                    compounding: {
                        id: 'criminal_compounding',
                        title: 'B. Compounding',
                        rule: 'Agreeing not to prosecute crime in exchange for consideration.',
                        elements: ['Agreement not to prosecute', 'Consideration received', 'Knowledge of crime'],
                        difficulty: 2
                    },
                    riot: {
                        id: 'criminal_riot',
                        title: 'C. Riot',
                        rule: 'Unlawful assembly that disturbs peace.',
                        elements: ['Three or more people', 'Common purpose', 'Disturb peace', 'Use of force'],
                        difficulty: 2
                    },
                    unlawful_assembly: {
                        id: 'criminal_unlawful_assembly',
                        title: 'E. Unlawful Assembly',
                        rule: 'Assembly with intent to commit unlawful act.',
                        elements: ['Assembly of people', 'Common intent', 'Unlawful purpose'],
                        difficulty: 2
                    },
                    malicious_mischief: {
                        id: 'criminal_malicious_mischief',
                        title: 'F. Malicious Mischief',
                        rule: 'Intentional destruction of property of another.',
                        elements: ['Intentional destruction', 'Property of another', 'Malicious intent'],
                        difficulty: 2
                    },
                    breach_peace: {
                        id: 'criminal_breach_peace',
                        title: 'G. Breach of Peace',
                        rule: 'Conduct that disturbs public peace.',
                        elements: ['Public disturbance', 'Breach of peace', 'Intent or recklessness'],
                        difficulty: 1
                    },
                    rout: {
                        id: 'criminal_rout',
                        title: 'D. Rout',
                        rule: 'Moving toward commission of unlawful act.',
                        elements: ['Unlawful assembly', 'Movement toward target', 'Intent to commit crime'],
                        difficulty: 2
                    }
                }
            },
            defenses: {
                name: 'Defenses: Justifications, and Excuses',
                category: 'VIII. Defenses: Justifications, and Excuses',
                topics: {
                    justification_defenses: {
                        id: 'criminal_justification',
                        title: 'A. Justification Defenses',
                        rule: 'Defenses where conduct is justified under circumstances.',
                        elements: [
                            '1. Self Defense',
                            '2. Defense of Others',
                            '3. Defense of Property', 
                            '4. Prevention of Crime',
                            '5. Legal Authority',
                            'a. Domestic',
                            'b. Public',
                            '6. Necessity',
                            '7. Consent'
                        ],
                        difficulty: 3
                    },
                    excuse_defenses: {
                        id: 'criminal_excuses',
                        title: 'B. Defenses: Excuses',
                        rule: 'Defenses where defendant not responsible for conduct.',
                        elements: [
                            '1. Mistake of Law',
                            '2. Mistake of Fact',
                            '3. Duress',
                            '4. Entrapment',
                            '5. Infancy',
                            '6. Intoxication',
                            'a. Voluntary',
                            'b. Involuntary',
                            '7. Insanity (5 Rules)'
                        ],
                        difficulty: 3
                    }
                }
            }
        }
    }
};

// Helper functions for working with law content
const LawContentHelper = {
    // Get all topics for a subject (flattened)
    getAllTopics(subject) {
        const topics = [];
        const subjectData = LAW_CONTENT[subject];
        
        if (!subjectData) return topics;
        
        function extractTopics(obj, path = []) {
            if (obj.id) {
                // This is a topic
                topics.push({
                    ...obj,
                    subject: subject,
                    category: path[0] || '',
                    path: path
                });
            }
            
            // Check for subtopics
            if (obj.subtopics) {
                Object.entries(obj.subtopics).forEach(([key, subtopic]) => {
                    extractTopics(subtopic, [...path, key]);
                });
            }
            
            // Check for topics in category
            if (obj.topics) {
                Object.entries(obj.topics).forEach(([key, topic]) => {
                    extractTopics(topic, [...path, obj.category || obj.name || key]);
                });
            }
        }
        
        Object.entries(subjectData.topics).forEach(([categoryKey, category]) => {
            extractTopics(category, [category.category || category.name || categoryKey]);
        });
        
        return topics;
    },
    
    // Get a specific topic by ID
    getTopicById(id) {
        for (const subject of Object.keys(LAW_CONTENT)) {
            const topics = this.getAllTopics(subject);
            const topic = topics.find(t => t.id === id);
            if (topic) return topic;
        }
        return null;
    },
    
    // Search topics by text
    searchTopics(query) {
        const results = [];
        
        Object.keys(LAW_CONTENT).forEach(subject => {
            const topics = this.getAllTopics(subject);
            
            topics.forEach(topic => {
                let relevance = 0;
                const queryLower = query.toLowerCase();
                
                // Check title
                if (topic.title.toLowerCase().includes(queryLower)) {
                    relevance += 3;
                }
                
                // Check rule
                if (topic.rule.toLowerCase().includes(queryLower)) {
                    relevance += 2;
                }
                
                // Check elements
                const elementMatches = topic.elements.filter(element => 
                    element.toLowerCase().includes(queryLower)
                ).length;
                relevance += elementMatches;
                
                // Check mnemonic
                if (topic.mnemonic && topic.mnemonic.toLowerCase().includes(queryLower)) {
                    relevance += 1;
                }
                
                if (relevance > 0) {
                    results.push({ topic, relevance });
                }
            });
        });
        
        return results.sort((a, b) => b.relevance - a.relevance);
    },
    
    // Get topics by difficulty level
    getTopicsByDifficulty(difficulty) {
        const topics = [];
        
        Object.keys(LAW_CONTENT).forEach(subject => {
            const subjectTopics = this.getAllTopics(subject);
            topics.push(...subjectTopics.filter(t => t.difficulty === difficulty));
        });
        
        return topics;
    },
    
    // Get random topic for practice
    getRandomTopic(subject = null) {
        if (subject) {
            const topics = this.getAllTopics(subject);
            return topics[Math.floor(Math.random() * topics.length)];
        } else {
            const allTopics = [];
            Object.keys(LAW_CONTENT).forEach(subj => {
                allTopics.push(...this.getAllTopics(subj));
            });
            return allTopics[Math.floor(Math.random() * allTopics.length)];
        }
    },
    
    // Get topic statistics
    getStatistics() {
        const stats = {
            totalTopics: 0,
            bySubject: {},
            byDifficulty: { 1: 0, 2: 0, 3: 0 }
        };
        
        Object.keys(LAW_CONTENT).forEach(subject => {
            const topics = this.getAllTopics(subject);
            stats.bySubject[subject] = topics.length;
            stats.totalTopics += topics.length;
            
            topics.forEach(topic => {
                if (topic.difficulty) {
                    stats.byDifficulty[topic.difficulty]++;
                }
            });
        });
        
        return stats;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LAW_CONTENT, LawContentHelper };
}