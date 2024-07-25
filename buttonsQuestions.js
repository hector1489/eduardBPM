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

  function addChangeListenerToQuestions() {
    const questions = getActiveModule().querySelectorAll('.pregunta select, .pregunta input');
    questions.forEach(element => {
      element.addEventListener('change', () => {
        nextQuestion(element.closest('.module-section').id, nextModuleId);
      });
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

  function nextModule(currentModuleId, nextModuleId) {
    const currentModule = document.getElementById(currentModuleId);
    const nextModule = document.getElementById(nextModuleId);
    const moduleTitle = document.getElementById('module-title');

    if (nextModule) {
      currentModule.classList.remove('active');
      nextModule.classList.add('active');

      const nextModuleTitle = nextModule.querySelector('h3')?.textContent;
      if (nextModuleTitle) {
        moduleTitle.textContent = nextModuleTitle;
      }
    }
  }

  function previousModule(currentModuleId, previousModuleId) {
    const currentModule = document.getElementById(currentModuleId);
    const previousModule = document.getElementById(previousModuleId);
    const moduleTitle = document.getElementById('module-title');

    if (previousModule) {
      currentModule.classList.remove('active');
      previousModule.classList.add('active');

      const previousModuleTitle = previousModule.querySelector('h3')?.textContent;
      if (previousModuleTitle) {
        moduleTitle.textContent = previousModuleTitle;
      }
    }
  }

  // Show the first question
  showQuestion(currentQuestion);

  addChangeListenerToQuestions();
  // countQuestionsInModules();

  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
});

// Ticket function
function sendTicket(currentModuleId, nextModuleId) {
  // alert('Ticket enviado. Haz click nuevamente para ir al siguiente modulo');
  nextModule(currentModuleId, nextModuleId);
}
