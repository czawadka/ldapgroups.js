var express = require('express');
var fs = require('fs');
var open = require('open');

var GroupRecord = require('./model').Group;
var MemoryStorage = require('./storage').Memory;

var API_GROUPS = '/api/groups';
var API_GROUP = API_GROUPS + '/:name';

exports.start = function(PORT, STATIC_DIR, DATA_FILE, TEST_DIR) {
  var app = express();
  var storage = new MemoryStorage();

  // log requests
  app.use(express.logger('dev'));

  // serve static files for demo client
  app.use(express.static(STATIC_DIR));

  // parse body into req.body
  app.use(express.bodyParser());


  // API
  app.get(API_GROUPS, function(req, res, next) {
    res.send(200, storage.getAll()); // .map(removeMenuItems)
  });


  app.post(API_GROUPS, function(req, res, next) {
    var group = new GroupRecord(req.body);
    var errors = [];

    if (group.validate(errors)) {
      group.dateModified = new Date().getTime();
      storage.add(group);
      return res.send(201, group);
    }

    return res.send(400, {error: errors});
  });

  app.get(API_GROUP, function(req, res, next) {
    var group = storage.getById(req.params.name);

    if (group) {
      return res.send(200, group);
    }

    return res.send(400, {error: 'No group with id "' + req.params.name + '"!'});
  });


  app.put(API_GROUP, function(req, res, next) {
    var group = storage.getById(req.params.name);
    var errors = [];

    if (group) {
      group.update(req.body);
      return res.send(200, group);
    }

    group = new GroupRecord(req.body);
    if (group.validate(errors)) {
      storage.add(group);
      return res.send(201, group);
    }

    return res.send(400, {error: errors});
  });


  app.del(API_GROUP, function(req, res, next) {
    if (storage.deleteById(req.params.name)) {
      return res.send(204, null);
    }

    return res.send(400, {error: 'No group with id "' + req.params.name + '"!'});
  });


  // only for running e2e tests
  app.use('/test/', express.static(TEST_DIR));


  // start the server
  // read the data from json and start the server
  fs.readFile(DATA_FILE, function(err, data) {
    JSON.parse(data).forEach(function(group) {
      storage.add(new GroupRecord(group));
    });

    app.listen(PORT, function() {
      open('http://localhost:' + PORT + '/');
      // console.log('Go to http://localhost:' + PORT + '/');
    });
  });


  // Windows and Node.js before 0.8.9 would crash
  // https://github.com/joyent/node/issues/1553
  try {
    process.on('SIGINT', function() {
      // save the storage back to the json file
      fs.writeFile(DATA_FILE, JSON.stringify(storage.getAll()), function() {
        process.exit(0);
      });
    });
  } catch (e) {}

};
