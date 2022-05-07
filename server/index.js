const express = require('express')
const app = express()
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require("nodemailer")
require('dotenv').config();
var fs = require('fs');
const bcrypt = require('bcrypt');

try {
    var data = fs.readFileSync('my-file.txt', 'utf8');
    var line = data.split("/n")
    var email_auth = line[0].substring(0,23)
    var password_auth = line[0].substring(25,41)    
} catch(e) {
    console.log('Error:', e.stack);
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddatabase'
});


app.use(cors())
app.use(express.json()); //grab the request from the front end as a json
app.use(bodyParser.urlencoded({extended:true}));


//Read
app.get('/api/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM user_infos";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})

// Fetch user's data for code confirmation
app.post('/api/fetch_user_infos', (req, res) =>{

    const Reg_email = req.body.Reg_email
    const sqlSelect = "SELECT * FROM user_infos where useremail_reg=?";
    db.query(sqlSelect,[Reg_email], (err, result) =>{
        res.send(result);
    })
})

//Password Check
app.post('/api/userpass/check', (req, res) =>{

    const Reg_email = req.body.Reg_email
    const Reg_password = req.body.Reg_password
    const sqlSelect = "SELECT userpassword_reg,username_reg,confirmed FROM user_infos where useremail_reg = ?;";
    db.query(sqlSelect,[Reg_email], (err, result) =>{
        try{
        const is_confirmed = JSON.parse(JSON.stringify(result))[0].confirmed
        const pass_result = JSON.parse(JSON.stringify(result))[0].userpassword_reg
        const pass_confirm_obj = JSON.parse(JSON.stringify(result))[0]
        
        // pass_confirm_obj.correct_pass = true;
        // console.log(pass_confirm_obj)
        bcrypt.compare(Reg_password, pass_result, function(err, result_hashed) {
            const correctPass_confirmed_obj = {"username_reg":JSON.parse(JSON.stringify(result))[0].username_reg,
            "confirmed":JSON.parse(JSON.stringify(result))[0].confirmed,
            "correct_pass":result_hashed}

            console.log(correctPass_confirmed_obj)
            res.send(correctPass_confirmed_obj)
            //{ confirmed: 'false', correct_pass: false }
        });
    }
    catch{
        res.send([])
    }
        // console.log(err);
    })
})

//Password update
app.put('/api/userpass/update', (req,res) => {
    const Reg_email=req.body.Reg_email
    const Reg_password=req.body.Reg_password

    const sqlUpdate ='UPDATE user_infos SET userpassword_reg=? WHERE useremail_reg=?';

    bcrypt.hash(Reg_password, 10, function(err, hash) {
        db.query(sqlUpdate,[hash,Reg_email], (err,result) =>{
            res.send(result);
            // if (err) console.log(err)
        })
    });
})

//Username update
app.put('/api/username/update', (req,res) => {
    const Reg_email=req.body.Reg_email
    const Reg_username=req.body.Reg_username

    const sqlUpdate ='UPDATE user_infos SET username_reg=? WHERE useremail_reg=?';

    db.query(sqlUpdate,[Reg_username,Reg_email], (err,result) =>{
        res.send(result);
        // if (err) console.log(err)
    })
})


app.get('/api/comment/get', (req, res) =>{
    const sqlSelect = "select user_infos.username_reg,user_infos.useremail_reg,comments_table.comment_id,comments_table.comment_text, comments_table.date_written,useravatar_url from user_infos inner join comments_table on user_infos.useremail_reg = comments_table.useremail_reg";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
        // if (err) console.log(err)
    })
})

app.get('/api/comment/comment_id/get', (req,res) =>{
    const sqlSelect = "SELECT comments_table.comment_id FROM comments_table ORDER BY comment_id DESC LIMIT 1";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
        // if (err) console.log(err)
    })
})

app.post('/api/comment/insert', (req, res) =>{
     
    const useremail_reg = req.body.useremail_reg
    const comment_text = req.body.comment_text
    const date_written = req.body.date_written

    const sqlInsert= "INSERT INTO comments_table (useremail_reg, comment_text, date_written) VALUES (?,?,?)"
    db.query(sqlInsert,[useremail_reg, comment_text, date_written], (err,result)=>{
        console.log(req.body.useremail_reg);
        res.send(result);
        console.log(err);
    })
});
//Delete
app.delete('/api/comment/delete/:comment_id',(req,res) => {
    const comment_id=req.params.comment_id
    const sqlDelete= "DELETE FROM comments_table WHERE comment_id=?"

    db.query(sqlDelete,comment_id, (err,result) => {
        res.send(result);
       if (err) console.log(err)
    })

})

app.delete('/api/reply/delete/:comment_id',(req,res) => {
    const comment_id=req.params.comment_id
    const sqlDelete= "DELETE FROM replies_table WHERE comment_id =?"

    db.query(sqlDelete,comment_id, (err,result) => {
        res.send(result);
       if (err) console.log(err)
    })

})


app.delete('/api/user_reply/delete/:comment_id',(req,res) => {
    const comment_id=req.params.comment_id
    const sqlDelete= "DELETE FROM replies_table WHERE reply_id =?"

    db.query(sqlDelete,comment_id, (err,result) => {
        res.send(result);
       if (err) console.log(err)
    })

})

//edit
app.put('/api/comment/update', (req,res) => {
    const comment_id=req.body.comment_id
    const comment_text=req.body.comment_text

    const sqlUpdate ='UPDATE comments_table SET comment_text=? WHERE comment_id=?';

    db.query(sqlUpdate,[comment_text,comment_id], (err,result) =>{
        res.send(result);
        if (err) console.log(err)
    })
})

app.put('/api/reply/update', (req,res) => {
    const Reply_value = req.body.Reply_value
    const Reply_id = req.body.Reply_id

    const sqlUpdate ='UPDATE replies_table SET reply_content=? WHERE reply_id=?';

    console.log(Reply_value)
    console.log(Reply_id)
    db.query(sqlUpdate,[Reply_value,Reply_id], (err,result) =>{
        res.send(result);
        if (err) console.log(err)
    })
})

app.put('/api/confirm/update', (req,res) => {
    const log_Email = req.body.log_Email
    const confirm = req.body.confirm

    const sqlUpdate='UPDATE user_infos SET confirmed=? WHERE useremail_reg=?';

    db.query(sqlUpdate,[confirm,log_Email], (err, result) => {
        res.send(result);
        if (err) console.log(err)
    })
})

//replies_get
app.post('/api/reply_get', (req, res) =>{

    const sqlSelect = "SELECT reply_id,comment_id, useravatar_url, replies_table.useremail_reg, reply_content, reply_written, username_reg FROM replies_table inner join user_infos on user_infos.useremail_reg = replies_table.useremail_reg";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
        // console.log(err);
    })
})


//Create
app.post('/api/reply_insert', (req, res)=>{

    const Reg_email = req.body.Reg_email
    const Reply_content = req.body.Reply_content
    const Reply_written = req.body.Reply_written
    const Comment_ID = req.body.Comment_ID

    const sqlInsert = "INSERT INTO replies_table (useremail_reg, reply_content, reply_written, comment_id) VALUES (?,?,?,?)"

    db.query(sqlInsert, [Reg_email, Reply_content, Reply_written, Comment_ID], (err, result)=>{
        // console.log(err);
        res.send(result)
    })
});

//Create Account
app.post('/api/insert', (req, res)=>{

    const Reg_email = req.body.Reg_email
    const Reg_username = req.body.Reg_username
    const Reg_password = req.body.Reg_password
    const Reg_avatar_url = req.body.Reg_avatar_url
    const confirmed = req.body.confirmed
    const code = req.body.code
    const sqlInsert = "INSERT INTO user_infos (useremail_reg, username_reg, userpassword_reg, useravatar_url, confirmed, code) VALUES (?,?,?,?,?,?)"

    bcrypt.hash(Reg_password, 10, function(err, hash) {
        db.query(sqlInsert, [Reg_email, Reg_username, hash, Reg_avatar_url, confirmed, code], (err, result)=>{
            res.send(result);
        })
    });
});

app.post('/api/avatar_get', (req, res) =>{

    const Reg_email = req.body.Reg_email
    const sqlSelect = "SELECT useravatar_url FROM user_infos where useremail_reg = ?";
    db.query(sqlSelect,[Reg_email], (err, result) =>{
        res.send(result);
        // console.log(err);
    })
})

app.put('/api/avatar/update', (req,res) => {
    const Reg_avatar_url = req.body.Reg_avatar_url
    const Reg_email = req.body.Reg_email

    const sqlUpdate ='UPDATE user_infos SET useravatar_url=? WHERE useremail_reg=?';
    db.query(sqlUpdate,[Reg_avatar_url,Reg_email], (err,result) =>{
        res.send(result);
        // if (err) 
        //     console.log(err)
    })
})


app.post('/api/sendemail', (req,res) => {
    const code = req.body.code;
    const email = req.body.email;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: email_auth,
          pass: password_auth, 
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"DSA Visualizer" <visualizerdsa@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "E-mail Confirmation", // Subject line
        text: "\nVisit the link to confirm your E-mail Address: https://dsa-visualizer-client.herokuapp.com/login-form/?code="+code+"&email="+email+"\nAlternatively, You can use this code to confirm your E-mail Address: \n",code, // plain text body
        html: '<b>To start using your account, you have to confirm your E-mail Address: </b><a href="https://dsa-visualizer-client.herokuapp.com/login-form/?code='+code+'&email='+email+'"  target="_blank">Confirm E-mail Address</a>\nCode:' + code, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
})

//Backend

//AdminPanel
app.get('/api/admin/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM admin_panel";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})

app.get('/api/admin/get_questions', (req, res) =>{
    const sqlSelect = "SELECT * FROM quiz_questions";
    db.query(sqlSelect, (err, result) =>{
        res.send(result)
    })
})

app.post('/api/admin/insert_questions', (req, res) =>{
     
    const question_type = req.body.question_type
    const question_content = req.body.question_content
    const question_choices = req.body.question_choices
    const correct_answer = req.body.correct_answer

    const sqlInsert= "INSERT INTO quiz_questions (question_type, question_content, question_choices, correct_answer) VALUES (?,?,?,?)"
    db.query(sqlInsert,[question_type, question_content, question_choices, correct_answer], (err,result)=>{
        console.log(req.body.question_content);
        res.send(result);
        console.log(err);
    })
});

app.delete('/api/admin/delete_question/:question_id', (req, res) =>{
    console.log(req.params.question_id)
    const question_id = req.params.question_id
    const sqlDelete = "DELETE FROM quiz_questions WHERE question_id =?"

    db.query(sqlDelete, question_id, (err, result)=>{
        res.send(result);
        if(err)console.log(err);
    })
})


app.get('/api/admin/quiz_id/get', (req,res) =>{
    const sqlSelect = "SELECT question_id FROM quiz_questions ORDER BY question_id DESC LIMIT 1";
    db.query(sqlSelect, (err,result) => {
        res.send(result);
        // if (err) console.log(err)
    })
})


app.delete('/api/admin/truncate_question', (req, res) =>{

    const sqlDelete = "TRUNCATE quiz_questions;"

    db.query(sqlDelete, (err, result)=>{
        res.send(result);
        console.log("TRUNCATED")
        if(err)console.log(err);
    })
})

//Gather Data for Dashboard
//User
app.get('/api/admin/user_stats', (req, res) =>{
    const sqlSelect = "SELECT(SELECT COUNT(*) FROM user_infos) AS 'Total_Users', (SELECT COUNT(*) FROM user_infos WHERE confirmed='true') AS 'Verified_Users';";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})
//Get Users Comment Amt (Highest to Lowest)
app.get('/api/admin/user_stats_comments', (req, res) =>{
    const sqlSelect = "SELECT useremail_reg as 'Username', COUNT(comment_id) AS 'Comments' FROM comments_table GROUP BY useremail_reg ORDER BY COUNT(useremail_reg) DESC LIMIT 5;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})
//Get Users Reply Amt (Highest to Lowest)
app.get('/api/admin/user_stats_replies', (req, res) =>{
    const sqlSelect = "SELECT useremail_reg as 'Username', COUNT(comment_id) AS 'Replies' FROM replies_table GROUP BY useremail_reg ORDER BY COUNT(useremail_reg) DESC LIMIT 5;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})
//Comments & Replies
app.get('/api/admin/comments_replies_stats', (req, res) =>{
    const sqlSelect = "SELECT (SELECT COUNT(*) FROM comments_table) AS 'Comments',(SELECT COUNT(*) FROM replies_table) AS 'Replies';";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})

//Quiz

app.post('/api/quiz_finish', (req, res) =>{

    const Reg_email = req.body.Reg_email
    const User_score = req.body.User_score
    const Q_total = req.body.Q_total
    const Q_taken = req.body.Q_taken

    const sqlSelect = "INSERT INTO quiz_statistics (useremail_reg, user_score, questions_total, quiz_taken) VALUES (?,?,?,?)";
    db.query(sqlSelect,[Reg_email, User_score, Q_total, Q_taken], (err, result) =>{
        res.send(result);
        console.log(err);
    })
})

app.get('/api/admin/quiz_questions_stats', (req, res) =>{
    const sqlSelect = "SELECT COUNT(*) AS 'Questions' FROM quiz_questions;";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    })
})

//Delete Users
app.delete('/api/username/delete/:useremail',(req,res) => {
    const userindex= req.params.useremail
    const sqlDelete= "DELETE FROM user_infos WHERE useremail_reg=?"

    db.query(sqlDelete, userindex, (err,result) => {
        res.send(result);
       if (err) console.log(err)
    })

})

//Delete comments when account deleted
app.delete('/api/user_comment/delete/:reg_email',(req,res) => {
    const Reg_email = req.params.reg_email
    const sqlDelete = "DELETE FROM comments_table WHERE useremail_reg=?"

    db.query(sqlDelete,Reg_email, (err,result) => {
        res.send(result);
       if (err) console.log(err)
    })

})

//Delete replies when account deleted
app.delete('/api/user_reply/delete/:reg_email',(req,res) => {
    const Reg_email = req.params.reg_email
    const sqlDelete = "DELETE FROM replies_table WHERE useremail_reg=?"

    console.log(Reg_email)
    db.query(sqlDelete,Reg_email, (err,result) => {
        res.send(result);
       if (err) console.log(err)
    })

})

app.listen(3001, () => {
    console.log("Running on port 3001");
});
