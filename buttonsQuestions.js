document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 0;

  const getActiveModule = () => document.querySelector('.module-section.active');
  const getQuestions = () => getActiveModule().querySelectorAll('.pregunta');

  function showQuestion(index) {
    const questions = getQuestions();
    questions.forEach((question, i) => {
      question.classList.toggle('active', i === index);
    });
  }

  function nextQuestion() {
    const questions = getQuestions();
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  }

  function previousQuestion() {
    const questions = getQuestions();
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



  showQuestion(currentQuestion);
  addChangeListenerToQuestions();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});


/*ticket*/

function sendTicket(currentModuleId, nextModuleId) {

  alert('Ticket enviado correctamente');

  // Avanzar al siguiente módulo
  nextModule(currentModuleId, nextModuleId);
}

