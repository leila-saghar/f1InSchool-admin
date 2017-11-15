var admin = require("firebase-admin");
var fs = require('fs'); 
var parse = require('csv-parse');


var serviceAccount = require("./f1inschools-df6e1-firebase-adminsdk-mk1e9-70f4c17b17.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://f1inschools-df6e1.firebaseio.com"
});
var result = [];
var db = admin.firestore();