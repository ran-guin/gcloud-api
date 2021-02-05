var express = require('express')
var router = express.Router()

const connection = require('./../database/gcloud');
const query = require('./../database/query');

console.debug('loaded connection..');

router.get('/', (req, res) => res.send('API home page'));

router.get('/test/:id', (req, res) => {
    connection.query(
      "SELECT * FROM `set1records` WHERE id = ? LIMIT 3", req.params.id,
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

router.get('/query/:table/:fields', (req, res) => {
    console.log('build query for ' + req.params.table);
    var list = req.params.fields.split(/\,\s*/)
    const myQuery = query.build({table: req.params.table, fields: list});
    console.log("Query: " + myQuery);
    if (query) {
    connection.query(
      myQuery,
      function(error, results, fields) {
        if (error) {
          // res.json({error: error.message})
          res.json(error)
        } else {
          res.json(results);
        }
      }
    );
    } else {
      console.debug('query error');
      res.json({error: 'Error generating query'})
    }
  });

module.exports = router
