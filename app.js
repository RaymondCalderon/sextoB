var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-Parser');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine','ejs');
var entries = [];
app.locals.entries = entries;

var lip_blanca=['192.168.0.4','192.168.0.1','::1'];
var aux;

app.locals.entries=entries;

var IP_MALVADA="::1";

app.use("/new-entry",(request,response,next,)=>{
    for (var i = 0; i<lip_blanca.length; i++){
        aux=lip_blanca[i];
    }

    if(request.ip===aux){
        next();
    }else{
        response.status(401).send("No tienes permiso para acceder a esto");
    }
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (request, response)=> response.render("index"));

app.get('/new-entry', (request, response)=> response.render("new-entry"));

app.get('/armas', (request, response)=> response.render("armas"));

app.get('/clases', (request, response)=> response.render("clases"));

app.post('/new-entry', (request, response)=> {
    if(!request.body.title || !request.body.body){
    response.status(400).send("Verifique que la informacion solicitada este completa :D")
    return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        cellphone: request.body.cellphone,
        direc: request.body.direc,
        instagram: request.body.instagram,
        created: new Date()
    });
    response.redirect('/');    
});

app.use((request, response)=> response.status(404).render('404'));
http.createServer(app).listen(3000,()=>
console.log("La aplicacion Zombie esta corriendo en el puerto 3000"));