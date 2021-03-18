let http = require('http');
let url = require('url');
let mysql = require("mysql");

let currentQuestion = 1;
let numberOfQuestions;
let correctAnswers = [];
let chosenAnswers = [];
let outputQuestion;
let numberOfAnswers;
let questionNum;
let score = 0;


const con = mysql.createConnection({
    host: "localhost",
    user: "kwangler_kwangler",
    password: "ind_project123",
    database: "kwangler_ind_project"
});

http.createServer(function(req, res) {
    const headers = {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
    }
    let q = url.parse(req.url, true);
    if (req.method === "GET" && currentQuestion == 1) {
        res.writeHead(200, headers);
        fetchSQL(res);
        return;
    } else if (req.method === "POST" && currentQuestion > numberOfQuestions) {
        res.writeHead(200, headers);
        displayScore(res, q);
        return;
    } else if (req.method === "GET" && currentQuestion <= numberOfQuestions) {
        res.writeHead(200, headers);
        fetchSQL2(res, q);
        return;
    }
}).listen();

function fetchSQL(res) { //Only does the first question
    console.log("Connected!");
    let sql1 = "SELECT q_id, question, correct_ans FROM question WHERE q_id = " + currentQuestion + "";
    con.query(sql1, function(err, result) {
        if (err) throw err;
        outputQuestion = JSON.stringify(result[0].question);
        correctAnswers[currentQuestion] = parseInt(JSON.stringify(result[0].correct_ans));
        questionNum = JSON.stringify(result[0].q_id);

    });
    let sql2 = "SELECT COUNT(options) as a from question_ans WHERE q_id = " + currentQuestion + "";
    con.query(sql2, function(err, result) {
        if (err) throw err;
        numberOfAnswers = parseInt(JSON.stringify(result[0].a));
    });

    let sql3 = "SELECT COUNT (question) as a from question";
    con.query(sql3, function(err, result) {
        if (err) throw err;
        numberOfQuestions = parseInt(JSON.stringify(result[0].a));
    });

    let sql4 = "SELECT option_num, options from question_ans WHERE q_id = " + currentQuestion + "";
    con.query(sql4, function(err, result) {
        if (err) throw err;
        if (numberOfAnswers == 4) {
            let option1Num = JSON.stringify(result[0].option_num);
            let option2Num = JSON.stringify(result[1].option_num);
            let option3Num = JSON.stringify(result[2].option_num);
            let option4Num = JSON.stringify(result[3].option_num);
            let option1 = JSON.stringify(result[0].options);
            let option2 = JSON.stringify(result[1].options);
            let option3 = JSON.stringify(result[2].options);
            let option4 = JSON.stringify(result[3].options);
            res.write('Question ' + questionNum + ' <br> ' + outputQuestion + '<br>' + option1Num + ' ' + option1 + '<br>' + option2Num + ' ' + option2 + '<br>' + option3Num + ' ' + option3 + '<br>' + option4Num + ' ' + option4 + '<br>');
            currentQuestion++;
            endCall(res);
        } else if (numberOfAnswers == 3) {
            let option1Num = JSON.stringify(result[0].option_num);
            let option2Num = JSON.stringify(result[1].option_num);
            let option3Num = JSON.stringify(result[2].option_num);
            let option1 = JSON.stringify(result[0].options);
            let option2 = JSON.stringify(result[1].options);
            let option3 = JSON.stringify(result[2].options);
            res.write('Question ' + questionNum + ' <br> ' + outputQuestion + '<br>' + option1Num + ' ' + option1 + '<br>' + option2Num + ' ' + option2 + '<br>' + option3Num + ' ' + option3 + '<br>');
            currentQuestion++;
            endCall(res);
        } else {
            let option1Num = JSON.stringify(result[0].option_num);
            let option2Num = JSON.stringify(result[1].option_num);
            let option1 = JSON.stringify(result[0].options);
            let option2 = JSON.stringify(result[1].options);
            res.write('Question ' + questionNum + ' <br> ' + outputQuestion + '<br>' + option1Num + ' ' + option1 + '<br>' + option2Num + ' ' + option2 + '<br>');
            currentQuestion++;
            endCall(res);
        }
    });

}


function fetchSQL2(res, q) {
    console.log("Connected!");
    let sql1 = "SELECT q_id, question, correct_ans FROM question WHERE q_id = " + currentQuestion + "";
    con.query(sql1, function(err, result) {
        if (err) throw err;
        outputQuestion = JSON.stringify(result[0].question);
        console.log(outputQuestion);
        correctAnswers[currentQuestion] = parseInt(JSON.stringify(result[0].correct_ans));
        questionNum = JSON.stringify(result[0].q_id);
    });

    let sql2 = "SELECT COUNT(options) as a from question_ans WHERE q_id = " + currentQuestion + "";
    con.query(sql2, function(err, result) {
        if (err) throw err;
        numberOfAnswers = parseInt(JSON.stringify(result[0].a));

    });
    let sql3 = "SELECT option_num, options from question_ans WHERE q_id = " + currentQuestion + "";
    con.query(sql3, function(err, result) {
        if (err) throw err;
        chosenAnswers[currentQuestion - 1] = parseInt(q.query["answer"]);
        if (numberOfAnswers == 4) {
            let option1Num = JSON.stringify(result[0].option_num);
            let option2Num = JSON.stringify(result[1].option_num);
            let option3Num = JSON.stringify(result[2].option_num);
            let option4Num = JSON.stringify(result[3].option_num);
            let option1 = JSON.stringify(result[0].options);
            let option2 = JSON.stringify(result[1].options);
            let option3 = JSON.stringify(result[2].options);
            let option4 = JSON.stringify(result[3].options);
            res.write('Question ' + questionNum + ' <br> ' + outputQuestion + '<br>' + option1Num + ' ' + option1 + '<br>' + option2Num + ' ' + option2 + '<br>' + option3Num + ' ' + option3 + '<br>' + option4Num + ' ' + option4 + '<br>');
            currentQuestion++;
            endCall(res);
        } else if (numberOfAnswers == 3) {
            let option1Num = JSON.stringify(result[0].option_num);
            let option2Num = JSON.stringify(result[1].option_num);
            let option3Num = JSON.stringify(result[2].option_num);
            let option1 = JSON.stringify(result[0].options);
            let option2 = JSON.stringify(result[1].options);
            let option3 = JSON.stringify(result[2].options);
            res.write('Question ' + questionNum + ' <br> ' + outputQuestion + '<br>' + option1Num + ' ' + option1 + '<br>' + option2Num + ' ' + option2 + '<br>' + option3Num + ' ' + option3 + '<br>');
            currentQuestion++;
            endCall(res);
        } else {
            let option1Num = JSON.stringify(result[0].option_num);
            let option2Num = JSON.stringify(result[1].option_num);
            let option1 = JSON.stringify(result[0].options);
            let option2 = JSON.stringify(result[1].options);
            res.write('Question ' + questionNum + ' <br> ' + outputQuestion + '<br>' + option1Num + ' ' + option1 + '<br>' + option2Num + ' ' + option2 + '<br>');
            currentQuestion++;
            endCall(res);
        }
    });

}


function displayScore(res, q) {
    console.log("Connected!");
    chosenAnswers[currentQuestion - 1] = parseInt(q.query["answer"]);
    let i = 1;
    while (i < correctAnswers.length) {
        if (correctAnswers[i] == chosenAnswers[i]) {
            score++;
            i++;
        } else {
            i++;
        }
    }
    s = JSON.stringify(score);
    n = JSON.stringify(numberOfQuestions)
    res.write('Your score is ' + s + ' of ' + n + ' questions');
    endCall(res);

}


function endCall(res) {
    res.end();
}