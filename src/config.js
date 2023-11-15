const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/auth-user")
//check database connection
    .then(() => {
    console.log("Connexion à la base de donnée avec succès")
    })
    .catch((err) => {
    console.log(`${err} Connexion à la BD echouée `);     
    });

//Create a schema
const LoginSchema = mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});

//Collection part
const usersCollections = mongoose.model("users",LoginSchema);

module.exports = usersCollections;

