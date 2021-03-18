let http = require('http');
let url = require('url');
let mysql = require("mysql");

let question;
let correct;
let option1;
let currentQuestion;
let options = [];



const con = mysql.createConnection({
    host: "localhost",
    user: "kwangler_kwangler",
    password: "ind_project123",
    database: "kwangler_ind_project"
});

http.createServer(function(req, res) {
    let q = url.parse(req.url, true);
    console.log(q.query);
    res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    });
    //console.log(req.method) //TESTING
    if (req.method === 'POST') {
        console.log("here1");
        storeSQL1(res, q);

    } else if (req.method === 'PUT' || req.method === 'OPTIONS' && q.query["question"] != "") {
        console.log("here2");
        updateSQL(res, q);
    } else if (req.method === 'DELETE' || req.method === 'OPTIONS' && q.query["question"] == "") {
        console.log("here2");
        deleteSQL(res, q);
    }


}).listen();

function storeSQL1(res, q) {
    correct = parseInt(q.query["correctAnswer"]);
    question = q.query["question"];
    option1 = q.query["option1"];
    option2 = q.query["option2"];
    option3 = q.query["option3"];
    option4 = q.query["option4"];
    currentQuestion = parseInt(q.query["questionNumber"]);

    let sql = "INSERT INTO question(q_id, question, correct_ans) VALUES (" + currentQuestion + ", '" + question + "', " + correct + " )";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 question inserted");
    });
    //Beginning of conditions
    if (option3 == "" && option4 == "") {
        options = [option1, option2];
        let j = 1;
        for (let i = 0; i < options.length; i++) {
            let sql1 = "INSERT INTO question_ans(q_id, option_num, options) VALUES (" + currentQuestion + ", " + j + ", '" + options[i] + "' )";
            con.query(sql1, function(err, result) {
                if (err) throw err;
                console.log("1 answer inserted");
            });
            j++;

        }
        res.end();

    } else if (option4 == "") {
        options = [option1, option2, option3];
        let j = 1;
        for (let i = 0; i < options.length; i++) {
            let sql1 = "INSERT INTO question_ans(q_id, option_num, options) VALUES (" + currentQuestion + ", " + j + ", '" + options[i] + "' )";
            con.query(sql1, function(err, result) {
                if (err) throw err;
                console.log("1 answer inserted");
            });
            j++;

        }
        res.end();

    } else {
        options = [option1, option2, option3, option4];
        let j = 1;
        for (let i = 0; i < options.length; i++) {
            let sql1 = "INSERT INTO question_ans(q_id, option_num, options) VALUES (" + currentQuestion + ", " + j + ", '" + options[i] + "' )";
            con.query(sql1, function(err, result) {
                if (err) throw err;
                console.log("1 answer inserted");
            });
            j++;

        }
        res.end();

    }
}

function updateSQL(res, q) {
    correct = parseInt(q.query["correctAnswer"]);
    question = q.query["question"];
    option1 = q.query["option1"];
    option2 = q.query["option2"];
    option3 = q.query["option3"];
    option4 = q.query["option4"];
    currentQuestion = parseInt(q.query["questionNumber"]);

    let sql = "UPDATE question SET question = '" + question + "', correct_ans= " + correct + " WHERE q_id = " + currentQuestion + "";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 question updated");
    });

    //Beginning of conditionals
    if (option3 == "" && option4 == "") {
        options = [option1, option2];
        let j = 1;
        for (let i = 0; i < options.length; i++) {
            //console.log(options[i])
            let sql1 = "UPDATE question_ans SET options = '" + options[i] + "' WHERE q_id = " + currentQuestion + " AND option_num= " + j + "";
            con.query(sql1, function(err, result) {
                if (err) throw err;
                console.log("Answers updated");
            });
            j++;
        }

        let sql2 = "DELETE FROM question_ans WHERE q_id= " + currentQuestion + " AND option_num= 3";
        let sql3 = "DELETE FROM question_ans WHERE q_id= " + currentQuestion + " AND option_num= 4";
        con.query(sql2, function(err, result) {
            if (err) throw err;
            console.log("Answers updated");
        });
        con.query(sql3, function(err, result) {
            if (err) throw err;
            console.log("Answers updated");
        });

        res.end();

    } else if (option4 == "") {
        options = [option1, option2, option3];
        let j = 1;
        for (let i = 0; i < options.length; i++) {
            //console.log(options[i])
            let sql1 = "UPDATE question_ans SET options = '" + options[i] + "' WHERE q_id = " + currentQuestion + " AND option_num= " + j + "";
            con.query(sql1, function(err, result) {
                if (err) throw err;
                console.log("Answers updated");
            });
            j++;
            //console.log("The current value of j is: " + j); //testing
        }
        let sql3 = "DELETE FROM question_ans WHERE q_id= " + currentQuestion + " AND option_num= 4";
        con.query(sql3, function(err, result) {
            if (err) throw err;
            console.log("Answers updated");
        });

        res.end();

    } else {
        options = [option1, option2, option3, option4];
        let j = 1;
        for (let i = 0; i < options.length; i++) {
            let sql1 = "UPDATE question_ans SET options = '" + options[i] + "' WHERE q_id = " + currentQuestion + " AND option_num= " + j + "";
            con.query(sql1, function(err, result) {
                if (err) throw err;
                console.log("Answers updated");
            });
            j++;
            //console.log("The current value of j is: " + j); //testing
        }
        res.end();

    }
}

function deleteSQL(res, q) {
    console.log("I HAVE MADE IT THIS FAR!")
    currentQuestion = parseInt(q.query["questionNumber"]);
    let sql1 = "DELETE FROM question_ans WHERE q_id= " + currentQuestion + "";
    con.query(sql1, function(err, result) {
        if (err) throw err;
        console.log("answers deleted");
    });
    let sql = "DELETE FROM question WHERE q_id= " + currentQuestion + "";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 question deleted");
    });
    res.end();
}