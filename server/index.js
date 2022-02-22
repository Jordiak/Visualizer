const express = require('express')
const app = express()
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddatabase'
})

app.use(cors());
app.use(express.json()); //grab the request from the front end as a json
app.use(bodyParser.urlencoded({extended:true}));

//Read
app.get('/api/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM user_infos";
    db.query(sqlSelect, (err, result) =>{
        res.send(result)
    })
})

//Password update
app.put('/api/userpass/update', (req,res) => {
    const Reg_email=req.body.Reg_email
    const Reg_password=req.body.Reg_password

    const sqlUpdate ='UPDATE user_infos SET userpassword_reg=? WHERE useremail_reg=?';

    db.query(sqlUpdate,[Reg_password,Reg_email], (err,result) =>{
        // if (err) console.log(err)
    })
})

//Username update
app.put('/api/username/update', (req,res) => {
    const Reg_email=req.body.Reg_email
    const Reg_username=req.body.Reg_username

    const sqlUpdate ='UPDATE user_infos SET username_reg=? WHERE useremail_reg=?';

    db.query(sqlUpdate,[Reg_username,Reg_email], (err,result) =>{
        // if (err) console.log(err)
    })
})


app.get('/api/comment/get', (req, res) =>{
    const sqlSelect = "select cruddatabase.user_infos.username_reg,cruddatabase.user_infos.useremail_reg,cruddatabase.comments_table.comment_id,cruddatabase.comments_table.comment_text, cruddatabase.comments_table.date_written,useravatar_url from cruddatabase.user_infos inner join cruddatabase.comments_table on cruddatabase.user_infos.useremail_reg = cruddatabase.comments_table.useremail_reg";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
        // if (err) console.log(err)
    })
})

app.get('/api/comment/comment_id/get', (req,res) =>{
    const sqlSelect = "SELECT cruddatabase.comments_table.comment_id FROM cruddatabase.comments_table ORDER BY comment_id DESC LIMIT 1";
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
    db.query(sqlInsert,[useremail_reg,comment_text, date_written],(err,result)=>{
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

//replies_get
app.post('/api/reply_get', (req, res) =>{

    const sqlSelect = "SELECT reply_id,comment_id, useravatar_url, replies_table.useremail_reg, reply_content, reply_written, username_reg FROM cruddatabase.replies_table inner join user_infos on user_infos.useremail_reg = replies_table.useremail_reg";
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
    })
});

//Create
app.post('/api/insert', (req, res)=>{

    const Reg_email = req.body.Reg_email
    const Reg_username = req.body.Reg_username
    const Reg_password = req.body.Reg_password
    const Reg_avatar_url = req.body.Reg_avatar_url

    const sqlInsert = "INSERT INTO user_infos (useremail_reg, username_reg, userpassword_reg, useravatar_url) VALUES (?,?,?,?)"

    db.query(sqlInsert, [Reg_email, Reg_username, Reg_password, Reg_avatar_url], (err, result)=>{
        res.send(result);
        console.log(err);
    })
});

app.post('/api/avatar_get', (req, res) =>{

    const Reg_email = req.body.Reg_email
    const sqlSelect = "SELECT useravatar_url FROM cruddatabase.user_infos where useremail_reg = ?";
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
        // if (err) 
        //     console.log(err)
    })
})




app.listen(3001, () => {
    console.log("Running on port 3001");
});


