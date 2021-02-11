var express = require('express');
var ApiRouters = express.Router();
const bodyParser = require('body-parser')
const cors = require("cors");
const APIService = require('../services/APIService');

ApiRouters.use(cors());

ApiRouters.get('/books/all', async function(request, response, next){
    var apiService = new APIService(request);
    var responseObj = await apiService.getAll();
    response.json(responseObj);
});

ApiRouters.post('/books/update/:id', bodyParser.json(), bodyParser.urlencoded({ extended: false }), async function(request, response, next){
    var apiService = new APIService(request);
    await apiService.updateBooks(request.params.id);
    response.json({
        status:true
    });
});

ApiRouters.post('/books/add_new', bodyParser.json(), bodyParser.urlencoded({ extended: false }), async function(request, response, next){
    var apiService = new APIService(request);
    var bookID  = await apiService.addNewBookRecord();
    response.json({
        status:true,
        bookID
    });
});

ApiRouters.delete('/books/:id', bodyParser.json(), bodyParser.urlencoded({ extended: false }), async function(request, response, next){
    var apiService = new APIService(request);
    await apiService.deleteBooksByID(request.params.id);
    response.json({
        status: true
    })
});

ApiRouters.get('/books/:id', bodyParser.json(), bodyParser.urlencoded({ extended: false }), async function(request, response, next){
    var apiService = new APIService(request);
    var responseObj = await apiService.getBooksDeatilsByID(request.params.id);
    response.json(responseObj);
});

module.exports = ApiRouters;