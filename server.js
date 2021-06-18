const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

//database code
const db = require('./app/models');
const Role = db.role;

//in production , jsut insert roles manaually into db
// db.sequelize.sync();

//remove this when in production - start
db.sequelize.sync({force:true}).then(()=> {
    console.log('Drop and Resynic DB');
    initial();
});

function initial(){
    Role.create({
        id: 1,
        name:'user'
    });

    Role.create({
        id: 2,
        name:'csm'
    });

    Role.create({
        id: 3,
        name:'admin'
    });
}

//remove this when in production - end

//parse request of content-type -application/json
app.use(bodyParser.json());

//parse request of content-type -application/x-www-from-urlloaded
app.use(bodyParser.urlencoded({ extended: true}));

//simple route 
app.get('/', (req,res) => {
    res.json({message: "Welcome to Developer Portal"});
});

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});