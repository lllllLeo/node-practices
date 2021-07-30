const express = require('express');
const controller = require('../controllers/board')
const auth = require('./auth')

const router = express.Router();

router.route('/add').get(auth(), controller.add);
router.route('/add').post(auth(), controller._add);
router.route('/delete/:no').get(auth(), controller.delete);
router.route('/:no').get(controller.read);
router.route('/reply/:no').get(auth(), controller.reply);
router.route('/reply/:no').post(auth(), controller._reply);
router.route('/modify/:no').get(auth(), controller.modify);
router.route('/modify/:no').post(auth(), controller._modify);
router.route('').get(controller.list);

module.exports = router;