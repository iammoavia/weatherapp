var http = require('http');
var fs = require('fs');
var url = require('url');
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app = express();
const bcrypt = require("bcrypt");
var Promise = require("bluebird");
var mysql = Promise.promisifyAll(require('mysql'))



// DB Connection 
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "moavia@Ubuntu123",
    database: "electron_pos",
    multipleStatements: true,
  });
  
  connection = Promise.promisifyAll(connection);
  
  // connect to mysql
  connection.connect(function (err) {
    // in case of error
    if (err) {
      console.log(err.code);
      console.log(err.fatal);
      dialog.showErrorBox("Error", "System was unable to connect database !");
      app.quit();
    }
  });

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/dashboard.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/login.html'));
});

app.post('/login', (req, res) => {
   
    $query = "SELECT * FROM users WHERE users.username=?;";
  // console.log(arg);
  arg = req.body;
  connection.query($query, [arg.username], function (err, rows, fields) {
    if (err) {
      console.log("An error ocurred performing the query.");
      console.log(err);
      event.returnValue = err;
      return;
    }
    if (rows.length == 1) {
      // Verify Password
      $data = rows[0];

      if (bcrypt.compareSync(arg.password, $data.passwd)) {
        user = { user: $data.fname, uid: $data.uid };
        
        // Verified set session & redirect

      } else {
       
        // Set Error Message

        return;
      }
    } else {
      
        // Set Error Message

      return;
    }
  });

});


