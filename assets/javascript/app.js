// Defining initial values
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;
var triviaQuestions = [

    {
        question: "What female artist was rocking the boat back in 2002?",
        choices: ["Monica", "Missy Elliot", "Aalyiah", "K Michelle"],
        correctAnswer: "Aalyiah"
    },
    // Question 2
    {
        question: "Who is not a member from the group Jodeci?",
        choices: ["Bobby Brown", "DeVante Swing", "K-Ci", "Dalvin DeGrate"],
        correctAnswer: "Bobby Brown"
    },
    // Question 3
    {
        question: "True or False. TLC group member LeftEye died tragically in the year 2005.",
        choices: ["True", "False"],
        correctAnswer: "False"
    },
    // Question 4
    {
        question: "What famous R&B singer has a child by the late Nitorious Biggie Smalls?",
        choices: ["Brandy", "Erykah Badu", "Letoya Luckett", "Faith Evans"],
        correctAnswer: "Faith Evans"
    },
    // Question 5
    {
        question: "What Grammy Award winning artist has a total of 23 awards and 66 nominations?",
        choices: ["Mariah Carey", "Michael Jackson", "Whitney Houston", "Beyonce"],
        correctAnswer: "Beyonce"
    },
    // Question 6
    {
        question: "Who was the first to confess their infedelities in a 2 part album?",
        choices: ["R Kelly", "Maxwell", "Usher", "LL Cool J"],
        correctAnswer: "Usher"
    },
    // Question 7
    {
        question: "Which two artists collabed to make the song 'Same Girl'?",
        choices: ["Monica & Brandy", "Usher & R Kelly", "TLC & Andre 3000", "Jagged Edge & Run-DMC"],
        correctAnswer: "Usher & R Kelly"
    },
    // Question 8
    {
        question: "Finish this verse from the following Escape song. 'Your my little secret and ...' ",
        choices: ["...that's how we should keep it.", "...nobody has to ever find out.", "...your secret is safe with me", "...it kills me inside."],
        correctAnswer: "...that's how we should keep it."
    },
    // Question 9
    {
        question: "Which song is NOT a song by Beyonce?",
        choices: ["Listen", "Ring the Alarm", "Independent Women", "If I Were a Boy"],
        correctAnswer: "Independent Women"
    },
    // Question 10
    {
        question: "Finish this verse from the following Luther Vandross song. 'A chair is still a chair, ...",
        choices: ["...and it will always be a chair.", "...and you are still you.", "...even when no one is sitting there.", "...even if your not sitting there."],
        correctAnswer: "...even if no one is sitting there."
    }, 
]



// Create Functions
function nextQuestion() {

    var allQuestionsAnswered = (triviaQuestions.length - 1) === currentQuestion;
    if (allQuestionsAnswered) {
        displayResult();
        console.log('GAME OVER!!!');
    }
    else {
        currentQuestion++;
        displayQuestion();
        }
}

function timeUp(){
    clearInterval(timer);

    lost++;
    
    nextQuestion();
}

function countDown() {
    counter--;

    $('#time').html('Timer:' + counter);

    if (counter === 0) {
// Timer stops at once time is up
        timeUp();
    }
}
   
// Load questions
function displayQuestion() {
    counter = 5;
    timer = setInterval(countDown, 1000);

    var question = triviaQuestions [currentQuestion].question;
    var choices = triviaQuestions [currentQuestion].choices;
// Call a function
    $('#time').html('Timer:' + counter);
    $('#game').html( ` 
        <h4>${question}</h4>
        ${loadChoices(choices)}       
    `);      
}
function loadChoices(choices){
    var result = '';

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" value-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

// Event Delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    var selectedAnswer = $(this).attr('value-answer');
    var correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
// User wins
        score++;
        console.log('win!!!');
        nextQuestion();
    }
    else {
// User lost
        lost++;
        console.log('lost!!!');
        nextQuestion();
    }
});

function displayResult() {
    var result = `
        <p>You got ${score} question(s) right</p>
        <p>You missed ${lost} question(s)</p>
        <p>Total of ${triviaQuestions.length} question(s)</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function() {
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;  
    
    displayQuestion();
    
    console.log("This is working.")
})




