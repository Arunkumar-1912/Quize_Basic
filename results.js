function loadResults() {
    const resultsList = document.getElementById('results-list');
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    if (results.length === 0) {
        resultsList.innerHTML = '<p>No quizzes taken yet.</p>';
        return;
    }

    results.forEach(result => {
        if (result.username === 'Kokila N') {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `
                <p><strong>Quiz:</strong> ${result.quizId.toUpperCase()} | 
                <strong>Score:</strong> ${result.score}/${result.total} | 
                <strong>Date:</strong> ${result.date}</p>
            `;
            resultsList.appendChild(resultDiv);
        }
    });
}

window.onload = loadResults;