const months = ['jan', 'feb', 'mar', 'apr'];
const weeks = ['week1', 'week2', 'week3', 'week4'];

function loadQuizOptions() {
    const optionsDiv = document.getElementById('quiz-options');
    months.forEach(month => {
        const monthDiv = document.createElement('div');
        monthDiv.innerHTML = `<h3>${month.charAt(0).toUpperCase() + month.slice(1)}</h3>`;
        weeks.forEach(week => {
            const quizLink = document.createElement('a');
            quizLink.href = `quiz.html?month=${month}&week=${week}`;
            quizLink.className = 'quiz-option button';
            quizLink.textContent = `${week.charAt(0).toUpperCase() + week.slice(1)}`;
            monthDiv.appendChild(quizLink);
        });
        optionsDiv.appendChild(monthDiv);
    });
}

window.onload = loadQuizOptions;