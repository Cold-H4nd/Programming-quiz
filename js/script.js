// Variable declaration //
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Questions
const questions = [
    {
        "question": " - Qual é a unidade de medida mais usada em CSS?",
        "answers": [
            {
                "answer": "px",
                "correct": true
            },
            {
                "answer": "rem",
                "correct": false
            },
            {
                "answer": "pt",
                "correct": false
            },
            {
                "answer": "cm",
                "correct": false
            }
        ]
    },
    {
        "question": " - Qual a linguagem de programação mais usada atualmente?",
        "answers": [
            {
                "answer": "Ruby",
                "correct": false
            },
            {
                "answer": "Python",
                "correct": false
            },
            {
                "answer": "JavaScript",
                "correct": false
            },
            {
                "answer": "Java",
                "correct": true
            }
        ]
    },
    {
        "question": " - Como se pode declarar uma variável em JavaScript?",
        "answers": [
            {
                "answer": "const",
                "correct": false
            },
            {
                "answer": "let",
                "correct": true
            },
            {
                "answer": "#const",
                "correct": false
            },
            {
                "answer": "#var",
                "correct": false
            }
        ]
    },
    {
        "question": " - HTML é uma linguagem de:",
        "answers": [
            {
                "answer": "Programação",
                "correct": false
            },
            {
                "answer": "Estilização", 
                "correct": false
            },
            {
                "answer": "Marcação",
                "correct": true
            },
            {
                "answer": "Binária",
                "correct": false
            }
        ]
    },
    {
        "question": " - CSS é uma linguagem de:",
        "answers": [
            {
                "answer": "Estilização",
                "correct": true
            },
            {
                "answer": "Marcação",
                "correct": false
            },
            {
                "answer": "Programação",
                "correct": false
            },
            {
                "answer": "Binária",
                "correct": false
            }
        ]
    },
    {
        "question": " - Qual o seletor de classe no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": false
            },
            {
                "answer": "{}",
                "correct": false
            },
            {
                "answer": "()",
                "correct": false
            },
            {
                "answer": ".",
                "correct": true
            }
        ]
    },
    {
       "question": " - O NodeJS é um(a):",
       "answers": [
        {
            "answer": "Framework para JS",
            "correct": false
        },
        {
            "answer": "Linguagem de Programação",
            "correct": false
        },
        {
            "answer": "Gerenciador de pacotes para JS",
            "correct": false
        },
        {
            "answer": "Ambiente de execução de código",
            "correct": true
        }
       ]
    },
    {
        "question": " - Qual desses bancos de dados é do tipo não relacional?",
        "answers": [
            {
                "answer": "MongoDB",
                "correct": true
            },
            {
                "answer": "Oracle",
                "correct": false
            },
            {
                "answer": "MySQL",
                "correct": false
            },
            {
                "answer": "PostgreSQL",
                "correct": false
            }
        ]
    },
    {
        "question": " - Qual dessas linguagens não é destinada à orientação a objetos? ",
        "answers": [
            {
                "answer": "C#",
                "correct": false
            },
            {
                "answer": "Java",
                "correct": false
            },
            {
                "answer": "Python",
                "correct": false
            },
            {
                "answer": "JavaScript",
                "correct": true
            }
        
        ]
    },
    {
        "question": " - É uma linguagem de baixo nível:",
        "answers": [
            {
                "answer": "Ruby",
                "correct": false
            },
            {
                "answer": "Python",
                "correct": false
            },
            {
                "answer": "Assembly",
                "correct": true
            },
            {
                "answer": "Java",
                "correct": false
            }
        ]
    }
]

// Quiz replacement for first question
function init(){
    // create the first question
    createQuestion(0);
}

// Create a question
function createQuestion(i) {

    // Clean the last question
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    // Change question text
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Insert the alternatives
    questions[i].answers.forEach(function(answer, i){

        // Create the button template of the quiz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //Remove hide and template class
        answerTemplate.classList.remove("hide", "answer-template");

        //Insert the alternative on the screen
        answersBox.appendChild(answerTemplate);

        //Insert a click button event
        answerTemplate.addEventListener('click', function() {
            checkAnswer(this);
        })

    });

    //Increment the question number
    actualQuestion++;

}

//Checking the user answer
function checkAnswer(btn) {

    //Select all buttons
    const buttons = answersBox.querySelectorAll("button");

    //Check if the answer is correct and add class in the buttons
    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer");

            //Check if the user got the question right
            if(btn === button) {
                //Increment the points
                points++;
            }

        } else {
            button.classList.add("wrong-answer");
        }
        
    });

nextQuestion();

}

    //Show the next question
function nextQuestion(){

    //timer for the user see the answers
    setTimeout(() => {

        //check if there are still questions
        if(actualQuestion >= questions.length) {
            //show the success message
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);
        
    }, 1500);

}

//Show the final screen
function showSuccessMessage() {

    showOrHideScore();

    // change data from success screen

    //calculate the score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    //Change the number of correct questions
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;
}

//Show or hide the score
function showOrHideScore(){
    quizContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
};

//Restart quiz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener('click', function(){

    //Reset the game
    actualQuestion = 0;
    points = 0;
    showOrHideScore();
    init();
})

init();

