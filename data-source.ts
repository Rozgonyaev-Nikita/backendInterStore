import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
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
