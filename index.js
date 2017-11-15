var admin = require("firebase-admin");

var serviceAccount = require("./f1inschools-df6e1-firebase-adminsdk-mk1e9-70f4c17b17.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://f1inschools-df6e1.firebaseio.com"
});
var result = [];
var db = admin.firestore();
db.collection('races').get()
.then((snapshot) => {
    snapshot.forEach((doc) => {
 
        var race = {raceId : doc.id, city :doc.data()['country'], country : doc.data()['state']
    , state: doc.data()['city'], date : doc.data()['date'], venue: doc.data()['venue'], team1: {}, team2: {} };
     
        db.collection('results').where('race', '==',doc.id).get()     
        .then((snapshot) => {
            snapshot.forEach((doc1) => {
                var race = {team : doc1.data()['team'], race_time :doc1.data()['race_time'], reaction_time : doc1.data()['reaction_time'],
                split_time :doc1.data()['split_time'], combined_time : doc1.data()['combined_time']};

                if(doc1.data()['team'] == doc.data()['team1']){
                    race['team1'] = race;
                }
                else{
                    race['team2'] = race;
                }              
            });
                    
            result.push(race); 
            console.log(result);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        }); 
    });
})
.catch((err) => {
    console.log('Error getting documents', err);
});