const beginButtonElement = document.getElementById('startButton');
const nextButtonElement = document.getElementById('nextButton');
const submitButtonElement = document.getElementById('submitButton');
const exitButtonElement = document.getElementById('exitButton');
const infoElement = document.getElementById('quizInfo');
const scoreElement = document.getElementById('scores');

function start() {
    window.alert("You cannot back track.")
    const xhttp = new XMLHttpRequest();
    let answer = document.getElementById("correctAnswer").value;
    xhttp.open("GET", "https://kwangler.com/COMP351/individualProject/studentDB/?answer=" + answer, true);
    xhttp.send();
    beginButtonElement.classList.add('hide');
    infoElement.classList.remove('hide');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("info").innerHTML = this.responseText;

        }
    }
}
//test this after
function next() {
    const xhttp = new XMLHttpRequest();
    let answer = document.getElementById("correctAnswer").value; //Need if statement to check answers are 1 to 4
    if (answer == 1 || answer == 2 || answer == 3 || answer == 4) {
        xhttp.open("GET", "https://kwangler.com/COMP351/individualProject/studentDB/?answer=" + answer, true);
        xhttp.send();
        beginButtonElement.classList.add('hide');
        infoElement.classList.remove('hide');
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("info").innerHTML = this.responseText;

            }
        }
    } else {
        window.alert("Your answer must be 1, 2, 3, or 4.");
        return;
    }
}

function submit() {
    const xhttp = new XMLHttpRequest();
    let answer = document.getElementById("correctAnswer").value;
    xhttp.open("POST", "https://kwangler.com/COMP351/individualProject/studentDB/?answer=" + answer, true);
    xhttp.send();
    infoElement.classList.add('hide');
    scoreElement.classList.remove('hide');
    exitButtonElement.classList.remove('hide');
    nextButtonElement.classList.add('hide');
    submitButtonElement.classList.add('hide');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("scores").innerHTML = this.responseText;

        }
    }
}