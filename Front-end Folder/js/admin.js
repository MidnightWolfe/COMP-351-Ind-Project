let currentQuestion = 0;
let allQuestions = [];
let numberOfQuestions = 0;

const beginButtonElement = document.getElementById('beginButton');
const questionEditorElement = document.getElementById('startQuiz');
const updateButtonElement = document.getElementById('updateButton');
const storeButtonElement = document.getElementById('storeButton');


let questionInputElement = document.getElementById("question");
let option1Element = document.getElementById("option1");
let option2Element = document.getElementById("option2");
let option3Element = document.getElementById("option3");
let option4Element = document.getElementById("option4");
let correctAnswerElement = document.getElementById("correctAnswer");
let questionCurrentNumberElement = document.getElementById("currentQuestionNumber");

function startQuiz() {
    beginButtonElement.classList.add('hide')
    retrieveStorage()
    addQuestion()
    questionEditorElement.classList.remove('hide')
        //localStorage.clear(); //testing purposes
}

function send() {
    //Empty textarea read as an empty string
    const xhttp = new XMLHttpRequest();
    let str = document.getElementById("question").value;
    let correct = parseInt(document.getElementById("correctAnswer").value);
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let option4 = document.getElementById("option4").value;
    if (option1 == "" || option2 == "" || option1 == "" && option2 == "" || str == "") { //checking for at least 2 questions
        window.alert("You must have at least 2 options, and a question");
        return;
    } else {
        saveQuestion();
        if (correct == 1 || correct == 2 || correct == 3 || correct == 4) {
            xhttp.open("POST", "https://kwangler.com/COMP351/individualProject/adminDB/?question=" + str + "&correctAnswer=" + correct + "&option1=" + option1 + "&option2=" + option2 + "&option3=" + option3 + "&option4=" + option4 + "&questionNumber=" + currentQuestion, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("message").innerHTML = "The question was stored";
                }
            }
        } else {
            window.alert("Please pick a number 1,2,3, or 4 for the corrent answer!");
            return;
        }
    }
};

function update() {
    //Empty textarea read as an empty string
    const xhttp = new XMLHttpRequest();
    let str = document.getElementById("question").value;
    let correct = document.getElementById("correctAnswer").value;
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let option4 = document.getElementById("option4").value;
    if (option1 == "" || option2 == "" || option1 == "" && option2 == "" || str == "") { //checking for a question and 2 options
        window.alert("You must have at least 2 options, and a question");
        return;
    } else {
        saveQuestion();
        if (correct == 1 || correct == 2 || correct == 3 || correct == 4) {
            xhttp.open("PUT", "https://kwangler.com/COMP351/individualProject/adminDB/?question=" + str + "&correctAnswer=" + correct + "&option1=" + option1 + "&option2=" + option2 + "&option3=" + option3 + "&option4=" + option4 + "&questionNumber=" + currentQuestion, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("message").innerHTML = "The question was updated";
                }
            }
        } else {
            window.alert("Please pick a number 1,2,3, or 4 for the corrent answer!");
            return;
        }
    }
};




function retrieveStorage() {
    if (localStorage.getItem("storedQuestions") == null || localStorage.getItem("storedNumberOfQuestions") == null) {
        window.alert("No existing questions saved. If this is expected, carry on.")
    } else {
        let storedQuestions = localStorage.getItem("storedQuestions");
        let numOfQ = localStorage.getItem("storedNumberOfQuestions")
            //console.log(storedQuestions); //for testing
        allQuestions = JSON.parse(storedQuestions);
        numberOfQuestions = JSON.parse(numOfQ);
    }
}

function saveQuestion() {
    let question = document.getElementById("question").value
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    let option3 = document.getElementById("option3").value;
    let option4 = document.getElementById("option4").value;
    let correctAnswer = document.getElementById("correctAnswer").value;
    allQuestions[currentQuestion - 1].question = question;
    allQuestions[currentQuestion - 1].option1 = option1;
    allQuestions[currentQuestion - 1].option2 = option2;
    allQuestions[currentQuestion - 1].option3 = option3;
    allQuestions[currentQuestion - 1].option4 = option4;
    allQuestions[currentQuestion - 1].correctAnswer = correctAnswer;
    localStorage.setItem("storedQuestions", JSON.stringify(allQuestions));
    localStorage.setItem("storedNumberOfQuestions", JSON.stringify(numberOfQuestions));
}

function addQuestion() {
    numberOfQuestions++;
    currentQuestion = numberOfQuestions;
    clearFields()
    pushQuestion()
    storeButtonElement.classList.remove('hide')
    updateButtonElement.classList.add('hide')
}

function pushQuestion() {
    allQuestions.push({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct: ""
    });
}

function printAnswer() {
    questionInputElement.value = allQuestions[currentQuestion - 1].question;
    option1Element.value = allQuestions[currentQuestion - 1].option1;
    option2Element.value = allQuestions[currentQuestion - 1].option2;
    option3Element.value = allQuestions[currentQuestion - 1].option3;
    option4Element.value = allQuestions[currentQuestion - 1].option4;
    document.getElementById("currentQuestionNumber").innerHTML = "Question " + currentQuestion;
    correctAnswerElement.value = allQuestions[currentQuestion - 1].correctAnswer;
};

function clearFields() {
    questionInputElement.value = "";
    option1Element.value = "";
    option2Element.value = "";
    option3Element.value = "";
    option4Element.value = "";
    correctAnswerElement.value = "";
    document.getElementById("currentQuestionNumber").innerHTML = "Question " + currentQuestion;
}

function nextQuestion() {
    if (currentQuestion < numberOfQuestions) {
        currentQuestion++;
        printAnswer();
        storeButtonElement.classList.add('hide')
        updateButtonElement.classList.remove('hide')
    } else {
        window.alert("No subsequent questions!")
        storeButtonElement.classList.remove('hide')
        updateButtonElement.classList.add('hide')
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        printAnswer();
        storeButtonElement.classList.add('hide')
        updateButtonElement.classList.remove('hide')
    } else {
        window.alert("No prior questions!")
    }
}

function deleteQ() {
    if (currentQuestion == numberOfQuestions) {
        const xhttp = new XMLHttpRequest();
        //console.log(currentQuestion); //testing
        let str = "";
        xhttp.open("DELETE", "https://kwangler.com/COMP351/individualProject/adminDB/?question=" + str + "&questionNumber=" + currentQuestion, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("message").innerHTML = "The question was deleted";
                }
            }
            //console.log(numberOfQuestions); //testing
        deleteQuestion;
        //numberOfQuestions--;
    } else {
        window.alert("You can only delete the last question.");
    }
}

function deleteQuestion() {
    if (confirm('Are you sure you want to delete the current question?')) {
        currentQuestion--;
        numberOfQuestions--;
        allQuestions.splice(currentQuestion, 1);
        printAnswer();
        localStorage.setItem("storedQuestions", JSON.stringify(allQuestions));
        localStorage.setItem("storedNumberOfQuestions", JSON.stringify(numberOfQuestions));

    }
}