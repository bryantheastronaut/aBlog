'use strict'

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Blog = require('./src/models/blog');

var app = express();
var router = express.Router();
var port =  process.env.API_PORT || 3001;


//db setup
mongoose.connect('mongodb://bryan:password1@ds019836.mlab.com:19836/bryandb')

//body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
router.use(function(req, res, next) {
  console.log('something going on here...');
  next();
});
router.get('/', function(req, res) {
  res.json({
    message: 'API initialized'
  });
});

router.route('/blog')
  //create a post
  .post(function(req, res) {
    var blog = new Blog();
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.owner = true;

    blog.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'post created' });
    });
  })
  //fetch all posts
  .get(function(req, res) {
    Blog.find(function(err, blogs) {
      if (err) {
        res.send(err)
      }
      res.json(blogs)
    });
  });

router.route('/blog/:post_id')
  //get single post from id
  .get(function(req, res) {
    Blog.findById(req.params.post_id, function(err, post) {
      if (err) {
        res.send(err)
      }
      res.json(post);
    });
  })
  //update a single post
  .put(function(req, res) {
    Blog.findById(req.params.post_id, function(err, post) {
      if (err) {
        res.send(err)
      }
      //if params are new, update, else leave as is.
      (req.body.title) ? post.title = req.body.title : null;
      (req.body.content) ? post.content = req.body.content : null;
      post.updated = Date.now();

      post.save(function(err) {
        if (err) {
          res.send(err)
        }
        res.json({ message: 'post has been updated!'})
      });
    });
  })
  //delete a post
  .delete(function(req, res) {
    Blog.remove({ _id: req.params.post_id }, function(err, post) {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'post sucessfully deleted' })
    });
  });

app.use('/api', router);

//start server
app.listen(port);
console.log('running on port', port);
