"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var data_source_1 = require("./data-source");
var products_1 = require("./entity/products");
var rating_1 = require("./entity/rating");
var cors = require("cors");
// establish database connection
data_source_1.myDataSource
  .initialize()
  .then(function () {
    console.log("Data Source has been initialized!");
  })
  .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
  });
// create and setup express app
var app = express();
app.use(express.json());
app.use(cors());
// register routes
app.get("/", function (req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var photoRepository, products;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          photoRepository = data_source_1.myDataSource.getRepository(
            products_1.Products
          );
          return [
            4 /*yield*/,
            photoRepository.find({
              relations: {
                rating: true,
              },
            }),
          ];
        case 1:
          products = _a.sent();
          res.json(products);
          return [2 /*return*/];
      }
    });
  });
});
////
app.get("/category/:category/:limit", function (req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, category, limit, products;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (_a = req.params), (category = _a.category), (limit = _a.limit);
          return [
            4 /*yield*/,
            data_source_1.myDataSource.getRepository(products_1.Products).find({
              where: {
                category: category, // Указываем поле для фильтрации и передаем значение из параметра category
              },
              take: Number(limit), // Указываем ограничение на количество записей
            }),
          ];
        case 1:
          products = _b.sent();
          //   res.send("feefef");
          res.json(products);
          console.log(category);
          return [2 /*return*/];
      }
    });
  });
});
app.post("/addProduct", function (req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      id,
      title,
      description,
      _b,
      price,
      category,
      _c,
      image,
      rating,
      product,
      productRepository,
      ratingRepository;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          (_a = req.body),
            (id = _a.id),
            (title = _a.title),
            (description = _a.description),
            (_b = _a.price),
            (price = _b === void 0 ? 0 : _b),
            (category = _a.category),
            (_c = _a.image),
            (image = _c === void 0 ? "" : _c),
            (rating = _a.rating);
          console.log("rating", rating);
          // const rating = new Rating();
          rating.rate = rating.rate || 0;
          rating.count = rating.count || 0;
          product = new products_1.Products();
          // product.id = id;
          product.title = title;
          product.description = description;
          product.price = price;
          product.category = category;
          product.rating = rating;
          product.image = image;
          productRepository = data_source_1.myDataSource.getRepository(
            products_1.Products
          );
          ratingRepository = data_source_1.myDataSource.getRepository(
            rating_1.Rating
          );
          return [4 /*yield*/, ratingRepository.save(rating)];
        case 1:
          _d.sent();
          return [4 /*yield*/, productRepository.save(product)];
        case 2:
          _d.sent();
          // await myDataSource.getRepository(Products).save(product);
          // await ratingRepository.save(rating);
          // return res.send("Product added successfully!");
          return [2 /*return*/, res.json(product)];
      }
    });
  });
});
app.delete("/productDel/:id", function (req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            data_source_1.myDataSource
              .getRepository(products_1.Products)
              .delete(req.params.id),
          ];
        case 1:
          results = _a.sent();
          return [2 /*return*/, res.send(results)];
      }
    });
  });
});
app.patch("/updateProduct/:id", function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var userRepository, user, updatedUser, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          userRepository = data_source_1.myDataSource.getRepository(
            products_1.Products
          );
          return [
            4 /*yield*/,
            data_source_1.myDataSource
              .getRepository(products_1.Products)
              .findOneBy({
                id: Number(req.params.id),
              }),
          ];
        case 1:
          user = _a.sent();
          // const user = await userRepository.findOne(req.params.id);
          userRepository.merge(user, req.body);
          return [4 /*yield*/, userRepository.save(user)];
        case 2:
          updatedUser = _a.sent();
          res.json(updatedUser);
          return [3 /*break*/, 4];
        case 3:
          error_1 = _a.sent();
          console.error("Error updating data:", error_1);
          res
            .status(500)
            .json({ success: false, message: "Error updating data" });
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
});
// start express server
app.listen(5000);
