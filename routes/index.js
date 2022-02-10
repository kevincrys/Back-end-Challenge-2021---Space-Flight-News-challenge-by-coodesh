var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
      res.status(200);
      res.send("Back-end Challenge 2021 🏅 - Space Flight News");
  });

module.exports = router;
