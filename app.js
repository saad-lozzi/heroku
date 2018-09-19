var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})
.use(function(req,res,next){
    if (typeof(req.session.nottodolist) == 'undefined'){
        req.session.nottodolist = [];

    }
    next();
})
/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
.get('/nottodo', function(req,res){
    res.render('nottodo.ejs',{nottodolist : req.session.nottodolist});
})
.post('/nottodo/ajouter', urlencodedParser, function(req,res){
    if(req.body.newnottodo != ''){
        req.session.nottodolist.push(req.body.newnottodo);
    }
    res.redirect('/nottodo');
})
.get('/nottodo/supprimer/:id', function(req,res){
    if(req.params.id != ''){
        req.session.nottodolist.splice(req.params.id, 1);
    }
    res.redirect('/nottodo');
})


.use(function(req,res,next){
    if(typeof(req.session.olist) == 'undefined'){
        req.session.olist = [];
    }
    next();
})

.get('/other', function(req,res){
    res.render('other.ejs',{olist : req.session.olist});
})
.post('/other/ajouter', urlencodedParser , function(req,res){
    if(req.body.newother != '' ){
        req.session.olist.push(req.body.newother);
    }
    res.redirect('/other');
})
.get('/other/supprimer/:id' , function(req,res){
    if(req.params.id != ''){
        req.session.olist.splice(req.params.id, 1);
    }
    res.redirect('/other');
})
.use(function(req,res,next){
    res.redirect('/other');
})
/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080, function(req,res){
    console.log("Listening to port 8080...")
});