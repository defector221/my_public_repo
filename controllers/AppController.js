var express  = require('express');
var router   = express.Router();
const cors   = require("cors");
const config = require('../config/_config');
const ApplicationHelper = new (require('../helper/application.helper'))(config);
var SecurityMiddleware = require('../Middleware/SecurityMiddleware');

var APIController = require('./APIController');

router.use(cors());
router.use(SecurityMiddleware);

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.redirect(301, '/home');
});

router.get('/home', async function (req, res, next) {
    res.render('index', {
      name: 'Groupon',
      currentTime:new Date(),
      filename: [ApplicationHelper.webpack_manifest_script(), ApplicationHelper.webpack_bundle_script('index')]
    });
});

router.get('/books/open/:id', async function (req, res, next) {
  res.render('index', {
    name: 'Groupon',
    currentTime:new Date(),
    filename: [ApplicationHelper.webpack_manifest_script(), ApplicationHelper.webpack_bundle_script('index')]
  });
});

router.get('/books/edit/:id', async function (req, res, next) {
  res.render('index', {
    name: 'Groupon',
    currentTime:new Date(),
    filename: [ApplicationHelper.webpack_manifest_script(), ApplicationHelper.webpack_bundle_script('index')]
  });
});

router.get('/books/create/new', async function (req, res, next) {
  res.render('index', {
    name: 'Groupon',
    currentTime:new Date(),
    filename: [ApplicationHelper.webpack_manifest_script(), ApplicationHelper.webpack_bundle_script('index')]
  });
});

router.use('/api/v1', APIController);

module.exports = router;
