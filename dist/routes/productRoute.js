"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? {
    category: {
      $regex: req.query.category,
      $options: 'i'
    }
  } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
    price: 1
  } : req.query.sortOrder === 'highest' && {
    price: -1
  } : {
    _id: -1
  };
  const products = await _productModel.default.find({ ...category,
    ...searchKeyword
  }).sort(sortOrder); //if(products){

  res.send(products); //} else {
  //products = await Product.find({...category, ...searchKeyword2}).sort(sortOrder);
  //}
});
router.get("/:id", async (req, res) => {
  const product = await _productModel.default.findOne({
    _id: req.params.id
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Product not found."
    });
  }
});
router.post("/", _util.isAuth, _util.isAdmin, async (req, res) => {
  const product = new _productModel.default({
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    category: req.body.category,
    team: req.body.team,
    quantityInStock: req.body.quantityInStock,
    rating: req.body.rating,
    numOfReviews: req.body.numOfReviews
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.sendStatus(201).send({
      message: 'New Product Created',
      data: newProduct
    });
  }

  return res.status(500).send({
    message: "Error during product creation."
  });
});
router.delete("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await _productModel.default.findById(productId);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({
      message: 'Product deleted'
    });
  } else {
    res.send({
      message: "Error deleting product."
    });
  }
});
router.put("/:id", _util.isAuth, _util.isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.img = req.body.img;
    product.category = req.body.category;
    product.team = req.body.team;
    product.quantityInStock = req.body.quantityInStock;
    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res.sendStatus(200).send({
        message: 'Product Updated',
        data: updatedProduct
      });
    }
  }

  return res.status(500).send({
    message: "Error in updating product."
  });
});
var _default = router;
exports.default = _default;