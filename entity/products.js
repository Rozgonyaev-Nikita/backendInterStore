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
exports.Products = void 0;
var typeorm_1 = require("typeorm");
var rating_1 = require("./rating");
var Products = exports.Products = /** @class */ (function () {
    function Products() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Products.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "Default Title" }),
        __metadata("design:type", String)
    ], Products.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "Default Description" }),
        __metadata("design:type", String)
    ], Products.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("double precision", { default: 0 }),
        __metadata("design:type", Number)
    ], Products.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "other" })
        // category: Category;
        ,
        __metadata("design:type", String)
    ], Products.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Products.prototype, "image", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return rating_1.Rating; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", rating_1.Rating)
    ], Products.prototype, "rating", void 0);
    Products = __decorate([
        (0, typeorm_1.Entity)()
    ], Products);
    return Products;
}());
