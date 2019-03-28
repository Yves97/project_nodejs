
require ( 'babel-register' );
const bodyParser = require ( 'body-parser' );
const express = require ( 'express' );
const app = express ();
const {success,erreur}= require ( './functions' );
const config = require ( './config' );
const morgan = require ( 'morgan' );
const mysql = require ( 'mysql' );

let Routeur = express.Router ();
let db = mysql.createConnection ( {
    host : 'localhost' ,
    database : 'alimentation' ,
    user : 'root' ,
    password : ''
} );
let dbconnect = false;
db.connect ( ( err )=> {
    "use strict";
    if ( err )  res.json(erreur( err.message ));
    else {
        dbconnect = true;
        console.log ( 'connected to database succesfully !' )
    }
} );
app.use ( morgan ( 'dev' ) );
app.use ( bodyParser.json () );
app.use ( bodyParser.urlencoded ( { extended : true } ) );

Routeur.route ( '/list' )
    .get((req,res)=>{
    if(dbconnect){
            db.query('SELECT * FROM menu',[],(err,response)=>{
                if(err)
                    res.json(erreur(err.message))
                else{
                    res.json(success(response))
                }
            

        })
           }
    })

Routeur.route( '/connex' )
      .post((req,res)=>{
        let data = [
        req.body.email,
        req.body.password
        ]
        if(dbconnect){
        db.query('select * from `compte` where email=? and password=?',data,(err,response)=>{
            if (err) res.json(erreur(err.message))
            else res.json(success(response))    
        })
    }
    })
Routeur.route ( '/inscrit' )
    .post((req,res)=>
    {
        let data = [
            req.body.nom,
            req.body.prenom,
            req.body.email,
            req.body.password
        ]
        console.log('data content\n')
        console.dir(data)
        if(dbconnect)
        {
            db.query('INSERT INTO compte(nom,prenom,email,password) VALUES(?,?,?,?)',data,(err,result)=>{
                if(err)
                    console.log(err.message)
                else
                    res.json(result.insertId)
            })
        }
    });

Routeur.route ( '/' );

app.use ( config.rootAPI , Routeur );
app.listen ( config.port , ()=> console.log ( 'started on port: ' + config.port ) );
