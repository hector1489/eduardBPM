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
    const questions = getQuestions();

    questions.forEach((question, index) => {
      const select = question.querySelector('select');
      if (select) {
        select.addEventListener('change', () => {
          if (index < questions.length - 1) {
            currentQuestion = index + 1;
            showQuestion(currentQuestion);
          }
        });
      }
    });
  }

  const modules = document.querySelectorAll('.module-section');
  modules.forEach(module => {
    module.addEventListener('click', () => {
      currentQuestion = 0;
      showQuestion(currentQuestion);
      addChangeListenerToQuestions();
    });
  });

  // Mostrar la primera pregunta del primer módulo al cargar la página
  showQuestion(currentQuestion);
  addChangeListenerToQuestions();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});


/*ticket*/

function sendTicket(currentModuleId, nextModuleId) {
  // Aquí puedes implementar la lógica para enviar el ticket
  alert('Ticket enviado correctamente');

  // Avanzar al siguiente módulo
  nextModule(currentModuleId, nextModuleId);
}

