
const Questions = [
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        answers: [
            { text: "myVariable", correct: false },
            { text: "1stVariable", correct: true },
            { text: "_Variable1", correct: false },
            { text: "$Variable", correct: false },
        ]
    },
    {
        question: "What does the typeof operator in JavaScript return for an array?",
        answers: [
            { text: "Object", correct: true },
            { text: "array", correct: false },
            { text: "function", correct: false },
            { text: "string", correct: false },
        ]
    },
    {
        question: "What will the following code output? `console.log(2 + '2');`",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: true },
            { text: "2", correct: false },
            { text: "NaN", correct: false }, 
        ]
    },
    {
        question: "Which method can be used to add a new element to the end of an array in JavaScript?",
        answers: [
            { text: "push()", correct: true },
            { text: "unshift()", correct: false },
            { text: "add()", correct: false },
            { text: "append()", correct: false },
        ]
    },
    {
        question: "Which of the following is a primitive data type in JavaScript?",
        answers: [
            { text: "Object", correct: false },
            { text: "Number", correct: true },
            { text: "Function", correct: false },
            { text: "Array", correct: false },
        ]
    },
    
    {
        question: "Which of the following is used to define a variable in JavaScript?",
        answers: [
            { text: "int", correct: false },
            { text: "var", correct: true },
            { text: "def", correct: false },
            { text: "function", correct: false },
        ]
    },
    {
        question: "What will the following code return? `Boolean(10 > 9)`",
        answers: [
            { text: "false", correct: false },
            { text: "true", correct: true },
            { text: "NaN", correct: false },
            { text: "undefined", correct: false },
        ]
    },
    {
        question: "What is the correct way to write an IF statement in JavaScript?",
        answers: [
            { text: "if i == 5 then", correct: false },
            { text: "if i = 5", correct: false },
            { text: "if (i == 5)", correct: true },
            { text: "if i = 5 then", correct: false },
        ]
    },
    {
        question: "How can you add a comment in JavaScript?",
        answers: [
            { text: "/* This is a comment */", correct: false },
            { text: "// This is a comment", correct: true },
            { text: "# This is a comment", correct: false },
            { text: "<!-- This is a comment -->", correct: false },
        ]
    },
    
    
    {
        question: "How do you declare a JavaScript function?",
        answers: [
            { text: "function = myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "def myFunction()", correct: false },
            { text: "create myFunction()", correct: false },
        ]
    }
];
    2
const questionElement =document.getElementById("question");
const answerbuttons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalTime = 10; 

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState ();
    let currentQuestion= Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML =questionNo + " . " + currentQuestion. question;

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);

        
    });
    startTimer();
    function startTimer() {
        let timeRemaining = totalTime;
        timerElement.innerHTML = timeRemaining;

        timer = setInterval(() => {
            timeRemaining--;
            timerElement.innerHTML = timeRemaining;
    
            if (timeRemaining <= 0) {
                clearInterval(timer);
                selectAnswer({ target: null }); //submit automatically
            }
        }, 1000);
    }
}
    function resetState(){
        nextButton.style.display= "none";
        while(answerbuttons.firstChild){ 
            answerbuttons.removeChild(answerbuttons.firstChild)
        }
        clearInterval(timer); // Clear any previous timer
    timerElement.innerHTML = totalTime; // Reset timer display
    }
    function selectAnswer(e){
        clearInterval(timer); // Stop the timer
        const selectedBtn =e.target;
        const isCorrect = selectedBtn.dataset.correct=== "true";
        if (isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        } else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerbuttons.children).forEach(button=>{
            if(button.dataset.correct==="true"){
                button.classList.add("correct")
            }
            button.disabled =true;
        });
        nextButton.style.display= "block";
    }
    function showScore(){
        resetState();
        questionElement.innerHTML=`you score ${score} out of ${Questions.length}!`;
        nextButton.innerHTML= "Star Over";
        nextButton.style.display="block";
        timerElement.style.display = "none";
    }
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex<Questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }
    nextButton.addEventListener("click",()=>{
        if(currentQuestionIndex<Questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    })
    startQuiz(); 
