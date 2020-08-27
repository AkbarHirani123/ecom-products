"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", _util.isAuth, _util.isAdmin, async (req, res) => {
  const orders = await _orderModel.default.find({}).populate('user');

  if (orders) {
    res.send(orders);
  } else {
    res.status(404).send("Orders not found.");
  }
});
router.get("/myorders", _util.isAuth, async (req, res) => {
  const orders = await _orderModel.default.find({
    user: req.user._id
  });

  if (orders) {
    res.send(orders);
  } else {
    res.status(404).send("Orders not found.");
  }
});
router.get("/:id", _util.isAuth, async (req, res) => {
  const order = await _orderModel.default.findOne({
    _id: req.params.id
  });

  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not found.");
  }
});
router.delete("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  const order = await _orderModel.default.findOne({
    _id: req.params.id
  });

  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not found.");
  }
});
router.post("/", _util.isAuth, async (req, res) => {
  const newOrder = new _orderModel.default({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    subtotalPrice: req.body.subtotalPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice
  });
  const newOrderCreated = await newOrder.save();
  if (newOrderCreated) res.status(201).send({
    message: "New order created.",
    data: newOrderCreated
  });else res.status(500).send({
    message: "Error creating new order."
  });
});
router.put("/:id/pay", _util.isAuth, async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    };
    const updatedOrder = await order.save();
    res.send({
      message: 'Order Paid.',
      order: updatedOrder
    });
  } else {
    res.status(404).send({
      message: "Order not found."
    });
  }
});
var _default = router;
exports.default = _default;