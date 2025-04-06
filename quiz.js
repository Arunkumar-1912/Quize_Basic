let questions = [];
let currentPage = 0;
const questionsPerPage = 10;
let userAnswers = {};

async function loadQuestions() {
    const urlParams = new URLSearchParams(window.location.search);
    const month = urlParams.get('month');
    const week = urlParams.get('week');
    document.getElementById('quiz-title').textContent = `Current Affairs Quiz - ${month.toUpperCase()} ${week.toUpperCase()} 2025`;
    
    try {
        const response = await fetch(`questions/${month}-${week}.json`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        questions = await response.json();
        displayQuestions();
        updatePagination();
    } catch (error) {
        console.error('Error loading questions:', error.message);
        document.getElementById('quiz').innerHTML = `<p>Error loading quiz questions: ${error.message}</p>`;
    }
}

function displayQuestions() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    const start = currentPage * questionsPerPage;
    const end = Math.min(start + questionsPerPage, questions.length);

    for (let i = start; i < end; i++) {
        const q = questions[i];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<h3>${i + 1}. ${q.question}</h3>`;
        q.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <input type="radio" name="q${i}" value="${index}" 
                ${userAnswers[i] === index ? 'checked' : ''} 
                onchange="saveAnswer(${i}, ${index})">
                ${option}
            `;
            questionDiv.appendChild(optionDiv);
        });
        quizDiv.appendChild(questionDiv);
    }
}

function saveAnswer(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;
}

function updatePagination() {
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    document.getElementById('page-info').textContent = `Page ${currentPage + 1} of ${totalPages}`;
    document.getElementById('prev').disabled = currentPage === 0;
    document.getElementById('next').disabled = currentPage === totalPages - 1;
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayQuestions();
        updatePagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        displayQuestions();
        updatePagination();
    }
}

function submitQuiz() {
    let score = 0;
    let resultHTML = '<h3>Review:</h3>';
    questions.forEach((q, i) => {
        const userAnswer = userAnswers[i];
        const correctAnswer = q.answer;
        if (userAnswer === correctAnswer) score++;
        else {
            resultHTML += `
                <p><strong>Q${i + 1}: ${q.question}</strong><br>
                Your Answer: <span class="wrong">${userAnswer !== undefined ? q.options[userAnswer] : 'Not Answered'}</span><br>
                Correct Answer: <span class="correct">${q.options[correctAnswer]}</span></p>
            `;
        }
    });

    resultHTML = `<h2>Quiz Results</h2><p>Your Score: <strong>${score}/${questions.length}</strong></p>` + resultHTML;
    document.getElementById('result').innerHTML = resultHTML;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('submit').disabled = true;

    // Save result to localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = `${urlParams.get('month')}-${urlParams.get('week')}`;
    const result = { username: 'Kokila N', quizId, score, total: questions.length, date: new Date().toLocaleString() };
    let results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
}

window.onload = loadQuestions;