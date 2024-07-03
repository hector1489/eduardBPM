document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 0;

  const getActiveModule = () => document.querySelector('.module-section.active');
  const getQuestions = () => getActiveModule().querySelectorAll('.pregunta');

  //mostrar una pregunta específica según el índice
  function showQuestion(index) {
    const questions = getQuestions();
    questions.forEach((question, i) => {
      question.classList.toggle('active', i === index);
    });
  }

  //verifica si todas las preguntas en un módulo están respondidas
  function allQuestionsAnswered(module) {
    const questions = module.querySelectorAll('.pregunta');
    for (let question of questions) {
      const select = question.querySelector('select');
      const input = question.querySelector('input');
      if ((select && !select.value) || (input && !input.value)) {
        return false;
      }
    }
    return true;
  }

  //avanza a la siguiente pregunta 
  function nextQuestion(currentModuleId, nextModuleId) {
    const questions = getQuestions();
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else if (allQuestionsAnswered(getActiveModule())) {
      sendTicket(currentModuleId, nextModuleId);
      currentQuestion = 0;
    } else {
      alert('Por favor termina las preguntas antes de continuar')
    }
  }

  //retrocede a la pregunta anterior
  function previousQuestion(currentModuleId, previousModuleId) {
    const questions = getQuestions();
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    } else {
      previousModule(currentModuleId, previousModuleId);
    }
  }

  //agrega listeners de cambio a las preguntas
  function addChangeListenerToQuestions() {
    const questions = getActiveModule().querySelectorAll('.pregunta select, .pregunta input');
    questions.forEach(element => {
      element.addEventListener('change', nextQuestion);
    });
  }



  function countQuestionsInModules() {
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
  }

   // Muestra la primera pregunta
  showQuestion(currentQuestion);
   // Agrega listeners de cambio a las preguntas
  addChangeListenerToQuestions();
  countQuestionsInModules();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});


/*ticket*/

function sendTicket(currentModuleId, nextModuleId) {

  alert('Ticket enviado correctamente');

  // Avanzar al siguiente módulo
  nextModule(currentModuleId, nextModuleId);
}

