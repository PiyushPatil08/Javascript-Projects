const questions = {
    general: [
        { question: "What is the capital of France?", answers: [{ text: "Paris", correct: true }, { text: "Berlin", correct: false }, { text: "Madrid", correct: false }, { text: "Rome", correct: false }] },
        { question: "Who wrote 'Romeo and Juliet'?", answers: [{ text: "William Shakespeare", correct: true }, { text: "Mark Twain", correct: false }, { text: "J.K. Rowling", correct: false }, { text: "Jane Austen", correct: false }] },
        { question: "Which is the largest desert in the world?", answers: [{ text: "Sahara", correct: true }, { text: "Arctic", correct: false }, { text: "Gobi", correct: false }, { text: "Kalahari", correct: false }] },
        { question: "What is the currency of Japan?", answers: [{ text: "Yen", correct: true }, { text: "Won", correct: false }, { text: "Dollar", correct: false }, { text: "Peso", correct: false }] },
        { question: "Who discovered gravity?", answers: [{ text: "Isaac Newton", correct: true }, { text: "Albert Einstein", correct: false }, { text: "Galileo Galilei", correct: false }, { text: "Nikola Tesla", correct: false }] }
    ],
    science: [
        { question: "What is the boiling point of water?", answers: [{ text: "100°C", correct: true }, { text: "0°C", correct: false }, { text: "50°C", correct: false }, { text: "200°C", correct: false }] },
        { question: "Which planet is closest to the Sun?", answers: [{ text: "Mercury", correct: true }, { text: "Venus", correct: false }, { text: "Earth", correct: false }, { text: "Mars", correct: false }] },
        { question: "What is the chemical symbol for gold?", answers: [{ text: "Au", correct: true }, { text: "Ag", correct: false }, { text: "Fe", correct: false }, { text: "Hg", correct: false }] },
        { question: "What is the powerhouse of the cell?", answers: [{ text: "Mitochondria", correct: true }, { text: "Nucleus", correct: false }, { text: "Ribosome", correct: false }, { text: "Golgi Apparatus", correct: false }] },
        { question: "Which gas do plants absorb from the atmosphere?", answers: [{ text: "Carbon Dioxide", correct: true }, { text: "Oxygen", correct: false }, { text: "Nitrogen", correct: false }, { text: "Hydrogen", correct: false }] }
    ],
    sports: [
        { question: "How many players are there in a basketball team?", answers: [{ text: "5", correct: true }, { text: "6", correct: false }, { text: "7", correct: false }, { text: "8", correct: false }] },
        { question: "Which country won the FIFA World Cup 2018?", answers: [{ text: "France", correct: true }, { text: "Croatia", correct: false }, { text: "Germany", correct: false }, { text: "Brazil", correct: false }] },
        { question: "What is the highest score in cricket?", answers: [{ text: "400", correct: true }, { text: "500", correct: false }, { text: "450", correct: false }, { text: "350", correct: false }] },
        { question: "Who is known as the 'Flying Sikh'?", answers: [{ text: "Milkha Singh", correct: true }, { text: "Usain Bolt", correct: false }, { text: "Michael Johnson", correct: false }, { text: "Carl Lewis", correct: false }] },
        { question: "How long is an Olympic swimming pool?", answers: [{ text: "50 meters", correct: true }, { text: "25 meters", correct: false }, { text: "100 meters", correct: false }, { text: "75 meters", correct: false }] }
    ],
    history: [
        { question: "Who was the first President of the United States?", answers: [{ text: "George Washington", correct: true }, { text: "Abraham Lincoln", correct: false }, { text: "Thomas Jefferson", correct: false }, { text: "John Adams", correct: false }] },
        { question: "In which year did World War II end?", answers: [{ text: "1945", correct: true }, { text: "1939", correct: false }, { text: "1918", correct: false }, { text: "1950", correct: false }] },
        { question: "Which empire was ruled by Julius Caesar?", answers: [{ text: "Roman Empire", correct: true }, { text: "Greek Empire", correct: false }, { text: "Egyptian Empire", correct: false }, { text: "Persian Empire", correct: false }] },
        { question: "Where did the Industrial Revolution begin?", answers: [{ text: "England", correct: true }, { text: "France", correct: false }, { text: "Germany", correct: false }, { text: "USA", correct: false }] },
        { question: "Who discovered America?", answers: [{ text: "Christopher Columbus", correct: true }, { text: "Vasco da Gama", correct: false }, { text: "Ferdinand Magellan", correct: false }, { text: "James Cook", correct: false }] }
    ],
    technology: [
        { question: "Who is known as the father of computers?", answers: [{ text: "Charles Babbage", correct: true }, { text: "Alan Turing", correct: false }, { text: "Bill Gates", correct: false }, { text: "Steve Jobs", correct: false }] },
        { question: "What does HTTP stand for?", answers: [{ text: "HyperText Transfer Protocol", correct: true }, { text: "HyperText Transmission Protocol", correct: false }, { text: "Hyperlink Transfer Protocol", correct: false }, { text: "Hyperlink Transmission Protocol", correct: false }] },
        { question: "Which programming language is known as the language of the web?", answers: [{ text: "JavaScript", correct: true }, { text: "Python", correct: false }, { text: "Ruby", correct: false }, { text: "Java", correct: false }] },
        { question: "Who founded Microsoft?", answers: [{ text: "Bill Gates and Paul Allen", correct: true }, { text: "Steve Jobs", correct: false }, { text: "Mark Zuckerberg", correct: false }, { text: "Larry Page", correct: false }] },
        { question: "What is the binary representation of 10?", answers: [{ text: "1010", correct: true }, { text: "1001", correct: false }, { text: "1100", correct: false }, { text: "1011", correct: false }] }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = 'general';

const categorySelect = document.getElementById("category-select");
const startButton = document.getElementById("start-btn");
const quesElement = document.getElementById("que");
const ansButton = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.querySelector(".quiz");
const categoryContainer = document.querySelector(".category");

startButton.addEventListener("click", () => {
    selectedCategory = categorySelect.value;
    categoryContainer.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currQuestion = questions[selectedCategory][currentQuestionIndex];
    quesElement.innerText = `${currentQuestionIndex + 1}. ${currQuestion.question}`;
    currQuestion.answers.forEach((ans_val) => {
        const button = document.createElement("button");
        button.innerText = ans_val.text;
        button.classList.add("btn");
        ansButton.appendChild(button);
        if (ans_val.correct) {
            button.dataset.correct = ans_val.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (ansButton.firstChild) {
        ansButton.removeChild(ansButton.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) score++;
    Array.from(ansButton.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[selectedCategory].length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    quesElement.innerText = `You scored ${score} out of ${questions[selectedCategory].length}!`;
    ansButton.innerHTML = "";
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerText === "Restart") {
        categoryContainer.style.display = "block";
        quizContainer.style.display = "none";
    } else {
        handleNextButton();
    }
});
