// Modules
require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')('dev');
const twig = require('twig');
const axios = require('axios');

//variable globale
const app = express()
const port = 2018
const fecth = axios.create({
	baseURL: 'http://localhost:1998/welcome/vie/'
})

//Middlewares
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))



//routes
app.get('/',(req,res)=>{
	//inclusion du fichier a l'aide du template twig
	res.render('index.twig',{
		nom : req.params.name
	})

})

app.get('/groupe',(req,res)=>{
	
	fecth.get('/groupe')
	.then((response)=>{ 
		if(response.data.status == 'success'){
			console.log(response.data.result)

		}
		else
		{
			renderError(res,response.data.message)
		}
	})
	.catch((err) => renderError(res, err.message))
	

}) 

//lancement de l'application
app.listen(port,()=> console.log('Started successfuly on port ' + port))

//fonction pour les cas d'erreur
function renderError(res,errMsg){
	res.render('error.twig',{
		errorMsg : errMsg
	})
}