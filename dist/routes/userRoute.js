"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/signin", async (req, res) => {
  const sigininUser = await _userModel.default.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (sigininUser) {
    res.send({
      _id: sigininUser._id,
      name: sigininUser.name,
      email: sigininUser.email,
      isAdmin: sigininUser.isAdmin,
      token: (0, _util.getToken)(sigininUser)
    });
  } else {
    res.status(401).send({
      message: "Invalid Email or Password."
    });
  }
});
router.put("/:id", _util.isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await _userModel.default.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: (0, _util.getToken)(updatedUser)
    });
  } else {
    res.status(401).send({
      message: "User not found."
    });
  }
});
router.post("/register", async (req, res) => {
  const user = new _userModel.default({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: (0, _util.getToken)(newUser)
    });
  } else {
    res.status(401).send({
      message: "Invalid User Data."
    });
  }
});
router.get("/createadmin", async (req, res) => {
  try {
    const user = new _userModel.default({
      name: 'Akbar',
      email: 'akbar.hirani.fake@gmail.com',
      password: '1234',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({
      message: error.message
    });
  }
});
var _default = router;
exports.default = _default;