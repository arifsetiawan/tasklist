
var express = require('express');
var router = express.Router();

var azure = require('azure-storage');
var async = require('async');
var _ = require('lodash');

var utils = require('../lib/utils');

if(!process.env.STORAGE_NAME) {
  console.error('Storage is not set');
}
else {
  var Task = require('../models/task');
  var task = new Task(azure.createTableService(process.env.STORAGE_NAME, process.env.STORAGE_KEY), 
  process.env.TABLE_NAME, process.env.PARTITION_KEY);
}

router.use(function(req, res, next) {
  req.type = 'api'
  next();
});

router.get('/', function(req, res, next) {

  var completed = req.query.completed ? ( req.query.completed === 'true' ? true : false ) : false

  var query = new azure.TableQuery()
    .where('completed eq ?', completed);
  task.find(query, function itemsFound(err, items) {
    if (err) {
      return next(err);
    }
    else {
      var dataKeys = ['PartitionKey', 'RowKey', 'Timestamp', 'name', 'category', 'completed'];
      var newItems = _.map(items, function(tableItem) { 
        var newTableItem = {}
        for (var index = 0; index < dataKeys.length; ++index) {
          //console.log(dataKeys[index]);
          if (tableItem[dataKeys[index]]) {
            //console.log(tableItem[dataKeys[index]]);
            newTableItem[dataKeys[index]] = tableItem[dataKeys[index]]._;
          }
        }
        return newTableItem;
      });

      res.status(200).send({
        meta: {
          status: 'OK',
          message: (completed ? 'Completed' : 'Ongoing') + ' tasks'
        },
        data: newItems
      })
    }
  });
});

router.post('/', function(req, res, next) {

  if (!utils.hasProperty(req.body, ['name','category'])) {
    var err = new Error('Task require both name and category');
    err.status = 403;
    return next(err);
  }

  var item = _.pick(req.body, ['name','category']);
  task.addItem(item, function itemAdded(err) {
    if(err) {
      return next(err);
    }
    else {
      res.status(200).send({
        meta: {
          status: 'OK',
          message: 'New task inserted'
        },
        data: item
      })
    }
  });
});

router.delete('/', function(req, res, next) {

  if (!utils.hasProperty(req.query, ['RowKeys'])) {
    var err = new Error('Task require both PartitionKey and RowKey');
    err.status = 403;
    return next(err);
  }

  var deleteItems  = req.query.RowKeys.split(';');
  async.forEach(deleteItems, function taskIterator(deleteItem, callback) {
    var item = {
      RowKey: deleteItem
    }
    task.deleteItem(item, function itemsUpdated(err) {
      if(err){
        callback(err);
      } else {
        callback(null);
      }
    });
  }, function goHome(err){
    if(err) {
      return next(err);
    } 
    else {
      res.status(200).send({
        meta: {
          status: 'OK',
          message: 'Delete tasks'
        },
        data: deleteItems
      })
    }
  });

  /*
  task.deleteItem(item, function itemDeleted(err) {
    if(err) {
      return next(err);
    }
    else {
      res.status(200).send({
        meta: {
          status: 'OK',
          message: 'Task deleted'
        },
        data: item
      })      
    }
  });
  */
});

router.post('/complete', function(req, res, next) {

  if (!_.isArray(req.body)) {
    var err = new Error('Body must be array of tasks');
    err.status = 403;
    return next(err);
  }

  var completedTasks = req.body;
  async.forEach(completedTasks, function taskIterator(completedTask, callback) {
    task.updateItem(completedTask, function itemsUpdated(err) {
      if(err){
        callback(err);
      } else {
        callback(null);
      }
    });
  }, function goHome(err){
    if(err) {
      return next(err);
    } 
    else {
      res.status(200).send({
        meta: {
          status: 'OK',
          message: 'Task complete status updated'
        },
        data: req.body
      })
    }
  });
});

module.exports = router;
