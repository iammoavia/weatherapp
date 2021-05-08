
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer();
const app = express();
const bcrypt = require("bcrypt");
var Promise = require("bluebird");
// const { req } = require('node:http');
var mysql = require('mysql');//Promise.promisifyAll()
var cons = require('consolidate');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(flash());



// DB Connection 
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "moavia@Ubuntu123",
  database: "dbweatherapp",
  multipleStatements: true,
});

connection = Promise.promisifyAll(connection);

// connect to mysql
connection.connect(function (err) {
  // in case of error
  if (err) {
    console.log(err.code);
    console.log(err.fatal);
    return;
  }

  console.log("DB connected !");
});

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
// app.use(express.static(__dirname + 'public/views'));

app.engine('html', cons.ejs);
app.set('view engine', 'html');

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

  if (req.session.loggedin) {
    console.log('Loading Language', req.session.lan);
    res.render(path.join(__dirname + '/public/views/dashboard.html'), {
      lan: req.session.lan,
      access: req.session.access,
      username: req.session.username
    }, function (err, html) {

      if (err) {
        throw err;
      }

      res.send(html)
    });
  } else {
    res.redirect('/login');
  }
});


app.get('/login', (req, res) => {
  if (typeof req.session.loggedin != 'undefined' && req.session.loggedin) {
    return res.redirect('/login');
  } else {
    return res.render(path.join(__dirname + '/public/views/login.html'), {
      error: req.session.error
    }, function (err, html) {
      res.send(html)
    });
    // app.set('views', __dirname + '/public/views/login.html');
    // app.engine('html', engines.mustache);
    // app.set('view engine', 'html');
  }
});

app.get('/logout', (req, res) => {

  req.session.destroy();

  return res.redirect('/login');
});

app.post('/lang', (req, res) => {

  // if (typeof req.session.loggedin != 'undefined' && req.session.loggedin) {
  //   return res.redirect('/login');
  // }

  arg = req.body;

  connection.query("UPDATE tbladmins SET tbladmins.language=? WHERE tbladmins.username=?;", [arg.lan, req.session.username], function (err, res_in) {
    if (err) {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: false, error: 'No changes' }));
    }

    req.session.lan = arg.lan;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: true, data: arg }));
  });

});

app.post('/password', (req, res) => {

  // for parsing multipart/form-data
  // app.use(upload.array());
  arg = req.body;

  arg.password = bcrypt.hashSync(arg.password, 10);

  $query = "UPDATE tbladmins SET tbladmins.password = ? WHERE tbladmins.username = ?;";

  connection.query($query, [arg.password, req.session.username], function (err, res_in) {

    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: false, error: 'Unable to update password' }));
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: true, data: arg }));


  });


});


app.delete('/access/:id', (req, res) => {

  if (req.session.loggedin) {
    connection.query("DELETE FROM tbladmins WHERE tbladmins.id=?;", [req.params.id], function (err, res_in) {

      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: false }));
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: true, data: res_in }));
    });

  } else {
    res.redirect('/login');
  }

});

app.get('/access', (req, res) => {
  if (req.session.loggedin) {
    connection.query("SELECT id,name,username,email FROM tbladmins ORDER BY tbladmins.name;", [], function (err, res_in) {

      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: false }));
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: true, data: res_in }));
    });

  } else {
    res.redirect('/login');
  }
})

app.post('/access', (req, res) => {

  // for parsing multipart/form-data
  // app.use(upload.array());
  arg = req.body;
  arg.access = JSON.stringify(arg.access);

  console.log('recieved', arg);

  arg.password = bcrypt.hashSync(arg.password, 10);

  $query = "INSERT INTO tbladmins(username,password,email,access,language) VALUES (?,?,?,?,'E');";

  connection.query($query, [arg.username, arg.password, arg.email, arg.access], function (err, res_in) {

    if (err) {
      throw err;
    }

    arg.id = res_in.insertId;
    if (arg.id) {

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: true, data: arg }));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: false, error: 'Unable to insert record' }));
    }

  });


});

app.post('/login', (req, res) => {

  $query = "SELECT * FROM tbladmins WHERE tbladmins.username=?;";
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

      console.log("New recieved", $data.password);

      // console.log("compairing",arg.password.toString());

      if (bcrypt.compareSync(arg.password, $data.password)) {
        req.session.loggedin = true;
        req.session.username = arg.username;
        req.session.lan = $data.language;
        req.session.access = JSON.parse($data.access);
        console.log(req.session.access);
        res.redirect('/');
        return;

      } else {
        req.session.error = 'Incorrect Username and/or Password !';
      }
    } else {
      req.session.error = 'Invalid Username !';
    }

    res.redirect('/login');
  });

});


