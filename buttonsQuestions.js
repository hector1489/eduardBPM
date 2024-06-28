document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 0;
  const questions = document.querySelectorAll('.pregunta');

  function showQuestion(index) {
    questions.forEach((question, i) => {
      question.classList.toggle('active', i === index);
    });
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  }

  // Mostrar la primera pregunta al cargar la página
  showQuestion(currentQuestion);

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});
