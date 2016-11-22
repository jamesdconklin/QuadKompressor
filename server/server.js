const express = require('express');
const app = express();
import path from 'path';
import logger from 'morgan';
import assert from 'assert';
import MongoDB from 'mongodb';

const MongoClient = MongoDB.MongoClient;
var url = 'mongodb://localhost:27017/QTK';


function findImages(db, id, callback) {
  var collection = db.collection('images');
  collection.find({userid: id}).toArray(
    (err, images) => {
      assert.equal(err, null);
      console.log(`Found images for given userId: ${id}`);
      console.log(images);
      callback(images);
    }
  );
}

app.use(logger('dev'));
app.use(express.static('server/static'));

app.get('/', function(req, res){
  res.sendFile(path.resolve('../frontend/index.html'));
});

app.get('/app', function(req, res){
  res.sendFile(path.resolve('../frontend/index.html'));
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
