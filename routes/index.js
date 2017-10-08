var express = require('express');
var router = express.Router();

/* API health check. */
router.get('/', function (req, res, next) {
  res.send({
    message: "api is healthy"
  });
});

module.exports = router;