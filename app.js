const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const AuthRoute = require('./src/Routes/AuthRoute');
const forgotPasswordRoute = require('./src/Routes/ForgotPasswordRoute');
const fishingPointsRoute = require('./src/Routes/FishingPoints');
const hospitalsRoute = require('./src/Routes/Hospitals');
const AirportsRoute = require('./src/Routes/Airports');
const CampingRoute = require('./src/Routes/Camping');
const kiteSurfingRoute = require('./src/Routes/KiteSurfing');
const MountSheltersRoute = require('./src/Routes/MountShelters');
const PassengerPortsRoute = require('./src/Routes/PassengerPorts');
const PortAuthoritiesRoute = require('./src/Routes/PortAuthorities');
const SkiCentersRoute = require('./src/Routes/SkiCenters');
const livecameraRoute = require('./src/Routes/LiveCameraRoute');
const WeatherStationsRoute = require('./src/Routes/WeatherStations');
const fishing_shelterRoute = require('./src/Routes/FishingShelters');
const SlipwaysRoute = require('./src/Routes/SlipwayRoute');
const Airports = require('./src/Schemas/Airports');
const Camping = require('./src/Schemas/Camping');
const FishingPoints = require('./src/Schemas/FishingPoints');
const fishingShelters = require('./src/Schemas/FishingShelters');
const Hospitals = require('./src/Schemas/Hospitals');
const KiteSurfing = require('./src/Schemas/KiteSurfing');
const LiveCameras = require('./src/Schemas/LiveCamera');
const MountShelters = require('./src/Schemas/MountShelters');
const PassengerPorts = require('./src/Schemas/PassengerPorts');
const PortAuthorities = require('./src/Schemas/PortAuthorities');
const SlipwaysSchema = require('./src/Schemas/Slipways');
const SubwaySchema = require('./src/Schemas/Subways');
const SkiCenters = require('./src/Schemas/SkiCenters');
const SubwayRoute = require('./src/Routes/SubwayRoute');
const WeatherStations = require('./src/Schemas/WeatherStations');
const NotificationsRoute = require('./src/Routes/NotificationsRoute');
const PassengerPortsRoutes = require('./src/Routes/PassengerPorts');
const MoonCalendarRoute = require('./src/Routes/MoonCalendar');
const NotificationSchema = require('./src/Schemas/Notification');
const paymentRoute = require('./src/Routes/paymentRoute');
const MoonSchema = require('./src/Schemas/MoonCalendar')
const AuthSchema = require('./src/Schemas/UserSchema');
const TrialSchema = require('./src/Schemas/TrialSchema');
const paymentSchema = require('./src/Schemas/PaymentSchema');
const DB = 'mongodb+srv://admin_user:UIoHGxma93UhQQA8@cluster0.jfbso.mongodb.net/weather?retryWrites=true&w=majority';
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/// Listening to the server
require('./src/Configuration/localStrategy');

const server = app.listen(process.env.PORT || 7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});


app.use('/uploads', express.static('uploads'));
app.use('/user',AuthRoute);
app.use('/passenger-ports',PassengerPortsRoute);
app.use('/forget-password',forgotPasswordRoute)
app.use('/fishing-points',fishingPointsRoute);
app.use('/hospitals',hospitalsRoute);
app.use('/airports',AirportsRoute);
app.use('/camping',CampingRoute);
app.use('/fishing-shelters',fishing_shelterRoute);
app.use('/port-authorities',PortAuthoritiesRoute);
app.use('/mount-shelters',MountSheltersRoute);
app.use('/livecamera',livecameraRoute);
app.use('/ski-centers',SkiCentersRoute);
app.use('/slipways',SlipwaysRoute);
app.use('/subways',SubwayRoute);
app.use('/payment',paymentRoute);
app.use('/notification',NotificationsRoute);
app.use('/weather-stations',WeatherStationsRoute);
app.use('/kite-surfings',kiteSurfingRoute);
app.use('/moon-calendar',MoonCalendarRoute);
app.use('/get-notifications', async (req, res) => {
    try {
        const allNotifications = await NotificationSchema.find();
        res.status(200).json({
            success: true,
            Data: allNotifications
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            Message: 'An error occured while getting notifications.',
            Error: e
        })
    }
})
app.get('/get-counts', async (req, res) => {
    try {

        const airportsLength = await Airports.find();
        const Campinglength = await Camping.find();
        const FishingPointsLenght = await FishingPoints.find();
        const FishingSheltersLength = await fishingShelters.find();
        const HopsitalsLength = await Hospitals.find();
        const KiteSurfingLength = await KiteSurfing.find();
        const LiveCamerasLength = await LiveCameras.find();
        const MountSheltersLength = await MountShelters.find();
        const PassengerPortsLength = await PassengerPorts.find();
        const PortAuthoritiesLenght = await PortAuthorities.find();
        const SkiCentersLength = await SkiCenters.find();
        const weatherStationsLenght = await WeatherStations.find();
        const subwaysLength = await SubwaySchema.find();
        const slipwaysLength = await SlipwaysSchema.find();
        const moonLength = await MoonSchema.find();
        const blockedUsers = await AuthSchema.find({ status: 'BLOCKED' });
        const ActiveUsers = await AuthSchema.find({ status: 'ACTIVE' });
        const paymentLength = await paymentSchema.find();
        const trialLength = await TrialSchema.find();
        res.status(200).json({
            success: true,
            airports: airportsLength.length,
            camping: Campinglength.length,
            fishingpoints: FishingPointsLenght.length,
            fishingShelters: FishingSheltersLength.length,
            hospitals: HopsitalsLength.length,
            kitesurfing: KiteSurfing.length,
            livecamera: LiveCamerasLength.length,
            mountshelter: MountSheltersLength.length,
            passengerport: PassengerPortsLength.length,
            portAuthorities: PortAuthoritiesLenght.length,
            skicenter: SkiCentersLength.length,
            weatherstation: weatherStationsLenght.length,
            kitesurfing: KiteSurfingLength.length,
            slipways: slipwaysLength.length,
            subways: subwaysLength.length,
            moon: moonLength.length,
            blockedUsers: blockedUsers.length,
            activeUsers: ActiveUsers.length,
            subscribed: paymentLength.length,
            trial: trialLength.length
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            Message: 'An Error ocurred while getting counts for you',
            Error: e
        })
    }
});

//connecting database here

const dbConfigs = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(DB, dbConfigs, () => {
    console.log('connected to database');
});


// Admin Portal

// const express = require('express');
var path = require('path');
// var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer();
// const app = express();
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

// const server = app.listen(7000, () => {
//     console.log(`Express running → PORT ${server.address().port}`);
// });

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


