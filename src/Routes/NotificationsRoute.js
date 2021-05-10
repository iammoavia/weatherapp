const MoonCalendar = require('../Controllers/MoonCalendar');
const express = require("express");
const fetch = require('node-fetch');
var admin = require("firebase-admin");

var serviceAccount = require("../../lyrical-art-284117-firebase-adminsdk-83tph-c516a6b345.json");

const router = express.Router();
router.use(express.json());
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://lyrical-art-284117.firebaseio.com/"
});
const db = admin.firestore();
router.post('/send-to-all',async(req,res) => {
    var registrationTokens = [];
    db.collection('apptoken').get().then(snap => {
        
        snap.docs.map(t => {
            registrationTokens.push(t.data().token);
        });
        console.log(registrationTokens)
        var payload = {
            notification: {
                title: "This is a Notification",
                body: "This is the body of the notification message."
            }
        };
        
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        admin.messaging().sendToDevice(registrationTokens, payload,options)
            .then(function (response) {
                res.status(200).json(response);
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                res.json(error);
                console.log("Error sending message:", error);
        });  
    }).catch(e => console.log(e));

    
})
module.exports = router;