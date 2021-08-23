let express = require('express'),
  router = express.Router();
(bcrypt = require('bcryptjs')), (jwt = require('jsonwebtoken'));

const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // validate
    const user = await User.findOne({
      username: username,
    });
    if (!user)
      return res
        .status(400)
        .json({ msg: 'No account with this username has been registered.' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ msg: 'You have entered the wrong password.' });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({
      token,
      user: { id: user._id, name: user.name, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/signup').post(async (req, res) => {
  try {
    let { email, password, name, username } = req.body;
    // validate
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'The password needs to be at least 5 characters long.' });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });
    if (!name) name = email;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: passwordHash, name, username });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('auth-token');
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.route('/logout').get((req, res)=>{
//   console.log(res)

// })

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    username: user.username,
    id: user._id,
  });
});

router.route('/user').get((req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.send(`error:- ${err} `));
});

module.exports = router;
