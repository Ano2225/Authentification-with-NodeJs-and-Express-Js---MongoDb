const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const usersCollections = require('./config');

const app = express();

//Convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Use EJS as the view engine
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("login");
})

app.get("/signUp",(req,res) => {
    res.render("signup");
});

//Register User

app.post("/signUp", async (req,res) => {

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    //Check if user already exists
    const UserExist = await usersCollections.findOne({email: data.email});

    if(UserExist) {
        res.send("E-mail existant !")
    }else {
        //Hash Password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPassword; //Replace the original password with hash password
    }

    const userData = await usersCollections.insertMany(data);
    console.log(userData);
})

//Login User
app.post("/login", async (req, res) => {
    try {
        const check = await usersCollections.findOne({email: req.body.email});

        
        const isPaswwordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPaswwordMatch) {
            console.log('Connexion successful')
            res.render("home")
        }else {
            req.send('Mot de passe incorrect')
        }
    }
    

    catch{
        res.send("Mot de passe ou email incorrect ");
    }
})

//Deconnexion
app.post("/logout", async (req, res) => {
    res.redirect('/')
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
})