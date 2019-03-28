
// modules
require ('babel-register')
const bodyParser = require('body-parser')
const express = require('express')
const morgan =require('morgan')('dev')
const twig=require('twig')
const axios = require('axios')
const {success,erreur} = require('./function')
// variables globales
const app=express()
const port=8081
const fetch = axios.create({
    baseURL:'http://localhost:8080'
})

//midllewares
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+'/views/coponents/'))
//routes
//page d'acceuil
app.get('/',(req,res)=>{
    res.render('formulaire.twig')
})

// page de listage
app.get('/list',(req,res)=>{
    "use strict";
    appel('/list','get',{},res,(data)=>{

        res.render('list.twig',{
            data:data
        })
    })
})
//page de connexion

app.post('/form',(req,res)=>{
    "use strict";
    appel('/connex','post',{
        email:req.body.email_conn,
        password:req.body.password_conn
    },res,(result)=>{

        res.json(result)
    })
})

//page d'insersion
app.post('/membre',(req,res)=>{
    "use strict";
    appel('/inscrit','post',{
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        pseudo:req.body.pseudo,
        date:req.body.date,
        password:req.body.password
    },res,(result)=>{
        res.redirect('/list')
    })
})
//lancement de l'application
app.listen(port,()=>{
    "use strict";
    console.log('started on port '+port)
})

//function

function renderError(res,msg){
    "use strict";

    res.render('error.twig',{
        errormsg:msg
    })

}
function appel(url,method,data,res,next){
    "use strict";
    fetch({
        method:method,
        url:url,
        data:data
    }).then((response)=>{
        if(data.nom==undefined && data.prenom== undefined && data.password==undefined&& data.email==undefined){
            if(response.data.status== 'success'){
                next(response.data.result)
            }else{
                renderError(res,response.data.status)
            }
        }else{
            if(data.email!='' && data.password!=''){
                next(data)
            }else{
                renderError(res,'voss information sont incorrect ou inssufisante')
            }
        }
        })
    .catch((err)=> renderError(res,err.message))
}