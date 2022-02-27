const express = require('express');
const bodyParser = require('body-parser');
const classeRoute = require("./src/Routes/ClasseRoute");
const enseignantRoute=require("./src/Routes/EnseignantRoute");
const matRoute=require("./src/Routes/MatiereRoute");
var dbConn= require('./Config/db')
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
var cors = require('cors')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route

app.use(express.json())
app.use(cors({origin:"http://localhost:3000"}));

app.use("/Enseignanat",enseignantRoute);
app.use("/Classe",classeRoute);
app.use("/Matiere",matRoute);
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});