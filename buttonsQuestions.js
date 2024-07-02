document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 0;

  const getActiveModule = () => document.querySelector('.module-section.active');
  const getQuestions = () => getActiveModule().querySelectorAll('.pregunta');

  function showQuestion(index) {
    const questions = getQuestions();
    questions?.forEach((question, i) => {
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
    questions?.forEach(select => {
      select.addEventListener('change', nextQuestion);
    });
  }

  /*function countQuestionsInModules() {
    const modules = document.querySelectorAll('.module-section');
    modules.forEach(module => {
      const questions = module.querySelectorAll('.pregunta');
      const totalQuestions = questions.length;
      let answeredQuestions = 0;
      let totalPercentage = 0;

      questions.forEach(question => {
        const select = question.querySelector('select');
        const input = question.querySelector('input');
        //suma valores seleccionados
        if (select && select.value) {
          totalPercentage += parseInt(select.value, 10);
          answeredQuestions++;
        } else if (input && input.value) {
          answeredQuestions++;
        }
      });

       //promedio de los porcentajes por consola
      const averagePercentage = totalPercentage / totalQuestions;
      console.log(`Module ${module.id} has ${totalQuestions} questions, ${answeredQuestions} answered. Average response percentage: ${averagePercentage.toFixed(2)}%.`);
    });
  }*/

  showQuestion(currentQuestion);
  addChangeListenerToQuestions();
  //countQuestionsInModules();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});


/*ticket*/

function sendTicket(currentModuleId, nextModuleId) {

  alert('Ticket enviado correctamente');

  // Avanzar al siguiente módulo
  nextModule(currentModuleId, nextModuleId);
}

