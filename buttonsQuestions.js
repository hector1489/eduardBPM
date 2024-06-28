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
    const questions = activeModule.querySelectorAll('.pregunta');
  
    questions.forEach((question, index) => {
      const select = question.querySelector('select');
      select.addEventListener('change', () => {
        // Avanzar a la siguiente pregunta si no es la última
        if (index < questions.length - 1) {
          currentQuestion = index + 1;
          showQuestion(currentQuestion);
        }
      });
    });
  }

  // Mostrar la primera pregunta al cargar la página
  showQuestion(currentQuestion);
  addChangeListenerToQuestions();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});
