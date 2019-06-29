const express = require('express');
const routes = new express.Router();
const PostController = require('./controllers/PostController.js');
const LikeController = require('./controllers/LikeController.js');

const multer = require('multer');
const uploadConfig = require('./config/upload');

const upload = multer (uploadConfig);


routes.post('/posts',upload.single('image'),PostController.store);
routes.get('/posts',PostController.index);
routes.post('/posts/:id/like',LikeController.store);
/*
routes.get('/c', (req,res) =>{
    return res.send(`Hello ${req.query.name} ${req.query.sobre}`);
});
*/

module.exports = routes;