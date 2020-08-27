"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var category, searchKeyword, sortOrder, products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            category = req.query.category ? {
              category: {
                $regex: req.query.category,
                $options: 'i'
              }
            } : {};
            searchKeyword = req.query.searchKeyword ? {
              name: {
                $regex: req.query.searchKeyword,
                $options: 'i'
              }
            } : {};
            sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
              price: 1
            } : req.query.sortOrder === 'highest' && {
              price: -1
            } : {
              _id: -1
            };
            _context.next = 5;
            return _productModel["default"].find(_objectSpread(_objectSpread({}, category), searchKeyword)).sort(sortOrder);

          case 5:
            products = _context.sent;
            //if(products){
            res.send(products); //} else {
            //products = await Product.find({...category, ...searchKeyword2}).sort(sortOrder);
            //}

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _productModel["default"].findOne({
              _id: req.params.id
            });

          case 2:
            product = _context2.sent;

            if (product) {
              res.send(product);
            } else {
              res.status(404).send({
                message: "Product not found."
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            product = new _productModel["default"]({
              name: req.body.name,
              price: req.body.price,
              img: req.body.img,
              category: req.body.category,
              team: req.body.team,
              quantityInStock: req.body.quantityInStock,
              rating: req.body.rating,
              numOfReviews: req.body.numOfReviews
            });
            _context3.next = 3;
            return product.save();

          case 3:
            newProduct = _context3.sent;

            if (!newProduct) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.sendStatus(201).send({
              message: 'New Product Created',
              data: newProduct
            }));

          case 6:
            return _context3.abrupt("return", res.status(500).send({
              message: "Error during product creation."
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var productId, deletedProduct;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productId = req.params.id;
            _context4.next = 3;
            return _productModel["default"].findById(productId);

          case 3:
            deletedProduct = _context4.sent;

            if (!deletedProduct) {
              _context4.next = 10;
              break;
            }

            _context4.next = 7;
            return deletedProduct.remove();

          case 7:
            res.send({
              message: 'Product deleted'
            });
            _context4.next = 11;
            break;

          case 10:
            res.send({
              message: "Error deleting product."
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.put("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var productId, product, updatedProduct;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            productId = req.params.id;
            _context5.next = 3;
            return _productModel["default"].findById(productId);

          case 3:
            product = _context5.sent;

            if (!product) {
              _context5.next = 16;
              break;
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.img = req.body.img;
            product.category = req.body.category;
            product.team = req.body.team;
            product.quantityInStock = req.body.quantityInStock;
            _context5.next = 13;
            return product.save();

          case 13:
            updatedProduct = _context5.sent;

            if (!updatedProduct) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.sendStatus(200).send({
              message: 'Product Updated',
              data: updatedProduct
            }));

          case 16:
            return _context5.abrupt("return", res.status(500).send({
              message: "Error in updating product."
            }));

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;