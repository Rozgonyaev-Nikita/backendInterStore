"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "trumpet.db.elephantsql.com",
    port: 5432,
    username: "apzknfho",
    password: "HuTi9wlOoXRBINKtTcfNOK6f9Qy2GPTt",
    database: "apzknfho",
    synchronize: true,
    logging: false,
    entities: ["entity/*.js"],
    migrations: [],
    subscribers: [],
});
//
