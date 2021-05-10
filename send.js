var admin = require("firebase-admin");

var serviceAccount = require("./lyrical-art-284117-firebase-adminsdk-83tph-c516a6b345.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //   databaseURL: "<your database URL here>"
});
var registrationToken = "<registration token goes here>";

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
admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
});  