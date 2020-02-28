// Button Elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// Randomize questions
let shuffledQuestions, currentQuestionIndex

// Start Button
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Start Game
function startGame() {
  c = 15;
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    // countdown
    window.clearInterval(update);
    c = "";
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// Timer function
function countDown() {
    c = c - 1;
    if (c < 15) {
        countdown.innerHTML = c;
    }

    if (c < 1) {
        window.clearInterval(update);
    }
}

update = setInterval("countDown()", 1000);

// Questions
const questions = [
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Central Style Sheets', correct: false }
    ]
  },
  {
    question: 'Which tag is self closing?',
    answers: [
      { text: 'body', correct: false },
      { text: 'paragraph', correct: false },
      { text: 'div', correct: false },
      { text: 'line break', correct: true }
    ]
  },
  {
    question: 'What color is the shirt Anthony wears?',
    answers: [
      { text: 'yellow', correct: false },
      { text: 'black', correct: true },
      { text: 'brown', correct: false },
      { text: 'white', correct: false }
    ]
  },
  {
    question: 'What does API stand for?',
    answers: [
      { text: 'Application Programming Interface', correct: true },
      { text: 'Authentic Programming Interface', correct: false }
    ]
  }
]