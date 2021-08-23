const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

let Message = require('../models/message');
const auth = require('../middleware/auth');

router.route('/message').get((req, res) => {
  Message.find()
    .then((messageData) => {
      res.json(messageData);
    })
    .catch((err) => res.send('error ' + err));
});

router.route('/message/new').post(async (req, res) => {
  const newMessage = req.body;
  try {
    Message.create(newMessage);
    res.status(200).json('message sent');
  } catch (errr) {
    res.status(400).json({ error: error.message });
  }
});

// delete route
router.route('/message/:id').delete((req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(`deleted > ${data}`);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
