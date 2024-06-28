document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 0;

  function showQuestion(index) {
    const activeModule = document.querySelector('.module-section.active');
    const questions = activeModule.querySelectorAll('.pregunta');
    questions.forEach((question, i) => {
      question.classList.toggle('active', i === index);
    });
  }

  function nextQuestion() {
    const activeModule = document.querySelector('.module-section.active');
    const questions = activeModule.querySelectorAll('.pregunta');
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  }

  function previousQuestion() {
    const activeModule = document.querySelector('.module-section.active');
    const questions = activeModule.querySelectorAll('.pregunta');
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  }

  function addChangeListenerToQuestions() {
    const activeModule = document.querySelector('.module-section.active');
    const questions = activeModule.querySelectorAll('.pregunta select');
    questions.forEach(select => {
      select.addEventListener('change', nextQuestion);
    });
  }

  // Mostrar la primera pregunta al cargar la página
  showQuestion(currentQuestion);
  addChangeListenerToQuestions();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});