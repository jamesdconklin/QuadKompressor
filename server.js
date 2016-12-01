const express = require('express');
const app = express();
import path from 'path';
import logger from 'morgan';
import assert from 'assert';
import MongoDB from 'mongodb';
import bodyParser from 'body-parser';
import figaro from 'figaro';
import hbs from 'hbs';

if (!process.env.IGNORE_FIGARO) {
  figaro.parse(null, (err) => err && process.exit());
}

const MongoClient = MongoDB.MongoClient;
// var url = 'mongodb://localhost:27017/QTK';
// var url = process.env.MONGODB_URI;

hbs.registerPartials(__dirname + '/hbs');
app.set('view engine', 'hbsb');


const default_photos = [
  {
    public_id: `oayjy9bn7psth8wjttnz`,
    dimension: 512
  },
  {
    public_id: `q8rqxaa8hqnp7jwb6sux`,
    dimension: 512
  },
  {
    public_id: `defaut_pic_zfnuk9`,
    dimension: 512
  },
  {
    public_id: `fxpqnupu7mczqi63rosh`,
    dimension: 512
  },
  {
    public_id: `zl6pmmu6ekbone5ttfky`,
    dimension: 512
  },
  {
    public_id: `fs1ybcorovhecgfgthpx`,
    dimension: 512
  },
  {
    public_id: `daiztnqq6phrols2d1sf`,
    dimension: 512
  },
  {
    public_id: `v6meldcsbtbl0bqhhpvq`,
    dimension: 512
  }
];


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
const urlEncoder = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname,'static')));

// app.get('/', function(req, res){
//   //NOTE: change this path
//   res.sendFile(path.resolve('../frontend/index.html'));
// });

app.get('/', function(req, res){
  let {CLOUD_NAME, API_KEY, API_SECRET, UPLOAD_PRESET} = process.env;

  res.render('index.hbs', {
    options: {
      CLOUD_NAME,
      API_KEY,
      API_SECRET,
      UPLOAD_PRESET
    }
  });
});

app.post('/images', urlEncoder, (req, res) => {
  var body = req.body;
  var url = process.env.MONGODB_URI;

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
  var url = process.env.MONGODB_URI;

  MongoClient.connect(url,
    (err, db) => {
      assert.equal(err, null);
      findImages(db, userId,
        (images) => {
          db.close();
          res.send(images.concat(default_photos));
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
