const express = require('express');
const app = express();
import path from 'path';
import logger from 'morgan';
import assert from 'assert';
import MongoDB from 'mongodb';
import bodyParser from 'body-parser';
import figaro from 'figaro';
import hbs from 'hbs'


figaro.parse(null, (err) => err && process.exit());

const MongoClient = MongoDB.MongoClient;
var url = 'mongodb://localhost:27017/QTK';

hbs.registerPartials(__dirname + '/hbs')
app.set('view engine', 'hbsb')


function findImages(db, id, callback) {
  var collection = db.collection('images');
  collection.find({user_id: id}).toArray(
    (err, images) => {
      assert.equal(err, null);
      console.log(`Found images for given user_id: ${id}`);
      console.log(images);
      callback(images);
    }
  );
}

function postImages(db, params, callback) {
  var collection = db.collection('images');
  collection.insert(params, {}, (err, images) => {
    assert.equal(err, null);
    console.log(`Inserted image with public_id ${params.public_id} for user_id ${params.user_id}`);
    callback(images);
  });
}

app.use(logger('dev'));
const urlEncoder = bodyParser.urlencoded({ extended: false })

app.use(express.static('server/static'));

app.get('/', function(req, res){
  res.sendFile(path.resolve('../frontend/index.html'));
});

app.get('/app', function(req, res){
  let {CLOUD_NAME, API_KEY, API_SECRET} = process.env

  res.render('index.hbs', {
    options: {
      CLOUD_NAME,
      API_KEY,
      API_SECRET
    }
  });
});

app.post('/images', urlEncoder, (req, res) => {
  var body = req.body;


  MongoClient.connect(url,
    (err, db) => {
      assert.equal(err, null);
      postImages(db, body, (image) => {
        db.close();
        res.send(image.ops[0]);
      });
    }
  );
});

app.get('/images/:userId', function(req, res){
  var userId = req.params.userId;

  MongoClient.connect(url,
    (err, db) => {
      assert.equal(err, null);
      findImages(db, userId,
        (images) => {
          db.close();
          res.send(images);
        }
      );
    }
  );

});

app.post('/images', function(req, res){
  res.sendFile(path.resolve('../frontend/index.html'));
});



if (module === require.main) {
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log('Node Server listening on port %s', port);
  });
}

export default server;
