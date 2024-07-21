document.addEventListener('DOMContentLoaded', () => {
  let currentQuestion = 0;

  const getActiveModule = () => document.querySelector('.module-section.active');
  const getQuestions = () => getActiveModule().querySelectorAll('.pregunta');

  // Show a specific question based on the index
  function showQuestion(index) {
    const questions = getQuestions();
    questions.forEach((question, i) => {
      question.classList.toggle('active', i === index);
    });
  }

  // Check if all questions in a module are answered
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

  // Advance to the next question
  function nextQuestion(currentModuleId, nextModuleId) {
    const questions = getQuestions();
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else if (allQuestionsAnswered(getActiveModule())) {
      sendTicket(currentModuleId, nextModuleId);
      currentQuestion = 0;
      nextModule(currentModuleId, nextModuleId);
      showQuestion(currentQuestion);
    } else {
      alert('Por favor termina las preguntas antes de continuar');
    }
  }

  // Go back to the previous question
  function previousQuestion(currentModuleId, previousModuleId) {
    const questions = getQuestions();
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    } else {
      previousModule(currentModuleId, previousModuleId);
      currentQuestion = getQuestions().length - 1;
      showQuestion(currentQuestion);
    }
  }

  // Add change listeners to the questions
  function addChangeListenerToQuestions() {
    const questions = getActiveModule().querySelectorAll('.pregunta select, .pregunta input');
    questions.forEach(element => {
      element.addEventListener('change', () => {
        nextQuestion(element.closest('.module-section').id, nextModuleId);
      });
    });
  }

  // Count questions in modules
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
        if (select && select.value) {
          totalPercentage += parseInt(select.value, 10);
          answeredQuestions++;
        } else if (input && input.value) {
          answeredQuestions++;
        }
      });

      const averagePercentage = totalPercentage / totalQuestions;
      console.log(`Module ${module.id} has ${totalQuestions} questions, ${answeredQuestions} answered. Average response percentage: ${averagePercentage.toFixed(2)}%.`);
    });
  }

  // Show the first question
  showQuestion(currentQuestion);
  addChangeListenerToQuestions();


  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});

// Ticket function
function sendTicket(currentModuleId, nextModuleId) {

  nextModule(currentModuleId, nextModuleId);
}
