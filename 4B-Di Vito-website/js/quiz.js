document.addEventListener("DOMContentLoaded", () => {
    
    const questions = [
        
        {
            text: "In quale anno l'Organizzazione Mondiale della Sanità (OMS) ha ufficialmente inserito il 'Gaming Disorder' nell'ICD-11?",
            options: ["Nel 2010", "Nel 2018", "Nel 2005", "Nel 2022"],
            correct: 1
        },
        {
            text: "Cosa si intende comunemente per 'eSports' a livello globale?",
            options: [
                "Qualsiasi attività fisica svolta all'aperto", 
                "I videogiochi giocati esclusivamente su dispositivi mobili", 
                "Il circuito di competizioni videoludiche organizzate a livello professionistico", 
                "I simulatori di volo utilizzati esclusivamente dalle forze armate"
            ],
            correct: 2
        },
        {
            text: "Quale neurotrasmettitore è maggiormente associato al sistema di ricompensa cerebrale attivato durante il gaming?",
            options: ["Serotonina", "Dopamina", "Adrenalina", "Endorfina"],
            correct: 1
        },
        {
            text: "Cosa dicono i principali studi psicologici moderni sulla relazione tra videogiochi violenti e aggressività nel mondo reale?",
            options: [
                "Causano direttamente comportamenti criminali violenti in tutti i giocatori", 
                "Non esiste alcuna correlazione scientifica, nemmeno minima", 
                "Possono incrementare l'arousal e l'aggressività a brevissimo termine, ma l'atto violento dipende da fattori multifattoriali sociali e personali", 
                "Riducono sempre e comunque l'aggressività azzerandola"
            ],
            correct: 2
        },
        {
            text: "Quale segmento dell'industria del gaming genera attualmente il fatturato economico più alto al mondo?",
            options: ["I giochi per PC", "I giochi per Console (PlayStation/Xbox)", "I giochi Mobile (Smartphone/Tablet)", "I cabinati Arcade delle sale giochi"],
            correct: 2
        },
        
        {
            text: "Cosa sono le 'Loot Box' (casse premio) presenti in molti videogiochi moderni?",
            options: [
                "Contenitori virtuali acquistabili con denaro reale o di gioco il cui contenuto è estratto in modo totalmente casuale", 
                "Espansioni della storia di gioco ad accesso gratuito garantito", 
                "Sistemi di salvataggio automatico dei file di gioco nel cloud", 
                "Codici cheat per saltare direttamente i livelli più complessi"
            ],
            correct: 0
        },
        {
            text: "Cosa indica l'acronimo G.A.P. in ambito medico e sociale?",
            options: [
                "Gaming Altamente Professionale", 
                "Gioco d'Azzardo Patologico", 
                "Guadagno Azionario Prevedibile", 
                "Gestione Attività Pubbliche"
            ],
            correct: 1
        },
        {
            text: "Nel gioco d'azzardo, cosa si intende per 'Vantaggio della Casa'?",
            options: [
                "Il diritto del casinò di cacciare i clienti molesti", 
                "La percentuale matematica che garantisce matematicamente un profitto al banco nel lungo periodo", 
                "Il comfort logistico offerto dalle strutture di lusso", 
                "La vincita massima che un giocatore può riscuotere in una singola giornata"
            ],
            correct: 1
        },
        {
            text: "Quale organo dello Stato Italiano si occupa della regolamentazione, vigilanza e controllo del gioco pubblico e dell'azzardo?",
            options: [
                "L'Istituto Superiore di Sanità (ISS)", 
                "L'Agenzia delle Dogane e dei Monopoli (ADM)", 
                "Il Ministero dell'Istruzione", 
                "La Polizia Postale"
            ],
            correct: 1
        },
        {
            text: "Perché le Loot Box sono considerate da molti esperti un potenziale ponte verso l'azzardo nei minori?",
            options: [
                "Perché costano sempre più di 100 euro a transazione", 
                "Perché richiedono abilità manuali estreme per essere sbloccate", 
                "Perché sfruttano gli stessi meccanismi psicologici di rinforzo intermittente delle slot machine", 
                "Perché impediscono al giocatore di proseguire la partita se non acquistate"
            ],
            correct: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

   
    const startScreen = document.getElementById("start-screen");
    const questionScreen = document.getElementById("question-screen");
    const resultScreen = document.getElementById("result-screen");
    
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const retryBtn = document.getElementById("retry-btn");
    
    const progressText = document.getElementById("progress");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const feedbackElement = document.getElementById("feedback");
    const scoreText = document.getElementById("score-text");

    
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        questionScreen.style.display = "block";
        loadQuestion();
    });

    
    function loadQuestion() {
        answered = false;
        feedbackElement.textContent = "";
        feedbackElement.className = "feedback-msg";
        nextBtn.disabled = true;
        optionsContainer.innerHTML = "";

        const q = questions[currentQuestionIndex];
        progressText.textContent = `Domanda ${currentQuestionIndex + 1} di ${questions.length}`;
        questionText.textContent = q.text;

        
        q.options.forEach((option, index) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("option-wrapper");

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz-option";
            radio.id = `opt-${index}`;
            radio.value = index;
            radio.addEventListener("change", handleSelection);

            const label = document.createElement("label");
            label.htmlFor = `opt-${index}`;
            label.textContent = option;

            wrapper.appendChild(radio);
            wrapper.appendChild(label);
            optionsContainer.appendChild(wrapper);
        });
    }

    
    function handleSelection(e) {
        if (answered) return;
        answered = true;

        const selectedAnswer = parseInt(e.target.value);
        const correctAnswer = questions[currentQuestionIndex].correct;
        
       
        const radios = document.querySelectorAll('input[name="quiz-option"]');
        radios.forEach(r => r.disabled = true);

        if (selectedAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = "Esatto! Risposta corretta.";
            feedbackElement.classList.add("correct-feedback");
        } else {
            feedbackElement.textContent = `Errato. La risposta corretta era: "${questions[currentQuestionIndex].options[correctAnswer]}"`;
            feedbackElement.classList.add("wrong-feedback");
        }

        nextBtn.disabled = false; 
    }

    
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    
    function showResults() {
        questionScreen.style.display = "none";
        resultScreen.style.display = "block";
        scoreText.textContent = `Hai risposto correttamente a ${score} domande su ${questions.length}.`;
    }

    
    retryBtn.addEventListener("click", () => {
        score = 0;
        currentQuestionIndex = 0;
        resultScreen.style.display = "none";
        questionScreen.style.display = "block";
        loadQuestion();
    });
});