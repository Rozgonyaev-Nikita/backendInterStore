"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
var typeorm_1 = require("typeorm");
var products_1 = require("./products");
var Rating = exports.Rating = /** @class */ (function () {
    function Rating() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Rating.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", { default: 0 }),
        __metadata("design:type", Number)
    ], Rating.prototype, "rate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], Rating.prototype, "count", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return products_1.Products; }, function (products) { return products.rating; }),
        __metadata("design:type", products_1.Products)
    ], Rating.prototype, "product", void 0);
    Rating = __decorate([
        (0, typeorm_1.Entity)()
    ], Rating);
    return Rating;
}());
