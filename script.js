const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-btn');

const questionText = document.getElementById('question-text');

const answerContainer = document.getElementById('answers-container');

const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');

const resultMessage = document.getElementById('result-message');

const restartButton = document.getElementById('restart-btn');

const progressBar = document.getElementById('progress');

const quizQuestions = [
    {
        question: "When was rice discovered?", 
        answers: [
            {text: "5000 BC", correct: false},
            {text: "10000 BC", correct: true},
            {text: "7000 BC", correct: false},
            {text: "8000 BC", correct: false}
        ]
    },
    {
        question: "Is rice a high calorie food?", 
        answers: [
            {text: "Yes", correct: true},
            {text: "No", correct: false},
            {text: "Sometimes", correct: false},
            {text: "I don't know", correct: false}
        ]
    },
    {
        question: "Billions of people relies on rice as their primary food source.", 
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false},
            {text: "Nobody eats rice.", correct: false},
            {text: "Rice is not real.", correct: false}
        ]
    },
    {
        question: "In which country is rice the most consumed per year?", 
        answers: [
            {text: "China", correct: true},
            {text: "India", correct: false},
            {text: "Thailand", correct: false},
            {text: "Vietnam", correct: false}
        ]
    },
    {
        question: "Rice?", 
        answers: [
            {text: "Yes...", correct: false},
            {text: "No...", correct: false},
            {text: "I MUST CONSUME RICE", correct: true},
            {text: "What's that?", correct: false}
        ]
    }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

// Functions
function startQuiz() {
    console.log("Quiz started");
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    scoreSpan.textContent = score;
    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';
    questionText.textContent = currentQuestion.question;
    answerContainer.innerHTML = '';
    scoreSpan.textContent = score;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerContainer.appendChild(button);
    });
}
function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    
    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if(button == selectedButton){
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });
    
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();   
        }
    }, 1000);
}
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.innerHTML = "<h1>You must be an Asian.</h1>";
    } else if (percentage >= 80) {
        resultMessage.innerHTML = "<h1>Not bad. I don't know what else to say.</h1>";
    } else if (percentage >= 60) {
        resultMessage.innerHTML = "<h1>Could be worse although it already is.</h1>";
    } else {
        resultMessage.innerHTML = "<h1>Do you even come from this planet?</h1>";
    }
}
function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}